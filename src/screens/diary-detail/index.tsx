import React from 'react'
import { View, ScrollView, Image } from 'react-native'
import { Background, Text_2, Header  } from "@components";


export default function DiaryDetail() {
    return (
        <Background>
            <Header 
                title="기록보기" 
                
                />
            <ScrollView style={{flex: 1}}>
                {/* 제목 */}
                <View style={{ justifyContent : "center", paddingHorizontal: 20 , height: 80, borderBottomWidth: 1, borderColor: "#e1e1eb" }}>
                    <Text_2 style={{ fontSize : 20}}>오늘 하늘에 구름이 진짜 예쁜 날!</Text_2>
                </View>
                {/* 본문 */}
                <View>
                    {/* 글쓴이 , 시간 */}
                    <View style={{ paddingTop: 24 , height: 60 ,justifyContent: "space-between", flexDirection: "row" , paddingHorizontal: 28 }}>
                        <View>
                            <Text_2 style={{ fontSize: 12 }}>
                                멋진 자몽 끼리
                            </Text_2>
                        </View>
                        <View>
                            <Text_2 style={{ fontSize: 12, color: "#6f6f7e" }}>
                                2021년 6월 17일
                            </Text_2>
                        </View>
                    </View>
                    {/* 이미지 */}
                    <View style={{ alignItems:"center", paddingHorizontal:20 }}>
                        <Image 
                            style={{
                                width: 335,
                                height: 335,
                                borderRadius: 20
                            }}
                            source={{
                                uri: "https://picsum.photos/id/10/335/335"
                            }}
                        />
                    </View>
                    <View style={{ paddingTop: 20, paddingBottom: 67, paddingHorizontal:20 }}>
                        <Text_2 bold="Regular" style={{ fontSize: 14, color: "#17171c", lineHeight: 26 }}>
                        어제 간만에 일찍 잤는데, 오늘 너무 늦게 일어나서 기분이 안좋았어…
아침부터 주말을 제대로 즐기고 싶었단 말이지? 
나는 문어 꿈을 꾸는 문어 꿈속에서는 무엇이든지 될 수 있어 나는 문어 잠을 자는 문어 잠에 드는 순간 여행이 시작되는 거야 높은 산에 올라가면 나는 초록색 문어 장미꽃 밭 숨어들면 나는 빨간색 문어 횡단보도 건너가면 나는 줄무늬 문어 밤하늘을 날아가면 나는 오색 찬란한 문어가 되는 거야 아아아 야 아아아 아아아 깊은 바닷속은 너무 외로워 춥고 어둡고 차갑고 때로는 무섭기도 해 에에에 야 아아아 아아 그래서 나는 매일 꿈을 꿔 이곳은 참 우울해 단풍놀이 구경 가면 나는 노란색 문어 커피 한잔 마셔주면 나는 진갈색 문어 주근깨의 꼬마와 놀면 나는 점박이 문어 밤하늘을 날아가면 나는 오색 찬란한 문어가 되는 거야 아아아 야 아아아 아아아 깊은…
                        </Text_2>
                    </View>
                </View>
            </ScrollView>
        </Background>
    )
}
