import React, { useRef, useEffect , useState} from 'react'
import { View , KeyboardAvoidingView, Platform, Dimensions , TouchableOpacity, Image } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';

import { Background, Text , Select_1, TextInput } from "@components";
import { actions , RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import styles from './diary-input.style'
import { FontAwesome5, AntDesign  } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


export default function DiaryInput() {
    
    const richText = React.createRef<RichEditor>() || useRef<RichEditor>();

    const headerHeight = useHeaderHeight();

    const ScreenHeight = Dimensions.get("window").height;

    const [images, setImages] = useState<string[]>([]);

    const fontFace = `@font-face {
        font-family: 'Kyuri_diary';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Kyuri_diary.woff') format('woff');
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

    const removeImage = (index: number) : void => {
        const newImages = images?.filter((_ , num) => num !== index)
        setImages(newImages);
    }

    return (
        <Background>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={headerHeight}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <Text>2021년 6월 6일</Text>
                    <Select_1 style={{ marginTop: 20 }}/>
                    <TextInput value="오늘 하늘에 구름이 진짜 예쁜날" style={{ 
                        marginTop: 20, 
                        backgroundColor: "#FFFFFF" , 
                        borderColor: "#FDF5E7",
                    }} />
                    {images && 
                        <View style={styles.imageList}>
                            {images.map( (image , index) => 
                                <View style={styles.imageWrap} key={index}>
                                    <Image source={{ uri: image }} style={{ width: 60, height: 60 }} />
                                    <TouchableOpacity style={styles.closeIcon} onPress={e => removeImage(index)}>
                                        <AntDesign name="closecircle" size={15} color="black" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>}
                    <View style={[styles.editorWrap , {marginTop: 20}]}>
                        <RichEditor
                            ref={richText}
                            editorStyle={{
                                backgroundColor: "#FFFCF0",
                                cssText :fontFace,
                                contentCSSText: `
                                    font-family: Kyuri_diary; 
                                    font-size: 18px; 
                                `,
                            }}
                            style={[styles.editor , {
                            }]}
                            initialHeight={(ScreenHeight - headerHeight) - 300}
                            initialContentHTML={'너의 아주 작은 이야기까지 다 들어줄게!'}
                        />
                    </View>
                </View>
                <View style={styles.bottomTab}>
                    <TouchableOpacity onPress={pickImage}>
                        <FontAwesome5 name="images" size={32} color="gray" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Background>
    )
}
