import React, {ReactElement, ReactNode, useState} from 'react'
import {View, Animated, PanResponder, Image,Dimensions} from 'react-native'
import Color from './color'

import { Container, HeaderImage, Title, Content, Footer,Author , Button, Icon , ButtonText, ScrollDownButton } from "./style";

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { CoverBigImages, CoverColorTypes, CoverColor } from "@utils";

import dateFormat from 'dateformat'
import { stringToDatetime } from '@utils'
import Constants from "expo-constants";

type RecordInfoProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "RecordInfo">;
    route: RouteProp<StackNavigatorParams, "RecordInfo">;
}

type BackgroundProps = {
    children: ReactNode;
};

export default function RecordInfo({navigation , route} : RecordInfoProps) {
    const diary = route.params.diary;
    const { title , createdDate , members, icon, uuid } = diary
    const [ coverType , coverId ] = icon.split(":")


    const { nickname } = members[0];
    const [pan, setPan] = useState(new Animated.ValueXY());

    /**
     * 애니메이션 이벤트 및 핸들링
     */
    const panResponder =  PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => true,
        onPanResponderMove: Animated.event([null,{
            // dx  : pan.x,
            dy  : pan.y
        }]),
        onPanResponderRelease: (e, gesture) => {
            /**
             * 화면 이동후 제자리로 돌아감
             */
            Animated.spring(
                pan,
                {useNativeDriver: false, toValue:{x:0,y:0}}
            ).start();
            /**
             * 만약 하단으로 화면 드래그시 리스트 화면으로 넘어감
             */
            if(gesture.dy < 0){
                navigation.navigate("RecordList", { diary: diary })
            }
        }
    })

    /**
     * 백그라운트 이미지
     * @param children
     * @constructor
     */
    const Background = ({ children } : BackgroundProps) : ReactElement => {
        return (
            <Animated.View
                {...panResponder.panHandlers}
                style={
                    [
                        pan.getLayout(),
                        {
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            left: 0,
                        }
                    ]
                }
            >
                <Image
                    source={require("@assets/images/record/diary_overview_bgimg_color_01.png")}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: Constants.statusBarHeight,
                        bottom: 0
                    }}
                />
                {children}
            </Animated.View>
        )
    }

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
                        <Author>{dateFormat(stringToDatetime(createdDate) , 'yyyy-mm-dd HH:MM:ss')}</Author>
                    </Footer>
                </Content>
            </Container>

            <Button
                onPress={()=>{
                    navigation.navigate("RecordInput", { diary: diary })
                }}
            >
                <Icon 
                    source={require("@assets/images/home_writing_normal.png")}
                />
                <ButtonText>오늘의 너를 들려줘 :)</ButtonText>
            </Button>

            <View
                style={{
                    position: 'absolute',
                    bottom: 38
                }}
            >
                <ScrollDownButton
                    source={require("@assets/images/various_collapse_on_normal.png")}
                />
            </View>
        </Background>
    )
}

const Window = Dimensions.get('window');