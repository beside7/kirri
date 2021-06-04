import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    StackNavigationOptions
} from "@react-navigation/stack";
import { Home } from "@screens";

export type StackNavigatorParams = {
    Home: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

/**
 * Settings screen 헤더 설정
 */
 const navigatorOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: "#fff",
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0
        }
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontFamily: "DeliusUnicase_700Bold",
        fontSize: 20
    },
    headerBackTitleStyle: {
        fontFamily: "DeliusUnicase_400Regular",
        fontSize: 14
    }
};

export default function navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={navigatorOptions}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
