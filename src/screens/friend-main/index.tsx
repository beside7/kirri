import React from "react";
import { TouchableOpacity, Image } from "react-native";
import AppNavigator from "./tab-navigator";
import { Background, Header } from "@components";

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type FriendMainProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "FriendMain">;
    route: RouteProp<StackNavigatorParams, "FriendMain">;
};

export default function FriendMain({ navigation, route }: FriendMainProps) {
    const { diary } = route.params;

    return (
        <Background>
            <Header
                title="끼리 멤버"
                leftIcon={
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require("@assets/icons/back.png")}
                        />
                    </TouchableOpacity>
                }
                borderBottom={false}
            />
            <AppNavigator diary={diary} />
        </Background>
    );
}
