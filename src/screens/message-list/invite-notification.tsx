import React from 'react'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { Background, Text_2 } from "@components";


export default function InviteNotification() {
    return (
        <Background>
            <SafeAreaView style={{ flex: 1, paddingTop: 33 }}>
                <FlatList
                    data={[
                        {
                            id: 1,
                            content: "댕청미님이 멋진 자몽님과 [처음 우리들의 끼리 다이어리!!]를 함께 쓰고 싶어해요",
                            date: "1분전",
                        },
                        {
                            id: 2,
                            content: "댕청미님이 멋진 자몽님과 [처음 우리들의 끼리 다이어리!!]를 함께 쓰고 싶어해요",
                            date: "1일전"
                        },
                        {
                            id: 3,
                            content: "댕청미님이 최애옹님과 [처음 우리들의 끼리 다이어리!!]를 함께 쓰고 싶어해요",
                            date: "1주전"
                        }
                    ]}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ paddingHorizontal: 20, marginVertical: 14 }}>
                                {/* 상단 아이콘 및 내용 */}
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: 18 }}>
                                        <Image
                                            source={require("@assets/icons/mail.png")}
                                            style={{ width: 18, height: 14, marginTop: 8 }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", flexWrap: 'wrap', marginLeft: 12, width: "95%" }}>
                                        <Text_2>
                                            {item.content}
                                        </Text_2>
                                    </View>
                                </View>
                                {/* 하단버튼 */}
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, alignItems: "flex-end" }}>
                                    <View style={{ justifyContent: "flex-start", paddingLeft: 30 }}>
                                        <Text_2 style={{ color: "#babacb", fontSize: 12 }}>{item.date}</Text_2>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <TouchableOpacity style={{ width: 52, height: 28, backgroundColor: "#f4f4f8", alignItems: "center", justifyContent: "center", borderRadius: 7, marginRight: 5 }}>
                                            <Text_2>거부</Text_2>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: 52, height: 28, backgroundColor: "#ffdd1f", alignItems: "center", justifyContent: "center", borderRadius: 7 }}>
                                            <Text_2>수락</Text_2>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </SafeAreaView>
        </Background>
    )
}
