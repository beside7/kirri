import React, { ReactElement, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    StackNavigationOptions
} from "@react-navigation/stack";

import { Login, Nickname, DiaryInput, Home, TestPage, TermsAndConditions } from "@screens";
export const navigationRef = React.createRef<any>();
import { View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userApis } from "@apis";

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
    DiaryInput: undefined;
    Home: any;
    TestPage: undefined;
    TermsAndConditions: undefined;
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
    // headerTintColor: "#707070",
    headerTitleStyle: {
        fontFamily: "space-mono",
        fontSize: 20,
    },
    headerBackTitleStyle: {
        fontFamily: "space-mono",
        fontSize: 14,
    },
    headerTitleAlign: "center",
};

type InitalizeRoutes = "Login" |"Home"|"Nickname" ;

export default function navigator(): ReactElement {
    const [loading, setLoading] = useState(true);
    const [initalizePage, setInitailizePage] = useState<InitalizeRoutes>('Nickname');
    // const getUserInfo = () => {
    //     try {
    //         AsyncStorage.getItem('userKey', (err, item) => {   
    //             if (item) {
    //                 setLoading(false);
    //                 return;
    //             }
    //             setInitailizePage('Login');
    //             setLoading(false);
    //         })
    //     } catch (error) {
    //         navigate('Home', null);
    //     }
    // }
    // useEffect(()=>{
    //     getUserInfo();
    // }, []);

    // if (loading) {
    //     return (<View></View>)
    // }
    return (
        <NavigationContainer
            ref={navigationRef}
        >
            <Stack.Navigator screenOptions={navigatorOptions}
                initialRouteName={initalizePage}
            >
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
                    name="TestPage"
                    component={TestPage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TermsAndConditions"
                    component={TermsAndConditions}
                    options={{ headerShown: false }}
                />
                
                <Stack.Screen
                    name="DiaryInput"
                    component={DiaryInput}
                    options={{
                        headerTitle: "다이어리 선택",
                        headerStyle : {
                            backgroundColor: "#FFF",
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
