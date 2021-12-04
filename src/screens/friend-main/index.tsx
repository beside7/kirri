import React, {useEffect} from "react";
import {TouchableOpacity, Image, BackHandler} from "react-native";
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

    useEffect(() => {
        const backAction = () => {
            navigation.replace("RecordList", {
                diary: diary,
                snack: null
            });
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

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
