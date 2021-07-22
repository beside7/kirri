import React, { useRef, useEffect , useState} from 'react'
import { View , KeyboardAvoidingView, Platform, Dimensions , TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';

import { Background, Text_2, Header } from "@components";
import { actions , RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import styles from './diary-input.style'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type DiaryInputProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "DiaryInput">;
    route: RouteProp<StackNavigatorParams, "DiaryInput">;
}

export default function DiaryInput({navigation , route} : DiaryInputProps) {
    
    const richText = React.createRef<RichEditor>() || useRef<RichEditor>();

    /**
     * 헤더 높이
     */
    const headerHeight = useHeaderHeight();

    /**
     * 스크린 높이
     */
    const ScreenHeight = Dimensions.get("window").height;

    /**
     * 이미지 목록
     */
    const [images, setImages] = useState<string[]>([]);

    /**
     * 본문
     */
    const [content, setContent] = useState("")

    /**
     * 제목
     */
    const [title, setTitle] = useState("")

    /**
     * 에디터 내부 css 설정
     */
    const fontFace = `@font-face {
        font-family: 'SpoqaHanSansNeo-Regular';
        src: url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff') format('woff';
        font-weight: normal;
        font-style: normal;
    }`;

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    }, []);

    /**
     * image pick 설정 및 실행
     */
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            const newImages = images ? images.concat(result.uri) : [result.uri]
            setImages(newImages);
        }
    };

    /**
     * 
     * @param index 이미지 번호
     */
    const removeImage = (index: number) : void => {
        const newImages = images?.filter((_ , num) => num !== index)
        setImages(newImages);
    }

    /**
     * 에디테에 글을 입력시 이벤트 처리
     * @param text 본문내용
     */
    const onKeyUp = (text: string) => {
        setContent(text)
    }

    return (
        <Background>
            <Header
                leftIcon={
                    <TouchableOpacity
                        onPress={() => {navigation.goBack()}}
                    >
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require("@assets/icons/x.png")} 
                        />
                    </TouchableOpacity>
                }
                rightIcon={<Text_2>
                    등록
                </Text_2>}
                title="처음 우리들의 끼리 다이러리"
                borderBottom={true}
             />
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={headerHeight}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <TextInput 
                        style={styles.title}
                        placeholderTextColor="#d1d1de"
                        placeholder={"어떤 제목의 기록을 남겨볼까?"}
                        value={title}
                        onChangeText={value => {
                            setTitle(value)
                        }}
                    />
                    {images && 
                        <View style={styles.imageList}>
                            {images.map( (image , index) => 
                                <View style={styles.imageWrap} key={index}>
                                    <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />
                                    <TouchableOpacity style={styles.closeIcon} onPress={e => removeImage(index)}>
                                        <AntDesign name="closecircle" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>}
                    <ScrollView style={[styles.editorWrap , {marginTop: 5}]}>
                        <RichEditor
                            ref={richText}
                            editorStyle={{
                                cssText :fontFace,
                                contentCSSText: `
                                    font-family: SpoqaHanSansNeo-Regular; 
                                    font-size: 14px; 
                                `,
                                
                            }}
                            style={[styles.editor , {
                            }]}
                            onChange={onKeyUp}
                            initialHeight={(ScreenHeight - headerHeight) - 200}
                            placeholder={`너의 아주 작은 이야기까지 다 들어줄게!`}
                        />
                        
                    </ScrollView>
                    <Image
                        style={styles.backgroudImage}
                        source={require("@assets/images/diary/diary_bottom_illust.png")}
                    />
                </View>
                <View style={styles.bottomTab}>
                    <TouchableOpacity onPress={pickImage} style={{ position: "absolute", left: 20 }}>
                        <Image 
                            source={require("@assets/icons/image.png")}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text_2 bold="Regular" style={{ color : "#6f6f7e" }}>
                            ({
                                content.length
                            }/2000)
                        </Text_2>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Background>
    )
}
