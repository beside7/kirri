import React from 'react'
import { View, FlatList , TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native'
import Header_1 from './header_1/header_1'
import { Background, Text_2  } from "@components";

import styles from './style'

const SCREEN_HEIGHT = Dimensions.get("screen").height;

export default function index() {
    return (
        <Background>
            <Header_1 />
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
                    
                >
                <Image 
                    source={require("@assets/icons/edit.png")}
                    style={{ width: 114, height: 114 }}
                />
            </TouchableOpacity>
            
        </Background>
    )
}
