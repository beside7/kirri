import React from 'react'
import { View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import { Background, Text_2 } from "@components";

export default function ExportFriends() {
    return (
        <Background>
            <View style={{ flex: 1, paddingHorizontal: 34, paddingVertical: 45 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={[
                            {
                                id: "tset1",
                                name: "망고",
                                thumbnail: "https://picsum.photos/id/1074/40/40"
                            },
                            {
                                id: "tset2",
                                name: "망고는 맛있어",
                                thumbnail: "https://picsum.photos/id/1074/40/40"
                            },
                            {
                                id: "tset3",
                                name: "망고는 맛있어",
                                thumbnail: "https://picsum.photos/id/1074/40/40"
                            },
                            {
                                id: "tset4",
                                name: "망고는 맛있어",
                                thumbnail: "https://picsum.photos/id/1074/40/40"
                            },
                            {
                                id: "tset5",
                                name: "망고는 맛있어",
                                thumbnail: "https://picsum.photos/id/1074/40/40"
                            },
                            {
                                id: "tset6",
                                name: "망고는 맛있어",
                                thumbnail: "https://picsum.photos/id/1074/40/40"
                            },
                            {
                                id: "tset7",
                                name: "망고는 맛있어",
                                thumbnail: "https://picsum.photos/id/1074/40/40"
                            },
                            {
                                id: "tset8",
                                name: "망고는 맛있어",
                                thumbnail: "https://picsum.photos/id/1074/40/40"
                            },
                            {
                                id: "tset9",
                                name: "망고는 맛있어",
                                thumbnail: "https://picsum.photos/id/1074/40/40"
                            },
                            {
                                id: "tset10",
                                name: "망고는 맛있어",
                                thumbnail: "https://picsum.photos/id/1074/40/40"
                            },
                            {
                                id: "tset11",
                                name: "망고는 맛있어 end",
                                thumbnail: "https://picsum.photos/id/1074/40/40"
                            }
                        ]}
                        ListEmptyComponent={() => {
                            return (
                                <View>
                                    <Text_2>
                                        검색 결과가 없습니다.
                                    </Text_2>
                                </View>
                            )
                        }}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    height: 60
                                }}>
                                    <View style={{ width: 40 }}>
                                        <Image
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 40
                                            }}
                                            source={{
                                                uri: item.thumbnail
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: "55%", alignItems: "flex-start" }}>
                                        <Text_2 style={{ fontSize: 14, color: "#000000" }}>{item.name}</Text_2>
                                    </View>
                                    <View style={{ width: "25%", alignItems: "center", justifyContent: "center" }}>
                                        <TouchableOpacity style={{
                                            backgroundColor: "#ffdd1f",
                                            width: 72,
                                            height: 28,
                                            borderRadius: 10,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <Text_2 bold="Medium" style={{ fontSize: 12, color: "#17171c" }}>내보내기</Text_2>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </SafeAreaView>
            </View>
        </Background>
    )
}