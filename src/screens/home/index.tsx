import React, {
    ReactElement,
    useCallback,
    useState,
    useEffect,
    useRef,
    Fragment,
    Dispatch,
    SetStateAction
} from "react";

import {
    View,
    TouchableOpacity,
    RefreshControl,
    BackHandler,
    Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import styles, {
    HomeContainer,
    ContentWarp,
    DiaryListWarp,
    IconWarp,
    ProfileWarp,
    ProfileImageWarp,
    NicknameWarp,
    NicknameContainer,
    DiaryTitle,
    DiaryList,
    RecentContentWarp,
    RecentContentList,
    DiaryListContainer,
    RecommandCreateDiary,
    ProfileImage,
    DiaryEmptyImageWarp,
    DiaryEmptyImage,
    LogoType,
    DiaryListBottom,
    DiaryListBottomImage,
    DiaryListBottomMention,
    SpeechBubbleWrap,
    SpeechBubbleWrapBg,
    SpeechBubbleWrapBgTail,
    EmptyDiaryText,
    RecommandCreateDiaryWrap,
    NewAlarm,
    AlertContent,
    AlertText
} from "./home.style";
import { RecentContent } from "./RecentContent";

import { IconButton, Popup } from "@components";

import { observer } from "mobx-react";
import { UserStore } from "@store";
import { userApis, diaryApis } from "@apis";

import { Diary } from "./Diary";
import { DiaryResType } from "@type-definition/diary";
import { RecentRecordType } from "@type-definition/user";
import { CreateDiary } from "./CreateDiary";
import { CreateDiaryModal } from "./CreateDiaryModal";
import { navigate } from "@config/navigator";
import { autorun } from "mobx";
import { messageApis } from "@apis";
import moment from "moment";
import { MessageResType } from "@type-definition/message";
import { useFocusEffect } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

type HomeProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

type ProfileProps = {
    count: number;
    setAlertOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * 상단 헤더
 */
const Profile = observer(({ count, setAlertOpen }: ProfileProps) => {
    const { nickname, profileImage, profileImagePath, newMessage } = UserStore;

    const getAlarm = async () => {
        const data: MessageResType = (await messageApis.getAllMessages({
            size: 10,
            lastId: 0
        })) as MessageResType;
        const checkedAlarmTime = await AsyncStorage.getItem("checkedAlarmTime");
        if (!data.elements.length) {
            return;
        }
        if (!checkedAlarmTime) {
            UserStore.setNewMessage(true);
            return;
        }
        const checkedTime = moment(checkedAlarmTime);
        if (
            data.elements.some(
                ({ createdDate }) => moment(createdDate).diff(checkedTime) > 0
            )
        ) {
            UserStore.setNewMessage(true);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            getAlarm();
        }, [])
    );

    return (
        <ProfileWarp>
            <IconWarp>
                <IconButton
                    onPress={() => {
                        if (count === 0) {
                            setAlertOpen(true);
                        } else {
                            navigate("RecordInput", { diary: null });
                        }
                    }}
                    style={styles.iconSpace}
                    icon={require("@assets/images/home_writing_normal.png")}
                />
                <IconButton
                    onPress={() => {
                        navigate("MessageList", null);
                    }}
                    style={styles.iconSpace}
                    icon={require("@assets/images/home_notice_normal.png")}
                >
                    {newMessage ? <NewAlarm /> : <></>}
                </IconButton>

                <IconButton
                    onPress={() => {
                        navigate("Settings", null);
                    }}
                    icon={require("@assets/images/home_setting_normal.png")}
                />
            </IconWarp>
            <View>
                <ProfileImageWarp>
                    <ProfileImage source={profileImage}></ProfileImage>
                </ProfileImageWarp>
            </View>
            <NicknameContainer>
                <NicknameWarp>{nickname}</NicknameWarp>
                <View>
                    <LogoType
                        source={require("@assets/images/home/home_logotype.png")}
                    />
                </View>
            </NicknameContainer>
        </ProfileWarp>
    );
});

const Home = () => {
    const [userLoading, setUserLoading] = useState(true);
    const [diaryLoading, setDiaryLoading] = useState(true);
    const { nickname, profileImage, profileImagePath } = UserStore;
    const [diaryList, setDiaryList] = useState<DiaryResType[]>([]);
    const [pageNum, setPageNum] = useState<any>();
    const pageInfo = useRef<any>();
    const [recentRecord, setRecentRecord] = useState<RecentRecordType[]>();
    const [createDiaryOpen, setCreateDiaryOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const route = useRoute();

    /**
     * 경고창 출력여부
     */
    const [alertOpen, setAlertOpen] = useState(false);

    /**
     * 뒤로가기를 눌렸을때 출력되는 메세지
     */
    const [snackVisible, setSnackVisible] = useState(false);
    /**
     * 메세지 닫기
     */
    const onDismissSnackBar = () => setSnackVisible(false);

    /**
     * 뒤로가기 버튼 입력횟수
     */
    const [exitApp, setExitApp] = useState(0);

    /**
     * 뒤로가기 버튼 클릭시 동작되는 이벤트 처리
     */
    const backAction = () => {
        setTimeout(() => {
            setExitApp(0);
        }, 2000); // 2 seconds to tap second-time
        if (exitApp === 0) {
            setExitApp(exitApp + 1);
            setSnackVisible(true);
            setTimeout(() => {
                setSnackVisible(false);
            }, 2000); // 2 seconds to tap second-time
        } else if (exitApp === 1) {
            BackHandler.exitApp();
        }
        return true;
    };
    /**
     * 뒤로가기 클릭시 이벤트 등록
     */
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, [exitApp]);

    // check if screen is focused
    const isFocused = useIsFocused();

    const getUser = async () => {
        if (nickname !== "") {
            setUserLoading(false);
            return;
        }
        try {
            UserStore.login();
            setUserLoading(false);
        } catch (error) {
            navigate("Login", null);
        }
    };

    const getDiaries = async () => {
        try {
            const data = await diaryApis.getDiaries();
            pageInfo.current = {
                totalPages: data.totalPages,
                totalCounts: data.totalCounts
            };
            setDiaryList(data.elements || []);
            setDiaryLoading(false);
            console.log(data.elements);
        } catch (error) {
            console.log(error);
        }
    };

    const getRecentRecord = async () => {
        try {
            const data = await userApis.recentRecords();
            setRecentRecord(data.elements);
        } catch (error) {}
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getDiaries();
        await getRecentRecord();
        // wait(2000).then(() => setRefreshing(false));
        setRefreshing(false);
    };

    useEffect(() => {
        getUser();
        getDiaries();
        getRecentRecord();
    }, []);

    useEffect(() => {
        getUser();
        getDiaries();
        getRecentRecord();
    }, [isFocused]);

    if (userLoading || diaryLoading) {
        return <></>;
    }

    return (
        <Fragment>
            <HomeContainer>
                <ContentWarp>
                    <Profile
                        count={diaryList.length}
                        setAlertOpen={setAlertOpen}
                    />
                    {diaryList.length ? (
                        <DiaryListWarp>
                            <DiaryListContainer>
                                <DiaryList
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                >
                                    {recentRecord ? (
                                        <RecentContentWarp>
                                            <DiaryTitle>
                                                최근 작성된 기록
                                            </DiaryTitle>
                                            <RecentContentList
                                                horizontal={true}
                                                alwaysBounceVertical={true}
                                                showsHorizontalScrollIndicator={
                                                    false
                                                }
                                            >
                                                {recentRecord ? (
                                                    recentRecord.map(
                                                        (
                                                            record: RecentRecordType,
                                                            index
                                                        ) => (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    navigate(
                                                                        "RecordView",
                                                                        {
                                                                            diaryUuid:
                                                                                record.diaryUuid,
                                                                            recordUuid:
                                                                                record.recordUuid,
                                                                            diary: null,
                                                                            record: null
                                                                        }
                                                                    );
                                                                }}
                                                                key={
                                                                    "recent_recode_" +
                                                                    index
                                                                }
                                                            >
                                                                <RecentContent
                                                                    title={
                                                                        record.recordTitle
                                                                    }
                                                                    nickname={
                                                                        record.createdByNickname
                                                                    }
                                                                    diaryName={
                                                                        record.diaryTitle
                                                                    }
                                                                    backgroundColor="purple"
                                                                />
                                                            </TouchableOpacity>
                                                        )
                                                    )
                                                ) : (
                                                    <></>
                                                )}
                                            </RecentContentList>
                                        </RecentContentWarp>
                                    ) : (
                                        <></>
                                    )}
                                    <DiaryTitle>다이어리 목록</DiaryTitle>
                                    <View
                                        style={{
                                            marginTop: 8,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            flexWrap: "wrap",
                                            flex: 1
                                        }}
                                    >
                                        {diaryList ? (
                                            diaryList.map(
                                                (diary: DiaryResType) => (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            navigate(
                                                                "RecordInfo",
                                                                { diary: diary }
                                                            );
                                                        }}
                                                        key={diary.uuid}
                                                    >
                                                        <Diary
                                                            diaryTitle={
                                                                diary.title
                                                            }
                                                            members={
                                                                diary.members
                                                                    .length
                                                            }
                                                            coverType={
                                                                diary.icon.split(
                                                                    ":"
                                                                )[0]
                                                            }
                                                            coverId={
                                                                diary.icon.split(
                                                                    ":"
                                                                )[1]
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                )
                                            )
                                        ) : (
                                            <></>
                                        )}
                                        <CreateDiary
                                            onClick={() => {
                                                setCreateDiaryOpen(true);
                                            }}
                                        />
                                    </View>
                                    {/* <CreateDiaryWrap>
                                            
                                        </CreateDiaryWrap> */}
                                    <DiaryListBottom>
                                        <DiaryListBottomMention>
                                            오늘의 너를 기억할게 :D
                                        </DiaryListBottomMention>
                                        <DiaryListBottomImage
                                            source={require("@assets/images/home/home_bottom_illust.png")}
                                        />
                                    </DiaryListBottom>
                                </DiaryList>
                            </DiaryListContainer>
                        </DiaryListWarp>
                    ) : (
                        <RecommandCreateDiaryWrap>
                            <RecommandCreateDiary>
                                <DiaryEmptyImageWarp>
                                    <DiaryEmptyImage
                                        source={require("@assets/images/home/home_diary_add_empty.png")}
                                    ></DiaryEmptyImage>
                                </DiaryEmptyImageWarp>
                                <CreateDiary
                                    onClick={() => {
                                        setCreateDiaryOpen(true);
                                    }}
                                />
                                <SpeechBubbleWrap>
                                    <SpeechBubbleWrapBg>
                                        <EmptyDiaryText>
                                            다이어리를 추가한 다음에 기록을 남길
                                            수 있어요!
                                        </EmptyDiaryText>
                                    </SpeechBubbleWrapBg>
                                    <SpeechBubbleWrapBgTail />
                                </SpeechBubbleWrap>
                            </RecommandCreateDiary>
                        </RecommandCreateDiaryWrap>
                    )}
                </ContentWarp>
            </HomeContainer>
            <CreateDiaryModal
                open={createDiaryOpen}
                reloadDiary={getDiaries}
                close={() => {
                    setCreateDiaryOpen(false);
                }}
            ></CreateDiaryModal>
            <Snackbar visible={snackVisible} onDismiss={onDismissSnackBar}>
                {`한번더 뒤로가기를 누르면 종료됩니다.`}
            </Snackbar>
            <Popup
                open={alertOpen}
                confirm="확인"
                onConfirm={async () => {
                    setAlertOpen(false);
                }}
                width={300}
                handelOpen={(key: boolean) => {}}
                content={
                    <AlertContent>
                        <AlertText>다이어리를 먼저 생성해주세요.</AlertText>
                    </AlertContent>
                }
            />
        </Fragment>
    );
};
export default Home;
