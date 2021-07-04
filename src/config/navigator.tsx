import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    StackNavigationOptions
} from "@react-navigation/stack";

import { Login, Nickname, DiaryInput, Home, TestPage, TermsAndConditions } from "@screens";
import { Text } from "react-native";

interface TermsAndConditionsProps {
    accessToken: string,
    username: string,
    authorities: string[],
    status: string
}

export type StackNavigatorParams = {
    Login: undefined;
    Nickname: undefined;
    DiaryInput: undefined;
    Home: undefined;
    TestPage: undefined;
    TermsAndConditions: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

/**
 * Settings screen 헤더 설정
 */
 const navigatorOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: "#FFFCF0",
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0
        }
    },
    headerTintColor: "#707070",
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

export default function navigator(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={navigatorOptions}>
                <Stack.Screen
                    name="Nickname"
                    component={Nickname}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
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
