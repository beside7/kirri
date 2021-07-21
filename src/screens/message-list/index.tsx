import React from 'react'
import { Background, Header } from "@components";
import AppNavigator from "./tab-navigator";
import { TouchableOpacity, Image } from 'react-native';
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";

type MessageListProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "MassageList">;
}

export default function MessageList({ navigation } : MessageListProps) {
    return (
        <Background>
            <Header
                title="알림"
                leftIcon={
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Image 
                            style={{ width: 24, height: 24 }}
                            source={require("@assets/icons/back.png")}
                        />
                    </TouchableOpacity>
                }
            />
            <AppNavigator />
        </Background>
    )
}
