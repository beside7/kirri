import React from 'react'
import { View, Image } from 'react-native'
import { Background, Header } from "@components";

import { Container, BackgroundImage, SpeechBubble, SpeechBubble2, FriendList, ListItem ,ListItemImage, ListItemTitle } from "./style";
import { Memeber } from "@type-definition/diary";

let data : Memeber[] = [
    {
        username: "댕청미",
        nickname: "댕청미",
        authority: "user",
        status: "01"
    },
    {
        username: "댕청미",
        nickname: "댕청미",
        authority: "user",
        status: "01"
    },
    {
        username: "댕청미",
        nickname: "댕청미",
        authority: "user",
        status: "01"
    },
    {
        username: "댕청미",
        nickname: "댕청미",
        authority: "user",
        status: "01"
    },
    {
        username: "댕청미",
        nickname: "댕청미",
        authority: "user",
        status: "01"
    },
    {
        username: "댕청미",
        nickname: "댕청미",
        authority: "user",
        status: "01"
    },
]

export default function CheerUp() {
    return (
        <Background>
            <Header
                title="우리끼리 응원하기" 
                leftIcon={<Image
                    style={{ width: 24, height: 24 }}
                    source={require("@assets/icons/x.png")}
                />}
                rightIcon={null}
            />
            <Container>
                <BackgroundImage 
                    source={require("@assets/images/diary/diary_cheerup_bgimg.png")}
                />
                <SpeechBubble>
                    끼리 멤버들에게 ’기록작성’을 응원해보자 뿌!:)
                </SpeechBubble>
                <SpeechBubble2 />
                <FriendList 
                    data={data}
                    numColumns={3}
                    renderItem={({item}) => {
                        return(
                            <ListItem>
                                <ListItemImage 
                                    source={require("@assets/images/profile/home_profile_01.png")}
                                />
                                <ListItemTitle>
                                    {item.nickname}
                                </ListItemTitle>
                            </ListItem>
                        )
                    }}
                />
            </Container>
        </Background>
    )
}
