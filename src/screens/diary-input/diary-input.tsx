import React, { useRef, } from 'react'
import { View , KeyboardAvoidingView, Platform} from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';

import { Background, Text , Select_1, TextInput } from "@components";
import { actions , RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import styles from './diary-input.style'

export default function DiaryInput() {
    
    const richText = React.createRef<RichEditor>() || useRef<RichEditor>();

    const headerHeight = useHeaderHeight();

    const fontFace = `@font-face {
        font-family: 'Kyuri_diary';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Kyuri_diary.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }`;

    return (
        <Background>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={headerHeight}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <Text>2021년 6월 6일</Text>
                    <Select_1 />
                    <TextInput  value="오늘 하늘에 구름이 진짜 예쁜날" />
                    <View style={styles.editorWrap}>
                        <RichEditor
                            ref={richText}
                            editorStyle={{
                            cssText :fontFace,
                            contentCSSText: `
                            font-family: Kyuri_diary; 
                            font-size: 28px; 
                            `,
                            }}
                            style={styles.editor}
                            initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Background>
    )
}
