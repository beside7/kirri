import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    StackNavigationOptions
} from "@react-navigation/stack";
import { Login, NickName, DiaryInput, Home, TestPage, DiaryList, DiaryDetail, FriendMain, MassageList } from "@screens";
import { Text } from "react-native";

export type StackNavigatorParams = {
    Login: undefined;
    NickName: undefined;
    DiaryInput: undefined;
    DiaryList: undefined;
    Home: undefined;
    TestPage: undefined;
    DiaryDetail: undefined;
    FriendMain: undefined;
    MassageList: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

/**
 * Settings screen 헤더 설정
 */
const navigatorOptions: StackNavigationOptions = {
    // headerStyle: {
    //     backgroundColor: "#FFFCF0",
    //     shadowRadius: 0,
    //     shadowOffset: {
    //         height: 0,
    //         width: 0
    //     }
    // },
    // headerTintColor: "#707070",
    headerTitleStyle: {
        fontFamily: "space-mono",
        fontSize: 20,
    },
    headerBackTitleStyle: {
        fontFamily: "space-mono",
        fontSize: 14,
    },
    headerTitleAlign: "center"
};

export default function navigator(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={navigatorOptions}>
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
                    name="NickName"
                    component={NickName}
                    options={{ headerTitle: "닉네임 만들기" }}
                />
                <Stack.Screen
                    name="DiaryInput"
                    component={DiaryInput}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="DiaryList"
                    component={DiaryList}
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}
