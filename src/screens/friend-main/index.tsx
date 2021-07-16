import React from 'react'
import { View, SafeAreaView } from 'react-native'
import styles from './friend-main.style'
import AppNavigator from './tab-navigator';
import Header_1 from './header_1/header_1'
import { Background, Header } from "@components";



export default function FriendMain() {
    return (
        <Background>
            <Header
                title="친구 관리"
                rightIcon={null}
            />
            <AppNavigator />
        </Background>
    )
}
