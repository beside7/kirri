import React, { ReactElement, useState, useEffect } from "react";
import {NavigationContainer } from '@react-navigation/native';
import {
    createStackNavigator,
    StackNavigationOptions
} from "@react-navigation/stack";

import {
    Login,
    Nickname,
    Home,
    TestPage,
    DiaryDetail,
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
} from "@screens";
import { Text } from "react-native";

export const navigationRef = React.createRef<any>();
import { View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userApis } from "@apis";
import { SafeAreaView } from "react-native-safe-area-context";

import { DiaryResType } from "@type-definition/diary"


export function navigate(name: string, params: any) {
    navigationRef.current?.navigate(name, params);
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
    DiaryDetail: undefined;
    FriendMain: { diary : DiaryResType | null };
    MassageList: undefined;
    Home: any;
    TermsAndConditions: undefined;
    MainHome: undefined
    Cheerup: undefined
    CheerupMessage: undefined
    Setting: undefined
    Onboarding: undefined
    RecordInfo: { diary : DiaryResType }
    RecordList: { diary : DiaryResType | null}
    RecordInput: { diary : DiaryResType | null }
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

    if (loading || !initalizePage) {
        return (<SafeAreaView></SafeAreaView>)
    }
    return (
        <NavigationContainer
            ref={navigationRef}
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
                    name="DiaryDetail"
                    component={DiaryDetail}
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}
