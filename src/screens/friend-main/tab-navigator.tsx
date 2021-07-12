import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

import { View, Text } from 'react-native'

import InviteFriend from "./invite-friend";
import ExportFriends from "./export-friends";

const Tab = createMaterialTopTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                indicatorStyle: {
                    backgroundColor: "#17171c",
                },
            }}
        >
            <Tab.Screen name="친구 초대" component={InviteFriend} />
            <Tab.Screen name="친구 내보내기" component={ExportFriends} />
        </Tab.Navigator>
    );
}

export default function TabNavigator() {
    return (
        <Tabs />
    )
}
