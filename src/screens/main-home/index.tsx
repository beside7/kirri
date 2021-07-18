import React from 'react'
import { Image, SafeAreaView, ListRenderItemInfo } from "react-native"
import { Background } from '@components'
import { DiaryResType } from '@type-definition/diary'
import { 
    TopMenu,
    Icons,
    Icon,
    UserInfo,
    Profile,
    UserContent,
    UserName,
    Kirri,
    ListContainer,
    ListTitle,
    LatestList,
    LatestItem,
    LatestListItemNicName,
    LatestListItemTitle,
    LatestListItemDiary,
    DiaryList,
    DiaryListItem,
    DiaryListItemTitle,
    DiaryListItemHeader,
    DiaryHeaderImage,
    DiaryListItemBody,
} from "./style";

import { CoverBigImages } from "@utils";

let data : DiaryResType[] = [
    {
        uuid: "2",
        title: "기록 제목 노출되는 구 ...",
        created_date: "2021-07-16",
        members: [{
            username: "string",
            nickname: "string",
            authority: "string",
            status: "string"
        }],
        icon: "01"
    },{
        uuid: "2",
        title: "기록 제목 노출되는 구 ...",
        created_date: "2021-07-16",
        members: [{
            username: "string",
            nickname: "string",
            authority: "string",
            status: "string"
        }],
        icon: "01"
    },{
        uuid: "3",
        title: "기록 제목 노출되는 구 ...",
        created_date: "2021-07-16",
        members: [{
            username: "string",
            nickname: "string",
            authority: "string",
            status: "string"
        }],
        icon: "01"
    } ,{
        uuid: "4",
        title: "기록 제목 노출되는 구 ...",
        created_date: "2021-07-16",
        members: [{
            username: "string",
            nickname: "string",
            authority: "string",
            status: "string"
        }],
        icon: "01"
    },{
        uuid: "5",
        title: "기록 제목 노출되는 구 ...",
        created_date: "2021-07-16",
        members: [{
            username: "string",
            nickname: "string",
            authority: "string",
            status: "string"
        }],
        icon: "01"
    },{
        uuid: "6",
        title: "기록 제목 노출되는 구 ...",
        created_date: "2021-07-16",
        members: [{
            username: "string",
            nickname: "string",
            authority: "string",
            status: "string"
        }],
        icon: "01"
    }
]

// data = []

export default function MainHome() {
    return (
        <Background>
            <SafeAreaView style={{ flex: 1 }}>
                <TopMenu>
                    <Icons>
                        <Icon 
                            source={require("@assets/icons/writing.png")}
                        />
                        <Icon 
                            source={require("@assets/icons/notice.png")}
                        />
                        <Icon 
                            source={require("@assets/icons/setting.png")}
                        />
                    </Icons>
                </TopMenu>
                <UserInfo>
                    <Profile 
                        source={require("@assets/images/profile/home_profile_01.png")}
                    />
                    <UserContent>
                        <UserName>
                            멋진 자몽
                        </UserName>
                        <Kirri>
                            77ㅣ Zㅣ
                        </Kirri>
                    </UserContent>
                </UserInfo>
                {
                    (data.length === 0) ? (
                        <DiaryListItemBody>

                        </DiaryListItemBody>
                    )
                    :
                    (
                        <>
                            
                            <ListContainer>
                                <ListTitle>
                                    최근 작성된 기록
                                </ListTitle>
                                <LatestList
                                    horizontal
                                    data={data}
                                    renderItem={({item}) => {
                                        return (<LatestItem>
                                            <LatestListItemNicName>{ item.members[0].username }</LatestListItemNicName>
                                            <LatestListItemTitle>{ item.title }</LatestListItemTitle>
                                            <LatestListItemDiary>123</LatestListItemDiary>
                                        </LatestItem>)
                                    }}
                                />

                                <ListTitle style={{ marginTop: 36}}>
                                    다이어리 목록
                                </ListTitle>

                                <SafeAreaView>
                                    <DiaryList
                                        data={data}
                                        numColumns={2}
                                        keyExtractor={(item, index) => `${index}` }
                                        renderItem={({ item }) => {
                                            return (<DiaryListItem>
                                                <DiaryListItemHeader>
                                                    <DiaryHeaderImage source={CoverBigImages["01"]} />
                                                </DiaryListItemHeader>
                                                <DiaryListItemBody>
                                                    <DiaryListItemTitle>{item.title}</DiaryListItemTitle>
                                                </DiaryListItemBody>
                                            </DiaryListItem>)
                                        }}
                                    />
                                </SafeAreaView>

                                

                            </ListContainer>
                        </>
                    )
                }
                
            </SafeAreaView>
        </Background>
    )
}
