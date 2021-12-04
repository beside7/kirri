import React, { ReactElement, ReactNode, useState, useEffect } from "react";
import {
    View,
    Animated,
    PanResponder,
    Image,
    Dimensions,
    TouchableOpacity,
    BackHandler
} from "react-native";
import Color from "./color";

import {
    Container,
    HeaderImage,
    Title,
    Content,
    Footer,
    Author,
    Button,
    Icon,
    ButtonText,
    ScrollDownButton
} from "./style";

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { CoverBigImages, CoverColorTypes, CoverColor } from "@utils";
import { FontAwesome5 } from "@expo/vector-icons";

import Constants from "expo-constants";

import { diaryApis } from "@apis";
import { DiaryResType } from "@type-definition/diary";

type RecordInfoProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "RecordInfo">;
    route: RouteProp<StackNavigatorParams, "RecordInfo">;
};

type BackgroundProps = {
    children: ReactNode;
};

const background = {
    image_0: require("@assets/images/record/diary_overview_bgimg_color_01.png"),
    image_1: require("@assets/images/record/diary_overview_bgimg_color_02.png"),
    image_2: require("@assets/images/record/diary_overview_bgimg_color_03.png"),
    image_3: require("@assets/images/record/diary_overview_bgimg_color_04.png"),
    color_0: require("@assets/images/record/diary_overview_bgimg_white_01.png"),
    color_1: require("@assets/images/record/diary_overview_bgimg_white_02.png"),
    color_2: require("@assets/images/record/diary_overview_bgimg_white_03.png")
};

type backgroundKey = keyof typeof background;

export default function RecordInfo({ navigation, route }: RecordInfoProps) {
    const tmpDiary = route.params.diary;

    /**
     * 서버에서 가져올 다이러리 정보
     */
    const [diary, setDiary] = useState<DiaryResType>(tmpDiary);

    const { title, createdDate, members, icon, uuid } = diary;

    const [coverType, coverId] = icon.split(":");

    const owner = members.find(({ authority }) => authority === "DIARY_OWNER");

    const { nickname } = owner !== undefined ? owner : { nickname: "" };
    const [pan, setPan] = useState(new Animated.ValueXY());

    /**
     * 최초 로딩시 다시 서버에서 다이러리정보 가져오기
     */
    useEffect(() => {
        diaryApis.viewDiary(tmpDiary.uuid).then(diary => setDiary(diary));
        return () => {};
    }, []);

    /**
     * 뒤로가기 버튼 클릭시 이벤트
     */
    useEffect(() => {
        const backAction = () => {
            navigation.replace("Home");
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    /**
     * 애니메이션 이벤트 및 핸들링
     */
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => true,
        onPanResponderMove: Animated.event(
            [
                null,
                {
                    // dx  : pan.x,
                    dy: pan.y
                }
            ],
            {
                useNativeDriver: false
            }
        ),
        onPanResponderRelease: (e, gesture) => {
            /**
             * 화면 이동후 제자리로 돌아감
             */
            Animated.spring(pan, {
                useNativeDriver: false,
                toValue: { x: 0, y: 0 }
            }).start();
            /**
             * 만약 하단으로 화면 드래그시 리스트 화면으로 넘어감
             */
            if (gesture.dy < 0) {
                navigation.navigate("RecordList", {
                    diary: diary,
                    snack: null
                });
            }
        }
    });

    /**
     * 백그라운트 이미지
     * @param children
     * @constructor
     */
    const Background = ({ children }: BackgroundProps): ReactElement => {
        return (
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    pan.getLayout(),
                    {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        left: 0
                    }
                ]}
            >
                <Image
                    // source={require("@assets/images/record/diary_overview_bgimg_color_01.png")}
                    source={
                        background[
                            `${coverType}_${
                                coverType === "image"
                                    ? parseInt(coverId) % 4
                                    : parseInt(coverId) % 3
                            }` as backgroundKey
                        ]
                    }
                    style={{
                        width: Dimensions.get("screen").width,
                        height: Dimensions.get("screen").height,
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: Constants.statusBarHeight,
                        bottom: 0
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.replace("Home");
                    }}
                    style={{
                        top: 60,
                        left: 20,
                        position: "absolute"
                    }}
                >
                    <Image
                        source={require("@assets/icons/back.png")}
                        style={{
                            width: 24,
                            height: 24
                        }}
                    />
                </TouchableOpacity>
                {children}
            </Animated.View>
        );
    };

    return (
        <Background>
            <Container>
                {coverType === "image" && (
                    <HeaderImage
                        source={CoverBigImages[coverId as CoverColorTypes]}
                    />
                )}
                {coverType === "color" && (
                    <Color color={CoverColor[coverId as CoverColorTypes]} />
                )}
                <Content>
                    <Title>{title}</Title>
                    <Footer>
                        <View
                            style={{
                                flexDirection: "row"
                            }}
                        >
                            <Author>{nickname}</Author>
                            <FontAwesome5
                                name="crown"
                                size={11}
                                color="#6173ff"
                                style={{ marginLeft: 10, lineHeight: 15 }}
                            />
                        </View>

                        <Author>{`${members.length} 끼리`}</Author>
                    </Footer>
                </Content>
            </Container>

            <Button
                onPress={() => {
                    navigation.navigate("RecordInput", { diary: diary, prev: "home" });
                }}
            >
                <Icon
                    source={require("@assets/images/home_writing_normal.png")}
                />
                <ButtonText>오늘의 너를 들려줘 :)</ButtonText>
            </Button>

            <View
                style={{
                    position: "absolute",
                    bottom: 38
                }}
            >
                <ScrollDownButton
                    source={require("@assets/images/various_collapse_on_normal.png")}
                />
            </View>
        </Background>
    );
}

const Window = Dimensions.get("window");
