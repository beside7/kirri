import React, { ReactElement, useState, useEffect } from "react";
import {
    NavigationContainer,
    StackActions,
    CommonActions
} from "@react-navigation/native";

import { useMessagePopupDispatch } from "@components";

import {
    createStackNavigator,
    StackNavigationOptions
} from "@react-navigation/stack";

import {
    Login,
    Nickname,
    Home,
    TestPage,
    FriendMain,
    MessageList,
    Cheerup,
    CheerupMessage,
    RecordInfo,
    RecordList,
    RecordInput,
    RecordView,
    Settings,
    DiaryConfig,
    EditPersonalInfo,
    TermsWebview
} from "@screens";

export const navigationRef = React.createRef<any>();
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import { DiaryResType, RecordResType } from "@type-definition/diary";
import { PushNotification } from "@type-definition/message";

import * as Notifications from "expo-notifications";
import { initNotifications } from "@utils";
import { UserStore } from "@store";
import { PushMessageProvider } from "@components";
import { JoinProcessing } from "@screens";

export function navigateWithReset(name: string, params: any) {
    const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name, params }]
    });
    navigationRef.current?.dispatch(resetAction);
}

export function navigate(name: string, params: any) {
    navigationRef.current?.dispatch(
        StackActions.push(name, params ? params : {})
    );
}

export function navigateWithoutRefresh(name: string, params: any) {
    navigationRef.current?.navigate(name, params);
}

export function navigateGoBack() {
    navigationRef.current?.goBack();
}

interface TermsAndConditionsProps {
    accessToken: string;
    username: string;
    authorities: string[];
    status: string;
}

export type StackNavigatorParams = {
    Login: undefined;
    Nickname: any;
    TestPage: undefined;
    FriendMain: { diary: DiaryResType | null };
    MessageList: undefined;
    Home: any;
    TermsAndConditions: undefined;
    Cheerup: { diary: DiaryResType | null };
    CheerupMessage: { title: string; body: string; data: PushNotification };
    Settings: any;
    RecordInfo: { diary: DiaryResType };
    RecordList: { diary: DiaryResType | null; snack: string | null };
    RecordInput: { diary: DiaryResType | null; record?: RecordResType };
    RecordView: { diaryUuid: string | null; recordUuid: string | null, prev: "home" | "list" };
    DiaryConfig: { diary: DiaryResType | null };
    EditPersonalInfo: undefined;
    TermsWebview: { type?: string; title: string; url?: string };
};

const Stack = createStackNavigator<StackNavigatorParams>();

/**
 * Settings screen 헤더 설정
 */

const navigatorOptions: StackNavigationOptions = {
    headerStyle: {
        // backgroundColor: "#FFFCF0",
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0
        }
    },
    headerTitleStyle: {
        fontFamily: "space-mono",
        fontSize: 20
    },
    headerBackTitleStyle: {
        fontFamily: "space-mono",
        fontSize: 14
    }
};

type InitalizeRoutes = "Login" | "Home";

export default function navigator(): ReactElement {
    const [loading, setLoading] = useState(true);
    const [initalizePage, setInitailizePage] = useState<InitalizeRoutes>();
    const [isNavigatorReady, setIsNavigatorReady] = useState(false);
    const messagePopupDispatch = useMessagePopupDispatch();
    const getUserInfo = () => {
        try {
            AsyncStorage.getItem("userKey", async (err, item) => {
                if (err) {
                    setInitailizePage("Login");
                    setLoading(false);
                }

                if (item) {
                    try {
                        await UserStore.login();
                    } catch (error) {
                        AsyncStorage.removeItem("userKey", async err => {
                            setLoading(false);
                            setInitailizePage("Login");
                        });
                    }
                    const notificationToken = await initNotifications();
                    if (UserStore.status === "ACTIVE") {
                        setLoading(false);
                        setInitailizePage("Home");
                        return;
                    }
                }
                setInitailizePage("Login");
                setLoading(false);
            });
        } catch (error) {
            alert("error");
            navigate("Home", null);
        }
    };
    useEffect(() => {
        getUserInfo();
        return () => {
            if (!UserStore.autoLogin) {
                AsyncStorage.removeItem("userKey");
            }
        };
    }, []);

    /**
     * 모바일 기기에서 푸쉬알림을 클릭했을때 이벤트 처리
     */
    useEffect(() => {
        /**
         * 로그인한 이용자만 푸쉬 알림이 가능하도록
         */
        AsyncStorage.getItem("userKey", async (err, user) => {
            if (user && isNavigatorReady) {
                /**
                 * 모바일기기에서 푸쉬 알림 클릭시 이벤트 처리
                 */
                const subscription =
                    Notifications.addNotificationResponseReceivedListener(
                        response => {
                            const data = response.notification.request.content
                                .data as unknown as PushNotification;
                            const { title, body } =
                                response.notification.request.content;
                            const { messageType } = data;

                            switch (messageType) {
                                /**
                                 * 초대push 선택 일경우에는 알림(push-01)
                                 */
                                case "INVITATION":
                                    navigationRef.current.dispatch(
                                        StackActions.replace("MessageList")
                                    );
                                    break;
                                /**
                                 * 받는 푸쉬알림이 응원일경우에는 "응원메시지 자세히보기"(pushdetails)
                                 */
                                case "CHEERING":
                                    navigationRef.current.dispatch(
                                        StackActions.replace("CheerupMessage", {
                                            title,
                                            body,
                                            data
                                        })
                                    );
                                    // messagePopupDispatch({type: 'ADD_MESSAGE_POPUP', payload: data});
                                    break;
                                /**
                                 * 받는 푸쉬알림이 공지push선택 일경우에는 끼리 메인 홈
                                 */
                                case "NOTIFICATION":
                                case "NEW_RECORD":
                                    navigationRef.current.dispatch(
                                        StackActions.replace("Home")
                                    );
                                    break;

                                default:
                                    break;
                            }
                        }
                    );

                /**
                 * 끝나면 제거
                 */
                return () => {
                    subscription.remove();
                };
            }
        });
    }, [isNavigatorReady]);

    if (loading || !initalizePage) {
    // if (true) {
        return <JoinProcessing open={true} />;
    }
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                setIsNavigatorReady(true);
            }}
        >
            <Stack.Navigator
                screenOptions={navigatorOptions}
                initialRouteName={initalizePage}
            >
                <Stack.Screen
                    name="TestPage"
                    component={TestPage}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Nickname"
                    component={Nickname}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="RecordInput"
                    component={RecordInput}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="RecordList"
                    component={RecordList}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="RecordView"
                    component={RecordView}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="FriendMain"
                    component={FriendMain}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="MessageList"
                    component={MessageList}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Cheerup"
                    component={Cheerup}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="CheerupMessage"
                    component={CheerupMessage}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="EditPersonalInfo"
                    component={EditPersonalInfo}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="TermsWebview"
                    component={TermsWebview}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="RecordInfo"
                    component={RecordInfo}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="DiaryConfig"
                    component={DiaryConfig}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
