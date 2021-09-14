import React , { useEffect , useState } from 'react'
import { Alert, TouchableOpacity, Image } from 'react-native'

import { Header , Background, Text_2 } from "@components";
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { DiaryResType } from "@type-definition/diary"
import { diaryApis } from "@apis";

import { CoverImages, CoverColor , CoverCircleImageTypes } from "@utils";

const SelecedCheckImage = require('@assets/images/diary/writing_select_diary_check_box_checked.png');


import { 
    Container,
    TitleConteiner,
    Label,
    Title,
    Count,
    Input,
    CoverConteiner,
    BigCoverImageConteiner,
    BigCoverImageLine,
    BigCoverImage,
    BigCoverColor,
    CircleCoverImageConteiner,
    CircleCoverImage,
    CircleCoverColor,
    SelectImage,
    SelectColor
} from "./style";


type DiaryConfigProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "DiaryConfig">;
    route: RouteProp<StackNavigatorParams, "DiaryConfig">;
};

/**
 * 다이러리 수정창
 * @returns 
 */
export default function DiaryConfig({ navigation, route } : DiaryConfigProps) {
    
    /**
     * 해당 다이러리 정보
     */
    const [diary, setDiary] = useState<DiaryResType | null>(route.params.diary)

    /**
     * 아이콘 정보
     */
    const [icon, setIcon] = useState<{ type: "image" | "color" , index: CoverCircleImageTypes } | null>(null)

    /**
     * 다이러리 이름
     */
    const [title, setTitle] = useState("")

    /**
     * 서버로 부터 다이러리 정보를 받아오는 부분
     */
    const getDiary = async () => {
        if(diary){
            try {
                const data = await diaryApis.viewDiary(diary.uuid);
                const { icon, title } = data;
                
                setIcon({
                    type: icon.split(":")[0] as "image" | "color",
                    index: icon.split(":")[1] as CoverCircleImageTypes
                })
                setDiary(data);
                setTitle(title);
            } catch (error) {
                console.log(error);
            }
        }
    }

    /**
     * 서버에 전송
     */
    const onSubmit = async () => {
        if(diary){
            try {
                const { uuid } = diary
                await diaryApis.modifyDiary(uuid , {
                    icon: `${icon?.type}:${icon?.index}`,
                    title: title
                });
                Alert.alert("수정되었습니다.");
                navigation.replace("Home")
            } catch (error) {
                if (error.response) {
                    const { data } = error.response;
                    console.log(data);
                }
                Alert.alert("서버 전송간 에러가 발생했습니다.");
                console.log(error);
            }
        }
    }

    /**
     * 최초 로딩시 동작
     */
    useEffect(() => {
        getDiary()
    }, [])
    
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
                title="다이어리 수정"
                rightIcon={
                    <TouchableOpacity onPress={onSubmit}>
                        <Text_2>
                            완료
                        </Text_2>
                    </TouchableOpacity>
                }
            />
            <Container>
                <TitleConteiner>
                    <Label>
                        <Title>멋진 다이어리 이름을 써주세요.</Title>
                        <Count>{title.length}/12</Count>
                    </Label>
                    <Input 
                        value={title}
                        onChangeText={value => {
                            setTitle(value);
                        }}
                    />
                </TitleConteiner>
                <CoverConteiner>
                    <Label>
                        <Title>다이어리 표지를 꾸며보세요.</Title>
                    </Label>
                    <BigCoverImageConteiner>
                        <BigCoverImageLine>
                            { icon?.type === "image" && <BigCoverImage source={CoverImages[icon.index]} /> }
                            { icon?.type === "color" && <BigCoverColor color={CoverColor[icon.index]} /> }
                        </BigCoverImageLine>
                    </BigCoverImageConteiner>
                    <CircleCoverImageConteiner>
                        <TouchableOpacity onPress={() => { setIcon({ type: "image" , index: "01" }) }} ><CircleCoverImage style={{ borderWidth: (icon?.type==="image" && icon.index === "01") ? 2 : 0, borderColor: "#ffdd1f", borderRadius: 100 }} source={require("@assets/images/diary/diary_circleimg_01.png")}></CircleCoverImage>{(icon?.type==="image" && icon.index === "01") && <SelectImage source={SelecedCheckImage}/>}</TouchableOpacity>
                        <TouchableOpacity onPress={() => { setIcon({ type: "image" , index: "02" }) }} ><CircleCoverImage style={{ borderWidth: (icon?.type==="image" && icon.index === "02") ? 2 : 0, borderColor: "#ffdd1f", borderRadius: 100 }} source={require("@assets/images/diary/diary_circleimg_02.png")}></CircleCoverImage>{(icon?.type==="image" && icon.index === "02") && <SelectImage source={SelecedCheckImage}/>}</TouchableOpacity>
                        <TouchableOpacity onPress={() => { setIcon({ type: "image" , index: "03" }) }} ><CircleCoverImage style={{ borderWidth: (icon?.type==="image" && icon.index === "03") ? 2 : 0, borderColor: "#ffdd1f", borderRadius: 100 }} source={require("@assets/images/diary/diary_circleimg_03.png")}></CircleCoverImage>{(icon?.type==="image" && icon.index === "03") && <SelectImage source={SelecedCheckImage}/>}</TouchableOpacity>
                        <TouchableOpacity onPress={() => { setIcon({ type: "image" , index: "04" }) }} ><CircleCoverImage style={{ borderWidth: (icon?.type==="image" && icon.index === "04") ? 2 : 0, borderColor: "#ffdd1f", borderRadius: 100 }} source={require("@assets/images/diary/diary_circleimg_04.png")}></CircleCoverImage>{(icon?.type==="image" && icon.index === "04") && <SelectImage source={SelecedCheckImage}/>}</TouchableOpacity>
                        <TouchableOpacity onPress={() => { setIcon({ type: "image" , index: "05" }) }} ><CircleCoverImage style={{ borderWidth: (icon?.type==="image" && icon.index === "05") ? 2 : 0, borderColor: "#ffdd1f", borderRadius: 100 }} source={require("@assets/images/diary/diary_circleimg_05.png")}></CircleCoverImage>{(icon?.type==="image" && icon.index === "05") && <SelectImage source={SelecedCheckImage}/>}</TouchableOpacity>
                        <TouchableOpacity onPress={() => { setIcon({ type: "image" , index: "06" }) }} ><CircleCoverImage style={{ borderWidth: (icon?.type==="image" && icon.index === "06") ? 2 : 0, borderColor: "#ffdd1f", borderRadius: 100 }} source={require("@assets/images/diary/diary_circleimg_06.png")}></CircleCoverImage>{(icon?.type==="image" && icon.index === "06") && <SelectImage source={SelecedCheckImage}/>}</TouchableOpacity>
                        <CircleCoverColor style={{ borderWidth: (icon?.type==="color" && icon.index === "01") ? 2 : 0, borderColor: "#ffdd1f" }} onPress={() => { setIcon({ type: "color" , index: "01" }) }} color="#6173ff">{(icon?.type==="color" && icon.index === "01") && <SelectColor source={SelecedCheckImage}/>}</CircleCoverColor>
                        <CircleCoverColor style={{ borderWidth: (icon?.type==="color" && icon.index === "02") ? 2 : 0, borderColor: "#ffdd1f" }} onPress={() => { setIcon({ type: "color" , index: "02" }) }} color="#e49ffd">{(icon?.type==="color" && icon.index === "02") && <SelectColor source={SelecedCheckImage}/>}</CircleCoverColor>
                        <CircleCoverColor style={{ borderWidth: (icon?.type==="color" && icon.index === "03") ? 2 : 0, borderColor: "#ffdd1f" }} onPress={() => { setIcon({ type: "color" , index: "03" }) }} color="#4fbcd0">{(icon?.type==="color" && icon.index === "03") && <SelectColor source={SelecedCheckImage}/>}</CircleCoverColor>
                        <CircleCoverColor style={{ borderWidth: (icon?.type==="color" && icon.index === "04") ? 2 : 0, borderColor: "#ffdd1f" }} onPress={() => { setIcon({ type: "color" , index: "04" }) }} color="#b59aff">{(icon?.type==="color" && icon.index === "04") && <SelectColor source={SelecedCheckImage}/>}</CircleCoverColor>
                        <CircleCoverColor style={{ borderWidth: (icon?.type==="color" && icon.index === "05") ? 2 : 0, borderColor: "#ffdd1f" }} onPress={() => { setIcon({ type: "color" , index: "05" }) }} color="#fdae43">{(icon?.type==="color" && icon.index === "05") && <SelectColor source={SelecedCheckImage}/>}</CircleCoverColor>
                        <CircleCoverColor style={{ borderWidth: (icon?.type==="color" && icon.index === "06") ? 2 : 0, borderColor: "#ffdd1f" }} onPress={() => { setIcon({ type: "color" , index: "06" }) }} color="#1ad0ff">{(icon?.type==="color" && icon.index === "06") && <SelectColor source={SelecedCheckImage}/>}</CircleCoverColor>
                    </CircleCoverImageConteiner>
                </CoverConteiner>
            </Container>
        </Background>
    )
}
