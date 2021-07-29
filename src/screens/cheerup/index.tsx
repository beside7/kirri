import React,
 { createRef } from 'react'
import { View, Image, Text, ScrollView } from 'react-native'
import { Background, Header } from "@components";

import { 
    Container,
    BackgroundImage,
    SpeechBubble,
    SpeechBubble2,
    FriendList,
    ListItem,
    ListItemImage,
    ListItemTitle,
    ActionSheetContainer,
    ProfileContainer,
    ProfileImage,
    TitleContainer,
    Title,
    SubTitle,
    ChreerupContainer,
    Chreerup,
    ChreerupImage,
    ChreerupMessage
} from "./style";

import { Memeber } from "@type-definition/diary";

// import ActionSheet
import ActionSheet from "react-native-actions-sheet";


let data : Memeber[] = [
    {
        userId: 1,
        nickname: "댕청미",
        authority: "DIARY_MEMBER",
        status: "INVITING"
    },
    {
        userId: 1,
        nickname: "댕청미",
        authority: "DIARY_MEMBER",
        status: "INVITING"
    },
    {
        userId: 1,
        nickname: "댕청미",
        authority: "DIARY_MEMBER",
        status: "INVITING"
    },
    {
        userId: 1,
        nickname: "댕청미",
        authority: "DIARY_MEMBER",
        status: "INVITING"
    },
    {
        userId: 1,
        nickname: "댕청미",
        authority: "DIARY_MEMBER",
        status: "INVITING"
    },
    {
        userId: 1,
        nickname: "댕청미",
        authority: "DIARY_MEMBER",
        status: "INVITING"
    },
]

const actionSheetRef = createRef<ActionSheet>();

export default function CheerUp() {
    return (
        <Background>
            <Header
                title="우리끼리 응원하기" 
                leftIcon={<Image
                    style={{ width: 24,
                     height: 24 }}
                    source={require("@assets/icons/x.png")}
                />}
                // rightIcon={null}
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
                            <ListItem 
                                onPress={() => {
                                    actionSheetRef.current?.setModalVisible();
                                }}
                            >
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
                <ActionSheet ref={actionSheetRef}>
                    <ActionSheetContainer>
                        <ProfileContainer>
                            <ProfileImage 
                                source={require("@assets/images/profile/home_profile_04.png")}
                            />
                            <TitleContainer>
                                <Title>나는 문어 님에게</Title>
                                <Title>응원의 한마디 보내기</Title>
                                <SubTitle>from. 멋진 자몽 [처음 우리들의 끼리 다이어리!!]</SubTitle>
                            </TitleContainer>
                        </ProfileContainer>
                        <ChreerupContainer>
                            <Chreerup>
                                <ChreerupImage 
                                    source={require("@assets/images/diary/diary_cheerup_bgimg_01.png")}
                                />
                                <ChreerupMessage>
                                    꾸준함은
                                </ChreerupMessage>
                                <ChreerupMessage>
                                    배신하지 않아
                                </ChreerupMessage>
                            </Chreerup>
                            <Chreerup>
                                <ChreerupImage 
                                    source={require("@assets/images/diary/diary_cheerup_bgimg_02.png")}
                                />
                                <ChreerupMessage>
                                    오늘
                                </ChreerupMessage>
                                <ChreerupMessage>
                                    너의 기록에 반함
                                </ChreerupMessage>
                            </Chreerup>
                            <Chreerup>
                                <ChreerupImage 
                                    source={require("@assets/images/diary/diary_cheerup_bgimg_03.png")}
                                />
                                <ChreerupMessage>
                                    난 언제나
                                </ChreerupMessage>
                                <ChreerupMessage>
                                    너의 편
                                </ChreerupMessage>
                            </Chreerup>
                            <Chreerup>
                                <ChreerupImage 
                                    source={require("@assets/images/diary/diary_cheerup_bgimg_04.png")}
                                />
                                <ChreerupMessage>
                                    아프지 말고,
                                </ChreerupMessage>
                                <ChreerupMessage>
                                    아프지 말고
                                </ChreerupMessage>
                            </Chreerup>
                            <Chreerup>
                                <ChreerupImage 
                                    source={require("@assets/images/diary/diary_cheerup_bgimg_05.png")}
                                />
                                <ChreerupMessage>
                                    대충 살아도
                                </ChreerupMessage>
                                <ChreerupMessage>
                                    괜찮아
                                </ChreerupMessage>
                            </Chreerup>
                            <Chreerup>
                                <ChreerupImage 
                                    source={require("@assets/images/diary/diary_cheerup_bgimg_06.png")}
                                />
                                <ChreerupMessage>
                                    넌 지금도
                                </ChreerupMessage>
                                <ChreerupMessage>
                                    충분히 잘 하는 중
                                </ChreerupMessage>
                            </Chreerup>
                        </ChreerupContainer>
                    </ActionSheetContainer>
                </ActionSheet>
            </Container>
        </Background>
    )
}
