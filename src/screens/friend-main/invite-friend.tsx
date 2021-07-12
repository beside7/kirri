import React from 'react'
import { View, SafeAreaView, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import { Background, Text_2 } from "@components";

export default function InviteFriend() {
    return (
        <Background>
            <View style={{ paddingVertical: 0, paddingHorizontal: 34, flex: 1 }}>
                <View style={{ height: 77, alignItems: "center", justifyContent: "center" }}>
                    <Text_2 style={{ fontSize: 14, color: "#17171c" }}>친구와 같이 일기를 작성해보세요!</Text_2>
                </View>
                <View>
                    <TextInput style={{ borderColor: "#d1d1de", borderWidth: 1, borderRadius: 5, height: 40 }} />
                </View>
                <View style={{ height: 77, alignItems: "center", justifyContent: "center" }}>
                    <Text_2 style={{ fontSize: 12, color: "#6f6f7e" }}>앱 다운로드 링크를 공유</Text_2>
                </View>
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
                                    <View style={{ width: "60%", alignItems: "flex-start" }}>
                                        <Text_2 style={{ fontSize: 14, color: "#000000" }}>{item.name}</Text_2>
                                    </View>
                                    <View style={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
                                        <TouchableOpacity style={{
                                            backgroundColor: "#ffdd1f",
                                            width: 52,
                                            height: 28,
                                            borderRadius: 10,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <Text_2 bold="Medium" style={{ fontSize: 12, color: "#17171c" }}>초대</Text_2>
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
