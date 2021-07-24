import React, { useEffect, useState } from 'react'
import { View, FlatList , TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native'
import { Background, Text_2, Header  } from "@components";
import styles from './style'
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { recodeApis } from "@apis"
import { DiaryResType, RecordResType } from "@type-definition/diary"
import { Menu } from 'react-native-paper';

const SCREEN_HEIGHT = Dimensions.get("screen").height;




type RecordListProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "RecordList">;
    route: RouteProp<StackNavigatorParams, "RecordList">;
}


export default function RecordList({navigation, route} : RecordListProps) {

    const [visible, setVisible] = React.useState(false);
    const closeMenu = () => setVisible(false);
    
    const openMenu = () => setVisible(true);
    const [list, setList] = useState<RecordResType[]>([])


    const [diary, setDiary] = useState<DiaryResType | undefined>(undefined)

    const getRecordList = async (uuid : string | undefined) => {
        try {
            console.log(uuid);
            if(uuid){
                const getRecordRes = await recodeApis.getRecords(uuid);
                const { elements } = getRecordRes
                console.log(getRecordRes);
                return getRecordList;
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {        
        const diary = route.params.diary;
        if(diary){
            setDiary(diary);
            const { uuid } = diary
            getRecordList(uuid)
        }
        return () => {
            
        }
    }, [])

    return (
        <Background>
            <Header
                title="처음 우리들의 끼리 다이러리"
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
                            
                        }} title="우리끼리 응원하기" />
                        <Menu.Item onPress={() => {
                            navigation.navigate("FriendMain", { diary : diary })
                        }} title="친구 관리" />
                        <Menu.Item onPress={() => {}} title="다이어리 수정" />
                        <Menu.Item onPress={() => {}} title="다이어리 삭제" />
                    </Menu>
                }
            />
            <SafeAreaView style={{flex: 1}}>
                <FlatList 
                    contentContainerStyle={{ backgroundColor: "#f4f4f8" }}
                    data={[
                        {title: "자몽자몽", author: "멋진자몽끼리", date: "2021년 6월 17일", image: "https://picsum.photos/id/237/536/354" ,content: "니들 다 조용히해. 강아지가 최고다 댕청미를 모르다니 쯧쯧. 들어봐 우리 댕댕이가 니들 다 조용히해. 강아지가 최고다 댕청미를 모르다니 쯧쯧. 들어봐 우리 댕댕이가…"}, 
                        {title: "자몽자몽", author: "멋진자몽끼리", date: "2021년 6월 17일", image: "https://picsum.photos/id/237/536/354" ,content: "니들 다 조용히해. 강아지가 최고다 댕청미를 모르다니 쯧쯧. 들어봐 우리 댕댕이가 니들 다 조용히해. 강아지가 최고다 댕청미를 모르다니 쯧쯧. 들어봐 우리 댕댕이가…"}, 
                        {title: "자몽자몽", author: "멋진자몽끼리", date: "2021년 6월 17일", image: "https://picsum.photos/id/237/536/354" ,content: "니들 다 조용히해. 강아지가 최고다 댕청미를 모르다니 쯧쯧. 들어봐 우리 댕댕이가 니들 다 조용히해. 강아지가 최고다 댕청미를 모르다니 쯧쯧. 들어봐 우리 댕댕이가…"}, 
                        {title: "자몽자몽", author: "멋진자몽끼리", date: "2021년 6월 17일", image: "https://picsum.photos/id/237/536/354" ,content: "니들 다 조용히해. 강아지가 최고다 댕청미를 모르다니 쯧쯧. 들어봐 우리 댕댕이가 니들 다 조용히해. 강아지가 최고다 댕청미를 모르다니 쯧쯧. 들어봐 우리 댕댕이가…"}, 
                        {title: "자몽자몽", author: "멋진자몽끼리", date: "2021년 6월 17일", image: "https://picsum.photos/id/237/536/354" ,content: "니들 다 조용히해. 강아지가 최고다 댕청미를 모르다니 쯧쯧. 들어봐 우리 댕댕이가 니들 다 조용히해. 강아지가 최고다 댕청미를 모르다니 쯧쯧. 들어봐 우리 댕댕이가…"}, 
                    ]} 
                    renderItem={({item}) => (
                        <View style={{ 
                            paddingTop: 24, 
                            paddingHorizontal: 20, 
                            paddingBottom: 20, 
                            backgroundColor: "#ffffff",
                            marginVertical: 4
                        }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 17 }}>
                                <Text_2 style={{fontSize: 12, color: "#24242e"}} >{item.author}</Text_2>
                                <Text_2 style={{fontSize: 12, color: "#6f6f7e" }}>{item.date}</Text_2>
                            </View>
                            <View style={{ alignItems: "flex-end" }}>
                                <Image 
                                    style={{ width: 291 , height: 200, borderRadius: 10 }}
                                    source={{
                                        uri: item.image
                                    }}
                                />
                            </View>
                            <View>
                                <Text_2>{item.title}</Text_2>
                            </View>
                            <View>
                                <Text_2>{item.content}</Text_2>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) =>
                        `${index}`
                    } 
                    ListFooterComponent={
                        () => {
                            return (
                                <View>
                                    <View>
                                        <Text_2 bold="Regular" style={{ color : "#bebece" , fontSize: 12 }}>
                                            오늘의 너를 기억할께
                                        </Text_2>
                                    </View>
                                </View>
                            )
                        }
                    }
                    ListFooterComponentStyle={styles.bottomTab}
                />
            </SafeAreaView>
            <TouchableOpacity 
                style={styles.editButton}
                onPress={() => {
                    navigation.navigate("DiaryInput")
                }}
                >
                <Image 
                    source={require("@assets/icons/edit.png")}
                    style={{ width: 114, height: 114 }}
                />
            </TouchableOpacity>
            
        </Background>
    )
}
