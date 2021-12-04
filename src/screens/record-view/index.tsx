import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    Dimensions,
    ActivityIndicator,
    RefreshControl,
    BackHandler
} from "react-native";
import { Background, Text_2, Header } from "@components";

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { diaryApis, recordApis } from "@apis";
import { DiaryResType, RecordResType } from "@type-definition/diary";
import RenderHtml from "react-native-render-html";
import { Menu } from "react-native-paper";
import { Popup as Confirm } from "@components";
import dateFormat from "dateformat";
import { stringToDatetime } from "@utils";
import { observer } from "mobx-react";
import { UserStore } from "@store";
import styles from "./styles";
import { ProfileImages, ProfileImageTypes, dateToString } from "@utils";

const SCREEN_WIDTH = Dimensions.get("screen").width;

type RecordViewProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "RecordView">;
    route: RouteProp<StackNavigatorParams, "RecordView">;
};

export const RecordView = observer(({ route, navigation }: RecordViewProps) => {
    const [loading, setLoading] = useState(false);

    /**
     * 우측 상단 메뉴 활성화여부
     */
    const [visible, setVisible] = React.useState(false);
    const closeMenu = () => setVisible(false);
    const openMenu = () => setVisible(true);

    /**
     * 서버에서 가져온 기록 데이터를 저장하는 부분
     */
    const [data, setData] = useState<RecordResType | null>(null);

    const [diary, setDiary] = useState<DiaryResType | null>(null);
    const [record, setRecord] = useState<RecordResType | null>(null);

    const [refreshing, setRefreshing] = useState(false);
    /**
     * 리스트에서 가져오는 부분
     */
    const { diaryUuid, recordUuid, prev } = route.params;

    /**
     * 기록 삭제 동의창 생성부분
     */
    const [modal, setModal] = useState(false);

    const type =
        diary && record
            ? (diary.members
                  .find(({ nickname }) => nickname === record.createdByNickname)
                  ?.profileImagePath.split(":")[1] as ProfileImageTypes)
            : "01";
    const profileImage = ProfileImages[type];

    /**
     * mobx 으로 유저 닉네임 추출
     */
    const { nickname } = UserStore;

    /**
     * 기록 상세내용 조회
     */
    const getData = async () => {
        setLoading(true);
        if (diaryUuid && recordUuid) {
            // console.log({diary, record});
            try {
                const record = await recordApis.viewRecord(
                    diaryUuid,
                    recordUuid
                );
                setRecord(record);
                const diary = await diaryApis.viewDiary(diaryUuid);
                setDiary(diary);
                // console.log({ record , diary});
                setIsAdministrator(
                    diary?.members.find(item => item.nickname === nickname)
                        ?.authority === "DIARY_OWNER"
                );
                setIsCreateUser(nickname === record?.createdByNickname);
            } catch (error: any) {
                console.log(error.response);
                Alert.alert("", "기록을 열람할 권한이 없습니다.", [
                    {
                        text: "확인",
                        onPress: () => navigation.replace("Home")
                    }
                ]);
            }
        }
        setLoading(false);
    };

    /**
     * 기록 삭제
     */
    const deleteData = async () => {
        setLoading(true);
        if (diary && record) {
            try {
                await recordApis.deleteRecord(diary.uuid, record.uuid);
                Alert.alert("", "삭제되었습니다.", [
                    {
                        text: "확인",
                        onPress: () =>
                            navigation.replace("RecordList", {
                                diary: diary,
                                snack: null
                            })
                    }
                ]);
            } catch (error: any) {
                console.log(error.response);
                Alert.alert("삭제중 에러발생");
            }
        }
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        // wait(2000).then(() => setRefreshing(false));
        setRefreshing(false);
    };

    /**
     * 현재 로그인한 사용자가 해당 다이러리에서 관리자인지 판별하는 부분
     * -> true : 관리자 , false : 일반 유저
     */
    const [isAdministrator, setIsAdministrator] = useState(
        diary?.members.find(item => item.nickname === nickname)?.authority ===
            "DIARY_OWNER"
    );

    /**
     * 현재 로그인 사용자가 해당 기록을 작성했는지 체크
     */
    const [isCreateUser, setIsCreateUser] = useState(
        nickname === data?.createdByNickname
    );
    // const isCreateUser = nickname === data?.createdByNickname

    /**
     * 컨포넌트 최초 마운트시 이벤트
     */
    useEffect(() => {
        getData();
        return () => setLoading(true);
    }, []);

    /**
     * 뒤로가기 버튼 클릭시 이벤트
     */
    useEffect(() => {
        const backAction = () => {
            if (prev === "home") {
                navigation.replace("Home");
            } else {
                navigation.replace("RecordList", { diary: diary, snack: null });
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [diary]);

    if (record) {
        const { title, createdDate, body, images } = record;
        return (
            <Background>
                <Confirm
                    open={modal}
                    onCancel={async () => deleteData()}
                    onConfirm={async () => setModal(false)}
                    cancel="삭제할래요"
                    confirm="남겨둘래요"
                    content={
                        <>
                            <View style={styles.modalImages}>
                                <Image
                                    source={require("@assets/images/popup_diary_delete_bgimg.png")}
                                    style={styles.modalDeleteIcon}
                                />
                                <Text_2 style={styles.modalTitleStyle}>
                                    현재 기록을 정말 삭제할 거에요?
                                </Text_2>
                            </View>
                        </>
                    }
                />
                <Header
                    leftIcon={
                        <TouchableOpacity
                            onPress={() => {
                                // navigation.goBack()
                                if (prev === "home") {
                                    navigation.replace("Home");
                                } else {
                                    navigation.replace("RecordList", {
                                        diary: diary,
                                        snack: null
                                    });
                                }
                            }}
                        >
                            <Image
                                style={{ width: 24, height: 24 }}
                                source={require("@assets/icons/back.png")}
                            />
                        </TouchableOpacity>
                    }
                    rightIcon={
                        // 만약 다이러리 관리자 이거나 해당글을 생성한 유저일경우에는 수정 및 삭제 활성화
                        isCreateUser && (
                            // 우측 상단 메뉴
                            <Menu
                                style={{
                                    top: 105
                                }}
                                visible={visible}
                                onDismiss={closeMenu}
                                anchor={
                                    <TouchableOpacity onPress={openMenu}>
                                        <Image
                                            style={{ width: 24, height: 24 }}
                                            source={require("@assets/icons/menu.png")}
                                        />
                                    </TouchableOpacity>
                                }
                            >
                                <Menu.Item
                                    onPress={() => {
                                        closeMenu();
                                        navigation.navigate("RecordInput", {
                                            diary: diary,
                                            record: record,
                                            prev: "home"
                                        });
                                    }}
                                    title="기록 수정"
                                />
                                <Menu.Item
                                    onPress={() => {
                                        closeMenu();
                                        setModal(true);
                                    }}
                                    title="기록 삭제"
                                />
                            </Menu>
                        )
                    }
                    title="기록 보기"
                />
                <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {/* 제목 */}
                    <View style={styles.viewTitle}>
                        <Text_2 style={{ fontSize: 20 }}>{title}</Text_2>
                    </View>
                    {/* 본문 */}
                    <View>
                        {/* 글쓴이 , 시간 */}
                        <View style={styles.viewWriterContainer}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <Image
                                    source={profileImage}
                                    style={{
                                        width: 36,
                                        height: 36,
                                        marginRight: 8
                                    }}
                                />
                                <Text_2 style={{ fontSize: 12 }}>
                                    {record.createdByNickname}
                                </Text_2>
                            </View>
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Text_2
                                    style={{ fontSize: 12, color: "#6f6f7e" }}
                                >
                                    {/*{dateFormat(stringToDatetime(createdDate) , 'yyyy-mm-dd HH:MM:ss')}*/}
                                    {dateToString(
                                        stringToDatetime(createdDate)
                                    )}
                                </Text_2>
                            </View>
                        </View>

                        <View>
                            {images.map((item, index) => (
                                // 이미지
                                <View
                                    key={index}
                                    style={{
                                        alignItems: "center",
                                        paddingHorizontal: 20,
                                        paddingVertical: 5
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 335,
                                            height: 335,
                                            resizeMode: "contain",
                                            borderRadius: 20
                                        }}
                                        source={{
                                            uri: item.path
                                        }}
                                    />
                                </View>
                            ))}
                            <View
                                style={{
                                    paddingTop: 20,
                                    paddingBottom: 67,
                                    paddingRight: 22,
                                    paddingLeft: 30
                                }}
                            >
                                {/* <Text_2 bold="Regular" style={{ fontSize: 14, color: "#17171c", lineHeight: 26 }}>
                                {body}
                                </Text_2> */}
                                <RenderHtml
                                    contentWidth={SCREEN_WIDTH}
                                    source={{ html: body }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Image
                    style={styles.diaryBottomIllust}
                    source={require("@assets/images/diary/diary_bottom_illust.png")}
                />
            </Background>
        );
    } else {
        return (
            <Background>
                <Header title="기록보기" />
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <ActivityIndicator color="#000" />
                </View>
            </Background>
        );
    }
});

export default RecordView;
