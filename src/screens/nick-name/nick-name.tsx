import React from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import styles from "./nick-name.style";
import { Background, Button_1, Text } from "@components";
import { useHeaderHeight } from '@react-navigation/stack';
export default function NickName() {
    const ScreenHeight = Dimensions.get("window").height;
    const headerHeight = useHeaderHeight();
    return (
        <Background>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.content, { height : (ScreenHeight - headerHeight) }]}>
                    <View>
                        <View style={styles.thumbnailImage}>

                        </View>
                    </View>
                    <View>
                        <Text>영문 숫자 조합으로 멋진 닉네임을 만들어 주세요</Text>
                    </View>
                    <Button_1>
                        OK
                    </Button_1>
                </View>
            </ScrollView>
        </Background>
    )
}
