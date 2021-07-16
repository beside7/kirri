import React, { useRef, useEffect , useState} from 'react'
import { View , KeyboardAvoidingView, Platform, Dimensions , TouchableOpacity, Image } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';

import { Background, Text_2 , Select_1, TextInput, Header } from "@components";
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
            <Header
                leftIcon={<Image
                    style={{ width: 24, height: 24 }}
                    source={require("@assets/icons/x.png")} 
                />}
                rightIcon={<Text_2>
                    등록
                </Text_2>}
                title="처음 우리들의 끼리 다이러리"
             />
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={headerHeight}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <TextInput 
                        placeholder={"어떤 제목의 기록을 남겨볼까?"}
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
                    <View style={[styles.editorWrap , {marginTop: 5}]}>
                        <RichEditor
                            ref={richText}
                            editorStyle={{
                                cssText :fontFace,
                                contentCSSText: `
                                    font-family: Kyuri_diary; 
                                    font-size: 18px; 
                                `,
                                
                            }}
                            style={[styles.editor , {
                            }]}
                            initialHeight={(ScreenHeight - headerHeight) - 200}
                            placeholder={`너의 아주 작은 이야기까지 다 들어줄게!`}
                        />
                    </View>
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
                            (200/2000)
                        </Text_2>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Background>
    )
}
