import React , { useState } from 'react'
import { View, SafeAreaView, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Background, Text_2 } from "@components";
import { DiaryResType } from "@type-definition/diary";

import { TextInput, Icon, Button } from "./style";
import { userApis, diaryApis } from "@apis";

/**
 * 닉네임 중복체크 결과 타입
 */
type CheckNicknameDuplRes = {
    exists : boolean
}

type InviteFriendProps = {
    diary? : DiaryResType
}

export default function InviteFriend({ diary } : InviteFriendProps ) {

    /**
     * 사용자가 입력한 닉네임
     */
    const [nickname, setNickname] = useState("");
    /**
     * api 호출중 표시
     */
    const [loading, setLoading] = useState(false)

    const findNickname = async () => {
        setLoading(true);
        
        if(diary){
            const { uuid } = diary
            
            /**
             * 닉네임 중복 체크
             */
            const { exists } = await userApis.checkNicknameDupl(nickname) as CheckNicknameDuplRes;
            if(exists){
                const data = await diaryApis.findMember(uuid , nickname);
                console.log(data);
            }
        } 
        setLoading(false);
    }


    return (
        <Background>
            <View style={{ paddingVertical: 0, paddingHorizontal: 34, flex: 1 }}>
                <View style={{ height: 77, alignItems: "center", justifyContent: "center" }}>
                    <Text_2 style={{ fontSize: 14, color: "#17171c" }}>친구와 같이 일기를 작성해보세요!</Text_2>
                </View>
                <View>
                    <TextInput 
                        placeholder="친구의 닉네임을 검색해보세요!" 
                        value={nickname}
                        onChangeText={value => {
                            setNickname(value)
                        }}
                    />
                    <Button
                        onPress={findNickname}
                    >
                        <Icon 
                            source={require("@assets/icons/search.png")}
                        />
                    </Button>
                </View>
                <View style={{ height: 77, alignItems: "center", justifyContent: "center" }}>
                    <Text_2 style={{ fontSize: 12, color: "#6f6f7e" }}>앗, 친구가 아직 끼리에 가입하지 않았나요?</Text_2>
                </View>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={[
                            // {
                            //     id: "tset1",
                            //     name: "망고",
                            //     thumbnail: "https://picsum.photos/id/1074/40/40"
                            // },
                            // {
                            //     id: "tset2",
                            //     name: "망고는 맛있어",
                            //     thumbnail: "https://picsum.photos/id/1074/40/40"
                            // },
                            // {
                            //     id: "tset3",
                            //     name: "망고는 맛있어",
                            //     thumbnail: "https://picsum.photos/id/1074/40/40"
                            // },
                            // {
                            //     id: "tset4",
                            //     name: "망고는 맛있어",
                            //     thumbnail: "https://picsum.photos/id/1074/40/40"
                            // },
                            // {
                            //     id: "tset5",
                            //     name: "망고는 맛있어",
                            //     thumbnail: "https://picsum.photos/id/1074/40/40"
                            // },
                            // {
                            //     id: "tset6",
                            //     name: "망고는 맛있어",
                            //     thumbnail: "https://picsum.photos/id/1074/40/40"
                            // },
                            // {
                            //     id: "tset7",
                            //     name: "망고는 맛있어",
                            //     thumbnail: "https://picsum.photos/id/1074/40/40"
                            // },
                            // {
                            //     id: "tset8",
                            //     name: "망고는 맛있어",
                            //     thumbnail: "https://picsum.photos/id/1074/40/40"
                            // },
                            // {
                            //     id: "tset9",
                            //     name: "망고는 맛있어",
                            //     thumbnail: "https://picsum.photos/id/1074/40/40"
                            // },
                            // {
                            //     id: "tset10",
                            //     name: "망고는 맛있어",
                            //     thumbnail: "https://picsum.photos/id/1074/40/40"
                            // },
                            // {
                            //     id: "tset11",
                            //     name: "망고는 맛있어 end",
                            //     thumbnail: "https://picsum.photos/id/1074/40/40"
                            // }
                        ]}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ paddingTop: 130, alignItems: "center", flex: 1,  }}>
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
