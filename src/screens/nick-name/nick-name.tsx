import React, {ReactElement, useCallback} from 'react'
import { View, Dimensions,KeyboardAvoidingView, Platform } from 'react-native'
import styles from "./nick-name.style";
import { Background, Button_1, Text, TextInput } from "@components";
import { useHeaderHeight } from '@react-navigation/stack';
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";


type NickNameProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "NickName">;
};

export default function NickName({ navigation }: NickNameProps): ReactElement {
    const ScreenHeight = Dimensions.get("window").height;
    const headerHeight = useHeaderHeight();
    return (
        <Background>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={headerHeight}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <View style={[styles.content, { height : (ScreenHeight - headerHeight) }]}>
                        <View style={styles.thumbnailContent}>
                            <View style={styles.thumbnailImage}>
                            </View>
                        </View>

                        <View style={styles.textInputContent}>
                            <Text style={styles.message1}>영문 숫자 조합으로 멋진 닉네임을 만들어 주세요</Text>
                            <TextInput style={styles.textInput}/>
                            <Button_1 style={styles.button} onPress={useCallback(e => { navigation.navigate("DiaryInput") } , [])}>OK</Button_1>
                        </View>
                        
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Background>
    )
}
