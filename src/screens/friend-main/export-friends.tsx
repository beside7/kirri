import React from 'react'
import { View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import { Background } from "@components";
import { DiaryResType } from "@type-definition/diary";
import { Menu } from 'react-native-paper';
import { FontAwesome5 } from "@expo/vector-icons";

import { observer } from 'mobx-react';
import { UserStore } from '@store';

import { 
    EmptyContainer,
    EmptyText,
    ExportFriendContainer,
    ExportFriendListItemContainer,
    ExportFriendThumbnailImage,
    ExportFriendListItemCenter,
    ExportFriendListItemRight,
    ExportFriendNickName
} from "./style";

type ExportFriendsProps = {
    diary: DiaryResType | null;
};

export const ExportFriends = observer(({ diary } : ExportFriendsProps) => {


     /**
     * mobx 으로 유저 닉네임 추출
     */
    const { nickname } = UserStore;

    /**
     * 현재 로그인한 사용자가 해당 다이러리에서 관리자인지 판별하는 부분 
     * -> true : 관리자 , false : 일반 유저
     */
    const isAdministrator = diary?.members.find((item) => item.nickname === nickname )?.authority === "DIARY_OWNER"
    // const isAdministrator = false

    /**
     * 출력할 멤버 리스트
     */
    const members = diary ? [...diary.members] : []

    /**
     * 유저 우측 메뉴 노출여부
     */
    const [visible, setVisible] = React.useState<boolean[]>(
        members.map(_ => false)
    );

    const closeMenu = (index : number) => {
        const newList = [...visible]
        newList[index] = false;
        setVisible(newList)
    }

    const openMenu = (index : number) => {
        const newList = [...visible]
        newList[index] = true;
        setVisible(newList)
    }
    
    
    return (
        <Background>
            <ExportFriendContainer>
                {/* 
                    유저일경우 접근 거부
                */}
                { !isAdministrator && 
                    <EmptyContainer>
                        <Image 
                            style={{
                                width: 125,
                                height: 125
                            }}
                            source={require("@assets/images/diary/diary_export_empty.png")}
                        />
                        <EmptyText>
                            관리자만 친구를 다이어리에서 내보낼 수 있어요.
                        </EmptyText>
                    </EmptyContainer>
                }
                {/* 
                    관리자일경우 리스트 출력
                */}
                { isAdministrator && 
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList
                            data={ members }
                            ListEmptyComponent={() => {
                                return (
                                    <View>
                                        <ExportFriendNickName>
                                            검색 결과가 없습니다.
                                        </ExportFriendNickName>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => `${item.userId}`}
                            renderItem={({ item, index }) => {
                                return (
                                    <ExportFriendListItemContainer>
                                        <View style={{ width: 40 }}>
                                            <ExportFriendThumbnailImage
                                                source={require("@assets/images/profile/home_profile_01.png")}
                                            />
                                        </View>
                                        <ExportFriendListItemCenter>
                                            <ExportFriendNickName>
                                                {item.nickname} {item.authority === "DIARY_OWNER" && <FontAwesome5 name="crown" size={12} color="#6173ff" />}
                                            </ExportFriendNickName>
                                        </ExportFriendListItemCenter>
                                        <ExportFriendListItemRight>
                                            <Menu
                                                style={{
                                                    marginTop: 30
                                                }}
                                                visible={visible[index]}
                                                onDismiss={() => closeMenu(index)}
                                                anchor={
                                                    <TouchableOpacity onPress={() => openMenu(index)}>
                                                        <Image 
                                                            style={{ width: 24, height: 24 }}
                                                            source={require("@assets/icons/menu.png")}
                                                        />
                                                    </TouchableOpacity>
                                                }
                                            >
                                                <Menu.Item onPress={() => {}} title="관리자로 지정" />
                                                <Menu.Item onPress={() => {}} title="내보내기" />
                                            </Menu>
                                        </ExportFriendListItemRight>
                                    </ExportFriendListItemContainer>
                                )
                            }}
                        />
                    </SafeAreaView>
                }
            </ExportFriendContainer>
        </Background>
    )
})


export default ExportFriends;