import React, { useRef, useState, useEffect } from "react";
import {
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
    View,
    Platform,
    BackHandler
} from "react-native";
import { Background, Header } from "@components";
import { messageApis } from "@apis";
import ActionSheet from "react-native-actions-sheet";
import { Memeber } from "@type-definition/diary";
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { observer } from "mobx-react";
import { UserStore } from "@store";
import { ProfileImages, ProfileImageTypes } from "@utils";
import { Snackbar } from "react-native-paper";

import { diaryApis } from "@apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    Container,
    BackgroundImage,
    SpeechBubble,
    SpeechBubble2,
    FriendList,
    ListItem,
    ListItemImage,
    ListItemDisabledImage,
    ListItemTitle,
    ListItemDisabledTitle,
    ActionSheetContainer,
    ProfileContainer,
    ProfileImage,
    TitleContainer,
    Title,
    SubTitle,
    ChreerupContainer,
    Chreerup,
    ChreerupImage,
    ChreerupMessage,
    EmptyImage,
    EmptyMessage,
    EmptyContaner,
    Button,
    ButtonText
} from "./style";

type CheerUpProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "RecordList">;
    route: RouteProp<StackNavigatorParams, "RecordList">;
};

const CheerUp = observer(({ navigation, route }: CheerUpProps) => {
    const diary = route.params.diary;

    /**
     * 하단 메뉴 설정
     */
    const actionSheetRef = useRef<ActionSheet>(null);
    /**
     * 하단 메뉴 스크롤
     */
    const scrollViewRef = useRef<ScrollView>(null);
    /**
     * 스낵메세지 노출여부
     */
    const [visible, setVisible] = React.useState(false);

    /**
     * 메세지내용
     */
    const [message, setMessage] = useState("");

    /**
     * 스낵메세지 가리기
     */
    const onDismissSnackBar = () => setVisible(false);

    /**
     * 메세지 보낼 대상 지정
     */
    const [target, setTarget] = useState<Memeber | null>(null);

    /**
     * mobx 으로 유저 닉네임 추출
     */
    const { nickname } = UserStore;

    /**
     * 다이러리 멤버 -> ACTIVE 멤버이면서 자기자신을 제외
     */
    const [members, setMembers] = useState(
        diary
            ? diary.members
                  .filter(item => item.status === "ACTIVE")
                  .filter(item => item.nickname !== nickname)
            : []
    );
    const [cheeupData, setCheeupData] = useState<any>({});

    const getDiary = async () => {
        const uuid = diary?.uuid;
        if (uuid) {
            return await diaryApis.viewDiary(uuid);
        } else {
            return null;
        }
    };

    useEffect(() => {
        const index = window.setInterval(() => {
            getDiary().then(diary => {
                if (diary) {
                    setMembers(
                        diary.members
                            .filter(item => item.status === "ACTIVE")
                            .filter(item => item.nickname !== nickname)
                    );
                }
            });

            AsyncStorage.getItem("cheerup-data").then(chreerup => {
                const json = chreerup ? JSON.parse(chreerup) : {};
                setCheeupData(json);
            });
        }, 3000);

        return () => {
            clearInterval(index);
        };
    }, []);

    useEffect(() => {
        const backAction = () => {
            navigation.replace("RecordList", {
                diary: diary,
                snack: null
            });
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    /**
     * 응원 메세지 보내기
     * @param message
     */
    const sendMessage = async (message: string) => {
        try {
            if (diary && target?.userId && target?.nickname) {
                actionSheetRef.current?.setModalVisible();
                await messageApis.sendMessage(diary.uuid, {
                    type: "CHEERING",
                    toUserId: target.userId,
                    title: "응원 메세지",
                    body: `${message} from. ${nickname}`
                });

                const chreerup = await AsyncStorage.getItem("cheerup-data");
                const json = chreerup ? JSON.parse(chreerup) : {};
                json[target.nickname] = new Date().getTime();
                await AsyncStorage.setItem(
                    "cheerup-data",
                    JSON.stringify(json)
                );

                // Alert.alert("응원 메세지를 보냈습니다.");
                setMessage("응원 메시지를 보냈어요!");
                setVisible(true);
            }
        } catch (error: any) {
            if (error.response) {
                console.log("sendMessage error", error.response);
                Alert.alert(error.response.data.message);
            }
        }
    };

    return (
        <Background>
            <Header
                title="우리끼리 응원하기"
                leftIcon={
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require("@assets/icons/x.png")}
                        />
                    </TouchableOpacity>
                }
                // rightIcon={null}
            />
            <Container>
                {members.length === 0 && (
                    <EmptyContaner>
                        <EmptyImage
                            source={require("@assets/images/notification_cheerup_empty.png")}
                        />
                        <EmptyMessage>등록된 끼리가 없어요.</EmptyMessage>
                        <EmptyMessage>끼리 멤버를 추가해주세요.</EmptyMessage>
                        <Button
                            onPress={() => {
                                navigation.navigate("FriendMain", { diary });
                            }}
                        >
                            <ButtonText>끼리 멤버 추가하기</ButtonText>
                        </Button>
                    </EmptyContaner>
                )}
                {/* 멤버가 2명 이상일때 */}
                {members.length > 0 && (
                    <>
                        <BackgroundImage
                            source={require("@assets/images/diary/diary_cheerup_bgimg.png")}
                        />
                        <SpeechBubble>
                            끼리 멤버들에게 ’기록작성’을 응원해보자 뿌!:)
                        </SpeechBubble>
                        <SpeechBubble2 />
                        <FriendList
                            data={members}
                            numColumns={3}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={data => {
                                const item = data.item as Memeber;
                                const type = item.profileImagePath.split(
                                    ":"
                                )[1] as ProfileImageTypes;
                                const profileImagePath = ProfileImages[type];

                                const time = item.nickname
                                    ? cheeupData[item.nickname]
                                    : 0;
                                const isdisabled =
                                    new Date().getTime() - time < 1000 * 60 * 3;

                                return isdisabled ? (
                                    <ListItem
                                        onPress={() => {
                                            Alert.alert(
                                                "",
                                                "응원을 보내고 3분동안은 다시 보낼수 없습니다."
                                            );
                                        }}
                                    >
                                        <ListItemDisabledImage
                                            source={profileImagePath}
                                        />
                                        <ListItemDisabledTitle>
                                            {item.nickname}
                                        </ListItemDisabledTitle>
                                    </ListItem>
                                ) : (
                                    <ListItem
                                        onPress={() => {
                                            setTarget(item);
                                            actionSheetRef.current?.setModalVisible();
                                        }}
                                    >
                                        <ListItemImage
                                            source={profileImagePath}
                                        />
                                        <ListItemTitle>
                                            {item.nickname}
                                        </ListItemTitle>
                                    </ListItem>
                                );
                            }}
                        />
                    </>
                )}

                <ActionSheet
                    ref={actionSheetRef}
                    bounceOnOpen={true}
                    headerAlwaysVisible={true}
                    gestureEnabled={true}
                >
                    <ActionSheetContainer>
                        <ProfileContainer>
                            <ProfileImage
                                source={require("@assets/images/profile/home_profile_04.png")}
                            />
                            <TitleContainer>
                                <Title>나는 {target?.nickname} 님에게</Title>
                                <Title>응원의 한마디 보내기</Title>
                                <SubTitle>
                                    from. {nickname} [{diary?.title}]
                                </SubTitle>
                            </TitleContainer>
                        </ProfileContainer>
                        <ScrollView
                            style={{ marginBottom: 30, height: 321 }}
                            ref={scrollViewRef}
                            nestedScrollEnabled={true}
                            onScrollEndDrag={() =>
                                actionSheetRef.current?.handleChildScrollEnd()
                            }
                            onScrollAnimationEnd={() =>
                                actionSheetRef.current?.handleChildScrollEnd()
                            }
                            onMomentumScrollEnd={() =>
                                actionSheetRef.current?.handleChildScrollEnd()
                            }
                        >
                            <ChreerupContainer>
                                <Chreerup
                                    onPress={() =>
                                        sendMessage("꾸준함은 배신하지 않아")
                                    }
                                >
                                    <ChreerupImage
                                        source={require("@assets/images/diary/diary_cheerup_bgimg_01.png")}
                                        resizeMode="stretch"
                                        style={{
                                            width: 70,
                                            height: 70
                                        }}
                                    />
                                    <ChreerupMessage>꾸준함은</ChreerupMessage>
                                    <ChreerupMessage>
                                        배신하지 않아
                                    </ChreerupMessage>
                                </Chreerup>
                                <Chreerup
                                    onPress={() =>
                                        sendMessage("오늘 너의 기록에 반함")
                                    }
                                >
                                    <ChreerupImage
                                        source={require("@assets/images/diary/diary_cheerup_bgimg_02.png")}
                                        resizeMode="stretch"
                                        style={{
                                            width: 70,
                                            height: 70
                                        }}
                                    />
                                    <ChreerupMessage>오늘</ChreerupMessage>
                                    <ChreerupMessage>
                                        너의 기록에 반함
                                    </ChreerupMessage>
                                </Chreerup>
                                <Chreerup
                                    onPress={() =>
                                        sendMessage("난 언제나 너의 편")
                                    }
                                >
                                    <ChreerupImage
                                        source={require("@assets/images/diary/diary_cheerup_bgimg_03.png")}
                                        resizeMode="stretch"
                                        style={{
                                            height: 70,
                                            width: 98
                                        }}
                                    />
                                    <ChreerupMessage>난 언제나</ChreerupMessage>
                                    <ChreerupMessage>너의 편</ChreerupMessage>
                                </Chreerup>
                                <Chreerup
                                    onPress={() =>
                                        sendMessage("아프지 말고, 아프지 말고")
                                    }
                                >
                                    <ChreerupImage
                                        source={require("@assets/images/diary/diary_cheerup_bgimg_04.png")}
                                        resizeMode="stretch"
                                        style={{
                                            width: 70,
                                            height: 70
                                        }}
                                    />
                                    <ChreerupMessage>
                                        아프지 말고,
                                    </ChreerupMessage>
                                    <ChreerupMessage>
                                        아프지 말고
                                    </ChreerupMessage>
                                </Chreerup>
                                <Chreerup
                                    onPress={() =>
                                        sendMessage("대충 살아도 괜찮아")
                                    }
                                >
                                    <ChreerupImage
                                        source={require("@assets/images/diary/diary_cheerup_bgimg_05.png")}
                                        resizeMode="stretch"
                                        style={{
                                            height: 70,
                                            width: 98
                                        }}
                                    />
                                    <ChreerupMessage>
                                        대충 살아도
                                    </ChreerupMessage>
                                    <ChreerupMessage>괜찮아</ChreerupMessage>
                                </Chreerup>
                                <Chreerup
                                    onPress={() =>
                                        sendMessage(
                                            "넌 지금도 충분히 잘 하는 중"
                                        )
                                    }
                                >
                                    <ChreerupImage
                                        source={require("@assets/images/diary/diary_cheerup_bgimg_06.png")}
                                        resizeMode="stretch"
                                        style={{
                                            width: 70,
                                            height: 70
                                        }}
                                    />
                                    <ChreerupMessage>넌 지금도</ChreerupMessage>
                                    <ChreerupMessage>
                                        충분히 잘 하는 중
                                    </ChreerupMessage>
                                </Chreerup>
                            </ChreerupContainer>
                        </ScrollView>
                    </ActionSheetContainer>
                </ActionSheet>
            </Container>
            {/* 메세지 */}
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                style={{ marginHorizontal: 20, marginBottom: 38 }}
                action={{
                    label: "확인",
                    onPress: () => {
                        onDismissSnackBar();
                    }
                }}
            >
                {message}
            </Snackbar>
        </Background>
    );
});

export default CheerUp;
