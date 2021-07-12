import React from 'react'
import { View, SafeAreaView } from 'react-native'
import styles from './friend-main.style'
import AppNavigator from './tab-navigator';
import Header_1 from './header_1/header_1'
import { Background } from "@components";



export default function FriendMain() {
    return (
        <Background>
            <Header_1 />
            <AppNavigator />
        </Background>
    )
}
