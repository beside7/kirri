import React from 'react'
import { View, Image } from "react-native"
import { Background } from '@components'
import { 
    TopMenu,
    Icons,
    Icon,
    UserInfo,
    Profile,
    Title,
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
    DiaryListItemBody
} from "./style";

import { CoverBigImages } from "@utils";


export default function MainHome() {
    return (
        <Background>
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
                <Title>
                    <UserName>
                        멋진 자몽
                    </UserName>
                    <Kirri>
                        77ㅣ Zㅣ
                    </Kirri>
                </Title>
            </UserInfo>
            <ListContainer>
                <ListTitle>
                    최근 작성된 기록
                </ListTitle>
                <LatestList
                    horizontal
                    data={[
                        {
                            username: "작성자 닉네임 노출",
                            title: "기록 제목 노출되는 구 ...",
                            subTitle : "다이어리 제목 노출"
                        },{
                            username: "작성자 닉네임 노출",
                            title: "기록 제목 노출되는 구 ...",
                            subTitle : "다이어리 제목 노출"
                        },{
                            username: "작성자 닉네임 노출",
                            title: "기록 제목 노출되는 구 ...",
                            subTitle : "다이어리 제목 노출"
                        }
                    ]}
                    renderItem={({ item }) => {
                        return (<LatestItem>
                            <LatestListItemNicName>{ item.username }</LatestListItemNicName>
                            <LatestListItemTitle>{ item.title }</LatestListItemTitle>
                            <LatestListItemDiary>{ item.subTitle }</LatestListItemDiary>
                        </LatestItem>)
                    }}
                />

                <ListTitle style={{ marginTop: 36}}>
                    다이어리 목록
                </ListTitle>

                <DiaryList
                    data={[
                        {
                            title: "다이어리 제목 구간 입니다.",
                            type: 1
                        },{
                            title: "오늘 자몽은 맛있다!",
                            type: 2
                        },{
                            title: "처음 우리들의 끼리 다이어리!!",
                            type: 3
                        }
                    ]}
                    numColumns={2}
                    keyExtractor={(item, index) => item.title }

                    renderItem={({ item }) => {
                        return (<DiaryListItem>
                            <DiaryListItemHeader>
                            </DiaryListItemHeader>
                            <DiaryListItemBody>
                                <DiaryListItemTitle>{item.title}</DiaryListItemTitle>

                            </DiaryListItemBody>
                        </DiaryListItem>)
                    }}
                />

            </ListContainer>
        </Background>
    )
}
