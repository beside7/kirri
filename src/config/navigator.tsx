import React, { ReactElement, useState, useEffect,useRef } from "react";
import { NavigationContainer ,NavigationContainerRef, StackActions} from '@react-navigation/native';
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
    MassageList,
    MainHome,
    Cheerup,
    CheerupMessage,
    Setting,
    Onboarding,
    RecordInfo,
    RecordList,
    RecordInput,
    RecordView,
    Settings,
    DiaryConfig,
} from "@screens";
import { Text } from "react-native";

export const navigationRef = React.createRef<any>();
import { View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userApis } from "@apis";
import { SafeAreaView } from "react-native-safe-area-context";

import { DiaryResType, RecordResType } from "@type-definition/diary"
import { PushNotification } from "@type-definition/message"

import * as Notifications from "expo-notifications";


export function navigate(name: string, params: any) {
    navigationRef.current?.navigate(name, params);
  }

  export function navigateGoBack() {
    navigationRef.current?.goBack();
  }

interface TermsAndConditionsProps {
    accessToken: string,
    username: string,
    authorities: string[],
    status: string
}


export type StackNavigatorParams = {
    Login: undefined;
    Nickname: any;
    TestPage: undefined;
    FriendMain: { diary : DiaryResType | null };
    MassageList: undefined;
    Home: any;
    TermsAndConditions: undefined;
    MainHome: undefined
    Cheerup: undefined
    CheerupMessage: { title: string , body : string , data : PushNotification  }
    Setting: undefined
    RecordInfo: { diary : DiaryResType }
    RecordList: { diary : DiaryResType | null }
    RecordInput: { diary : DiaryResType | null , record? : RecordResType }
    RecordView: { diary : DiaryResType | null , record : RecordResType | null };
    Onboarding: undefined,
    Settings: any;
    DiaryConfig: { diary : DiaryResType | null };
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
        fontSize: 20,
    },
    headerBackTitleStyle: {
        fontFamily: "space-mono",
        fontSize: 14,
    },
};

type InitalizeRoutes = "Login" |"Home";

export default function navigator(): ReactElement {
    const [loading, setLoading] = useState(true);
    const [initalizePage, setInitailizePage] = useState<InitalizeRoutes>();
    const [isNavigatorReady, setIsNavigatorReady] = useState(false);
    const getUserInfo = () => {
        try {
            AsyncStorage.getItem('userKey', async(err, item) => {   
                if (item) {
                    const user = await userApis.userMe();
                    if (user.status === 'ACTIVE') {
                        setLoading(false);
                        setInitailizePage('Home');
                        return;
                    }
                }
                setInitailizePage('Login');
                setLoading(false);
            })
        } catch (error) {
            alert('error');
            navigate('Home', null);
        }
    }
    useEffect(()=>{
        getUserInfo();
    }, []);

    /**
     * 모바일 기기에서 푸쉬알림을 클릭했을때 이벤트 처리
     */
    useEffect(()=>{
        /**
         * 로그인한 이용자만 푸쉬 알림이 가능하도록
         */
        AsyncStorage.getItem('userKey', async(err, user) => {
            if (user && isNavigatorReady) {

                /**
                 * 모바일기기에서 푸쉬 알림 클릭시 이벤트 처리 
                 */
                const subscription = Notifications.addNotificationResponseReceivedListener(
                    response => {
                        const data = response.notification.request.content.data as unknown as PushNotification
                        const { title , body } = response.notification.request.content
                        const { messageType } = data;

                        switch (messageType) {
                            /**
                             * 받는 푸쉬알림이 응원일경우에는 "응원메시지 자세히보기"(pushdetails)
                             */
                            case "CHEERING":
                                navigationRef.current.dispatch(
                                    StackActions.replace("CheerupMessage" , { title , body , data })
                                );
                                break;
                            /**
                             * 받는 푸쉬알림이 공지push선택 일경우에는 끼리 메인 홈
                             */
                            case "NOTIFICATION": case "NEW_RECORD":
                                navigationRef.current.dispatch(
                                    StackActions.replace("Home")
                                );
                                break;
                            /**
                             * 초대push 선택 일경우에는 알림(push-01)
                             */
                            case "INVITATION": 
                                navigationRef.current.dispatch(
                                    StackActions.replace("MassageList")
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
                }
            }
        })

        
    }, [isNavigatorReady]);

    if (loading || !initalizePage) {
        return (<SafeAreaView></SafeAreaView>)
    }
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                setIsNavigatorReady(true);
            }}
        >
            <Stack.Navigator screenOptions={navigatorOptions}
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
                    name="MassageList"
                    component={MassageList}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="MainHome"
                    component={MainHome}
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
                    name="Setting"
                    component={Setting}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Onboarding"
                    component={Onboarding}
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
    )
}
