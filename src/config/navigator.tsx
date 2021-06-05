import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    StackNavigationOptions
} from "@react-navigation/stack";
import { Home, NickName } from "@screens";

export type StackNavigatorParams = {
    Home: undefined;
    NickName: undefined;
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
    headerTitleAlign: "center"
};

export default function navigator(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={navigatorOptions}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NickName"
                    component={NickName}
                    options={{ headerTitle: "닉네임 만들기" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
