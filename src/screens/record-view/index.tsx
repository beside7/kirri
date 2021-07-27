import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Background, Text_2, Header  } from "@components";

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { recodeApis } from "@apis";
import { RecordResType } from "@type-definition/diary";
import RenderHtml from 'react-native-render-html';
import { Menu } from 'react-native-paper';
import { PushMessage } from "@components";


type RecordViewProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "RecordView">;
    route: RouteProp<StackNavigatorParams, "RecordView">;
}

export default function RecordView( { route, navigation } : RecordViewProps) {

    const [loading, setLoading] = useState(false)

    const [visible, setVisible] = React.useState(false);
    const closeMenu = () => setVisible(false);
    
    const openMenu = () => setVisible(true);

    const [data, setData] = useState<RecordResType | null >(null)

    const { diary , record } = route.params
    const [modal, setModal] = useState(false);
    /**
     * 기록 상세내용 조회
     */
    const getData = async () => {
        setLoading(true)
        if(diary && record){
            const res = await recodeApis.viewRecord( diary.uuid, record.uuid );
            setData(res);
        }
        setLoading(false)
    }

    /**
     * 컨포넌트 최초 마운트시 이벤트
     */
    useEffect(() => {
        getData()
    }, [])

    if(data){
        const { title, createdDate , body , images } = data
        return (
            <Background>
                <PushMessage 
                    visible={modal}
                    closeModal={() => setModal(false) }
                />
                <Header 
                    leftIcon={
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack()
                            }}
                        >
                            <Image 
                                style={{ width: 24, height: 24 }}
                                source={require("@assets/icons/back.png")}
                            />
                        </TouchableOpacity>
                    }
                    rightIcon={
                        // 우측 상단 메뉴
                        <Menu
                            style={{
                                top: 105
                            }}
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                                <TouchableOpacity onPress={openMenu}>
                                    <Image 
                                        style={{ width: 24, height: 24 }}
                                        source={require("@assets/icons/menu.png")}
                                    />
                                </TouchableOpacity>
                            }
                        >
                            <Menu.Item onPress={() => {
                                closeMenu()
                                navigation.navigate("RecordInput" , { diary : diary, record : data })
                            }} title="다이어리 수정" />
                            <Menu.Item onPress={() => {
                                closeMenu()
                                setModal(true)
                            }} title="다이어리 삭제" />
                        </Menu>
                    }
                    title="기록보기"     
                />
                <View style={{flex: 1}}>
                    {/* 제목 */}
                    <View style={{ justifyContent : "center", paddingHorizontal: 20 , height: 80, borderBottomWidth: 1, borderColor: "#e1e1eb" }}>
                        <Text_2 style={{ fontSize : 20}}>{title}</Text_2>
                    </View>
                    {/* 본문 */}
                    <View>
                        {/* 글쓴이 , 시간 */}
                        <View style={{ marginBottom: 8, paddingTop: 24 , height: 60 ,justifyContent: "space-between", flexDirection: "row" , paddingHorizontal: 28 }}>
                            <View style={{ flexDirection : "row" , alignItems : "center"}}>
                                <Image 
                                    source={require("@assets/images/profile/home_profile_02.png")}
                                    style={{ width: 36, height: 36, marginRight: 8}}
                                />
                                <Text_2 style={{ fontSize: 12 }}>
                                    멋진 자몽 끼리
                                </Text_2>
                            </View>
                            <View  style={{ alignItems : "center", justifyContent: "center"}}>
                                <Text_2 style={{ fontSize: 12, color: "#6f6f7e" }}>
                                    {createdDate}
                                </Text_2>
                            </View>
                        </View>

                        <ScrollView style={{ height: 700 }}>
                            {images.map( (item, index) => (
                                // 이미지
                                <View key={index} style={{ alignItems:"center", paddingHorizontal:20, paddingVertical: 5 }}>
                                    <Image 
                                        style={{
                                            width: 335,
                                            height: 335,
                                            borderRadius: 20
                                        }}
                                        source={{
                                            uri: item.path
                                        }}
                                    />
                                </View>
                            ))}
                            <View style={{ paddingTop: 20, paddingBottom: 67, paddingHorizontal:20 }}>
                                {/* <Text_2 bold="Regular" style={{ fontSize: 14, color: "#17171c", lineHeight: 26 }}>
                                {body}
                                </Text_2> */}
                                <RenderHtml
                                    source={{ html : body }}
                                />
                            </View>
                        </ScrollView>
                        
                    </View>
                </View>
            </Background>
        )
    } else {
        return (
            <Background>
                <Header 
                    title="기록보기" 
                    
                    />
                <ScrollView style={{flex: 1}}>
                    <Text_2>loading</Text_2>
                </ScrollView>
            </Background>
        )
    }

    
}
