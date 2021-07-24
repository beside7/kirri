import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { DiaryResType } from "@type-definition/diary";
import { View, Text } from 'react-native'

import InviteFriend from "./invite-friend";
import ExportFriends from "./export-friends";

const Tab = createMaterialTopTabNavigator();

type TabsProps = {
    diary? : DiaryResType
}

export default function TabNavigator({ diary } : TabsProps) {
    return (
        <Tab.Navigator
            tabBarOptions={{
                indicatorStyle: {
                    backgroundColor: "#17171c",
                },
            }}
        >
            <Tab.Screen name="멤버 목록" component={ExportFriends} />
            <Tab.Screen name="초대 하기" children={() => <InviteFriend diary={diary} />} />
        </Tab.Navigator>
    );
}