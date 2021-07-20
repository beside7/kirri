import React, { useState } from 'react'
import { View, TouchableOpacity, } from 'react-native'
import { Text_1, Background } from "@components";
import styles from './test-page.style'

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { PushMessage } from "@components";

type TestPageProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "TestPage">;
};

/**
 * 테스트용 페이지
 * @param param0 
 * @returns 
 */
export default function TestPage({ navigation }: TestPageProps) {
    
    const [modal, setModal] = useState(false);

    

    return (
        <Background>
            <PushMessage 
                visible={modal}
                closeModal={() => setModal(false) }
            />
            <View style={[styles.container]}>
                <TouchableOpacity onPress={() => { navigation.navigate("DiaryInput") }}>
                    <Text_1>* diary06_기록 작성 1</Text_1>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("DiaryList") }}>
                    <Text_1>* diary02_다이어리 홈</Text_1>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("DiaryDetail") }}>
                    <Text_1>* diary07_기록 보기 2_풀셋</Text_1>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("FriendMain") }}>
                    <Text_1>* diary06-1_친구끼리 추가</Text_1>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("MassageList") }}>
                    <Text_1>* home01_메인 홈 / 알림 / 초대알림</Text_1>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModal(true)} >
                    <Text_1>* home01_메인 홈 / PUSH 메시지 받았을 때</Text_1>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("MainHome") }}>
                    <Text_1>* home01_메인 홈</Text_1>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("Cheerup") }}>
                    <Text_1>* diary02_다이어리 홈 / 끼리 응원하기 1</Text_1>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("CheerupMessage") }}>
                    <Text_1>* pushdetail_응원메시지자세히보기</Text_1>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("Setting") }}>
                    <Text_1>* setting01_설정</Text_1>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("Onboarding") }}>
                    <Text_1>* onboarding</Text_1>
                </TouchableOpacity>
            </View>
        </Background>
    )
}
