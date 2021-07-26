import React from 'react'
import { View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import { Background, Text_2 } from "@components";
import { DiaryResType } from "@type-definition/diary";


type ExportFriendsProps = {
    diary: DiaryResType | null;
};

export default function ExportFriends({ diary } : ExportFriendsProps) {
    return (
        <Background>
            <View style={{ flex: 1, paddingHorizontal: 34, paddingVertical: 45 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={ diary?.members }
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
                                            source={require("@assets/images/profile/home_profile_01.png")}
                                        />
                                    </View>
                                    <View style={{ width: "55%", alignItems: "flex-start" }}>
                                        <Text_2 style={{ fontSize: 14, color: "#000000" }}>{item.nickname}</Text_2>
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
