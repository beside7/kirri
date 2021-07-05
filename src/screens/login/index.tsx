import React, {ReactElement, useCallback} from 'react'
import { View } from 'react-native'

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from './login.style'

import { Button_1 as KakaoLoginButton, Text, Background } from "@components";

type LoginProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Login">;
};

export default function Home({ navigation }: LoginProps): ReactElement {
    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>KKiRi</Text>
                    <View style={styles.subTitle}>
                        <Text style={styles.subTitleText}>우리끼리 만들어가는</Text>
                        <Text style={styles.subTitleText}>일상의 기록</Text>
                    </View>
                    <KakaoLoginButton style={styles.button} onPress={useCallback(e => {
                        navigation.navigate("NickName")
                    } , [])}>
                        카카오톡 로그인
                    </KakaoLoginButton>
                    <Text style={styles.message}>아직 끼리에 가입하지 않으셨나요?</Text>
                </View>
            </View>
        </Background>
    )
}