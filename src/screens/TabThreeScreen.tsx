import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet , Platform, TextInput, Dimensions } from 'react-native';

import { Text, View } from '../components/Themed';
import { actions , RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as ImagePicker from 'expo-image-picker';

const screenHeight = Dimensions.get('window').height;

export default function TabThreeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const richText = React.createRef<RichEditor>() || useRef<RichEditor>();


  let [fontsLoaded] = useFonts({
    'Korea_hero': require('../../assets/fonts/Korea_hero.ttf'),
  });
  const iOSCustomFontFace = `@font-face {
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    

    if (!result.cancelled) {
      
      console.log(result.uri);
      const ext = result.uri.split(".")[1];
      let imageSrc = `data:image/${ext};base64,${result.base64}`;
      if(richText.current){
        // richText.current.insertImage({ src: imageSrc });
        richText.current?.insertImage(
          imageSrc,
          'background: gray;',
        );
      }
      setImage(result.uri);
    } 
  };

  const onPressAddImage = () : void => {
    pickImage()
  }

  return fontsLoaded ? (
    <View style={styles.container}>
      <View>
        <TextInput placeholder="어떤 제목의 기록을 남겨볼까?" />
      </View>
      <View style={styles.editorWrap}>
        <RichEditor
            ref={richText}
            editorStyle={{
              cssText :iOSCustomFontFace,
              contentCSSText: `
              font-family: Kyuri_diary; 
              font-size: 28px; 
              `,
            }}
            style={styles.editor}
            initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
          />
        <RichToolbar 
          editor={richText}
          onPressAddImage={onPressAddImage}
          actions={[
            actions.undo,
            actions.redo,
            actions.insertVideo,
            actions.insertImage,
            actions.setStrikethrough,
            actions.checkboxList,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,

            actions.heading1,
            actions.heading4,
          ]}
        />
      </View>
    </View>
  ) : <AppLoading/> ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  editorWrap: {
    height: screenHeight - 90,
  },
  editor: {
    minHeight: 300,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#000',
    fontFamily: "Korea_hero"
  }
});
