import React, { useRef, useEffect, useState, createRef } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView
} from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";

import { Background, Text_2, Header, SlideDownModal } from "@components";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

import styles from "./record-input.style";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { recordApis } from "@apis";

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { CreateRecordReqType, DiaryResType, DiariesResType } from "@type-definition/diary";
import { diaryApis } from '@apis';

import ActionSheet from "react-native-actions-sheet";
import { FlatList } from "react-native-gesture-handler";

import { CoverCircleImages , CoverColor} from "@utils";

type RecordInputProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "RecordInput">;
  route: RouteProp<StackNavigatorParams, "RecordInput">;
};

export default function RecordInput({ navigation, route }: RecordInputProps) {


  /**
   * 다이어리 선택 ref
   */
  const selectDiaryRef = useRef<any>();


  /**
   * 다이러리 정보
   */
  const [diary, setDiary] = useState<DiaryResType | null>(route.params.diary);

  /**
   * 선택한 다이러리 정보 - uuid
   */
  const [selectDiary, setSelectDiary] = useState<string | null>(null)

  /**
   * 하단 다이러리 리스트
   */
  const [diatyList, setDiatyList] = useState<DiaryResType[]>([])

  /**
   * 기록정보
   */
  const record = route.params.record;

  /**
   * new : 신규 , modify 수정
   */
  const type : "new" | "modify" = record === undefined ? "new" : "modify"


  /**
   * editor ref
   */
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
   * 사용자가 입력한 이미지 목록
   */
  const [images, setImages] = useState<string[]>((type === "modify" && record) ? record.images.map( item => item.path ) : []);
  
  /**
   * 본문
   */
  const [body, setBody] = useState((type === "modify" && record) ? record.body : "");

  /**
   * 제목
   */
  const [title, setTitle] = useState( (type === "modify" && record) ? record.title : "" );

  /**
   * 에디터 내부 css 설정
   */
  const fontFace = `@font-face {
        font-family: 'SpoqaHanSansNeo-Regular';
        src: url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff') format('woff';
        font-weight: normal;
        font-style: normal;
    }`;

  /**
   * 최초 로드시 이벤트
   */
  useEffect(() => {
    /**
     * 이미지 사용권한 요청
     */
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
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
      allowsEditing: false,
      // aspect: [4, 3],
      // quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      const newImages = images ? images.concat(result.uri) : [result.uri];
      setImages(newImages);
    }
  };

  /**
   * 추가한 이미지 제거
   * @param index 이미지 번호
   */
  const removeImage = (index: number): void => {
    const newImages = images?.filter((_, num) => num !== index);
    setImages(newImages);
  };

  /**
   * 에디테에 글을 입력시 이벤트 처리
   * @param text 본문내용
   */
  const onKeyUp = (text: string) => {
    setBody(text);
  };

  /**
   * 서버에 전송
   */
  const sendServer = async () => {
      if(diary){
        const { uuid } = diary;
        
        // let file : Blob | null = null;
        let files : string[] | null = null;

        if(images.length > 0) {
            files = images;
            files = files.map(file => (Platform.OS === "android") ? file : file.replace('file://', ''))
        }

        
        
        const payload : CreateRecordReqType = {
            title , body , files
        }

        try {
            (type === "new") ? await recordApis.createRecord(uuid , payload) 
              : await recordApis.modifyRecord(uuid , record!.uuid , payload)
            Alert.alert(`글이 ${ type === "modify" ? "수정" : "생성"}되었습니다.`);
            navigation.replace("RecordList", { diary: diary })
        } catch (error) {
            // console.log(error);
            // console.log(error.response);
            
            Alert.alert(`글이 ${ type === "modify" ? "수정" : "생성"} 간 에러가 발생했습니다.` , error.response.data);
        }
      } else {
        Alert.alert("다이러리를 선택해주세요")
      }
  }

  /**
   * 타이틀 클릭시 이벤트 처리
   */
  const onPressTitle = async () => {
    /**
     * 하단 팝업 열기
     */
    selectDiaryRef.current?.open();
    const data = await diaryApis.getDiaries();
    const { elements } = data;
    setDiatyList(elements);
  }


  return (
    <Background>
      <Header
        leftIcon={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("@assets/icons/x.png")}
            />
          </TouchableOpacity>
        }
        rightIcon={
            <TouchableOpacity onPress={sendServer}>
                <Text_2>
                  { type === "new" ? "등록" : "수정" } 
                </Text_2>
            </TouchableOpacity>
        }
        title={
          (diary !== null) ? 
            diary.title
            :
            <TouchableOpacity
              onPress={onPressTitle}
              style={{ flexDirection: "row" }}
              >
              <Text_2>처음 우리들의 끼리 다이러리</Text_2>
              <Image 
                style={{ width: 24 , height: 24 }}
                source={require("@assets/images/various_collapse_on_normal.png")}
              />
            </TouchableOpacity>
        }
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
            onChangeText={(value) => {
              setTitle(value);
            }}
          />
          {images && (
            <View style={styles.imageList}>
              {images.map((image, index) => (
                <View style={styles.imageWrap} key={index}>
                  <Image
                    source={{ uri: image }}
                    style={styles.insertImages}
                  />
                  <TouchableOpacity
                    style={styles.closeIcon}
                    onPress={(e) => removeImage(index)}
                  >
                    <AntDesign name="closecircle" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
          <ScrollView style={[styles.editorWrap, { marginTop: 5 }]}>
            <RichEditor
              ref={richText}
              editorStyle={{
                cssText: fontFace,
                contentCSSText: `font-family: SpoqaHanSansNeo-Regular; font-size: 14px; `,
              }}
              style={[styles.editor, {}]}
              onChange={onKeyUp}
              initialContentHTML={ (type==="modify" && record) ? record.body : ""}
              initialHeight={ScreenHeight - headerHeight - 200}
              placeholder={`너의 아주 작은 이야기까지 다 들어줄게!`}
            />
          </ScrollView>
          <Image
            style={styles.backgroudImage}
            source={require("@assets/images/diary/diary_bottom_illust.png")}
          />
        </View>
        <View style={styles.bottomTab}>
          <TouchableOpacity
            onPress={pickImage}
            style={{ position: "absolute", left: 20 }}
          >
            <Image
              source={require("@assets/icons/image.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <View>
            <Text_2 bold="Regular" style={{ color: "#6f6f7e" }}>
              ({body.length}/2000)
            </Text_2>
          </View>
        </View>
        
        {/* 하단 팝업 부분 */}
        <SlideDownModal
          ref={selectDiaryRef}
        >
          <View style={styles.bottomPopupContainer}>
            <View style={styles.bottomPopupTitleContainer}>
              <Text_2 style={styles.bottomPopupTitle}>다이어리 선택</Text_2>
            </View>
            <SafeAreaView style={{ height: 300 }}>
              <FlatList 
                data={diatyList}
                keyExtractor={(item, index) => item.uuid}
                renderItem={({ item }) => {
                  return(
                    <TouchableOpacity 
                      style={styles.diatyListItemContainer}
                      onPress={() => {
                        item.uuid !== selectDiary ? setSelectDiary(item.uuid) : setSelectDiary(null)
                      }}
                    >
                      <View style={styles.diatyListItemThumbnailContainer}>
                        {
                          item.icon.split(":")[0] === "image" ?
                          <Image 
                            style={ item.uuid === selectDiary && styles.selectDiaryImage }
                            source={CoverCircleImages[item.icon.split(":")[1] as '01' | '02' | '03' | '04' | '05' | '06' ]}
                          />
                          :
                          <View 
                            style={{
                              width: 40,
                              height: 40,
                              backgroundColor: CoverColor[item.icon.split(":")[1] as '01' | '02' | '03' | '04' | '05' | '06' ]
                            }}
                          />
                        }
                      </View>
                      <View>
                        <Text_2 style={styles.diatyListItemTitle}>{item.title}</Text_2>
                        <Text_2 style={styles.diatyListItemCount}>{item.members.length} 끼리</Text_2>
                      </View>
                    </TouchableOpacity>
                  )
                }}
              />
            </SafeAreaView>
            <View style={styles.bottomPopupButtonContainer}>
              <TouchableOpacity 
                style={selectDiary === null ? styles.bottomPopupDisableButton : styles.bottomPopupEnableButton}
                onPress={() => {
                  if(selectDiary ){
                    const diary = diatyList.find(({uuid}) => uuid === selectDiary);
                    if(diary){
                      setSelectDiary(null)
                      setDiary( diary )
                      selectDiaryRef.current?.close();
                    }
                  } 
                }}
              >
                <Text_2>완료</Text_2>
              </TouchableOpacity>
            </View>
          </View>
        
        </SlideDownModal>

      </KeyboardAvoidingView>
    </Background>
  );
}
