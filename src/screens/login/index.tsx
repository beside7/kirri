import React, {ReactElement, useState} from 'react'
import { View } from 'react-native'

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from './login.style'

import { LoginButton, Text, Background } from "@components";
import {KakaoWebview} from '@components';
import { SERVER_URL } from '@apis';

type LoginProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Login">;
};

export default function Home({ navigation }: LoginProps): ReactElement {
    const [closeSocialModal, setCloseSocialModal] = useState(false);
    const onComplete = (event: any) => {
        let result = JSON.parse(event.nativeEvent.data);
        let success = result.message;
        alert('왔다고!!');
        if (result.status === 'REQUIRED_SIGN_UP'){

        }
    }
    return (
        <Background>
            <KakaoWebview
                source={`${SERVER_URL}/kakao-sign-in`}
                closeSocialModal={closeSocialModal}
                onComplete={onComplete}
            />
            <View style={styles.content}>
                <Text style={styles.title}>KKiRi</Text>
                <View style={styles.subTitle}>
                    <Text style={styles.subTitleText}>우리끼리 만들어가는</Text>
                    <Text style={styles.subTitleText}>일상의 기록</Text>
                </View>
                <LoginButton style={styles.button} onPress={e => {
                    setCloseSocialModal(true);
                }}>
                    카카오톡 로그인
                </LoginButton>
                <LoginButton style={styles.appleButton} onPress={e => {
                    setCloseSocialModal(true);
                }}>
                    Sign in with Apple
                </LoginButton>
                {/* <Text style={styles.message}>아직 끼리에 가입하지 않으셨나요?</Text> */}
            </View>
            
            
        </Background>
    )
}
