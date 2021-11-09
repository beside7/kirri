import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import InviteNotification from "./invite-notification";
import FriendSupportMessage from "./friend-support-message";

const Tab = createMaterialTopTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                indicatorStyle: {
                    backgroundColor: "#17171c"
                }
            }}
        >
            <Tab.Screen name="초대 알림" component={InviteNotification} />
            <Tab.Screen
                name="친구의 응원 메세지"
                component={FriendSupportMessage}
            />
        </Tab.Navigator>
    );
}

export default function TabNavigator() {
    return <Tabs />;
}
