import React from 'react'
import { View, Text } from 'react-native'
import Background from "./background";
import Color from './color'

import { Container, HeaderImage, Title, Content, Footer,Author , Button, Icon , ButtonText } from "./style";

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { CoverBigImages, CoverColorTypes, CoverColor } from "@utils";

type RecordInfoProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "RecordInfo">;
    route: RouteProp<StackNavigatorParams, "RecordInfo">;
}

export default function RecordInfo({navigation , route} : RecordInfoProps) {
    const diary = route.params.diary;
    const { title , createdDate , members, icon, uuid } = diary
    const [ coverType , coverId ] = icon.split(":")



    const { nickname } = members[0];
    // console.log(diary);
    

    return (
        <Background>
            <Container>
                {
                    coverType === 'image' &&
                    <HeaderImage
                        source={CoverBigImages[coverId as CoverColorTypes]}
                    />
                }
                {
                    coverType === 'color' &&
                    <Color 
                        color={CoverColor[coverId as CoverColorTypes]}
                    />
                }  
                <Content>
                    <Title>
                        {title}
                    </Title>
                    <Footer>
                        <Author>{nickname}</Author>
                        <Author>{createdDate}</Author>
                    </Footer>
                </Content>
            </Container>

            <Button
                onPress={()=>{
                    navigation.navigate("RecordList", { diary: diary })
                }}
            >
                <Icon 
                    source={require("@assets/images/home_writing_normal.png")}
                />
                <ButtonText>오늘의 너를 들려줘 :)</ButtonText>
            </Button>
        </Background>
    )
}
