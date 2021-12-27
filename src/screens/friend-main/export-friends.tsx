import React, { useEffect, useState } from "react";
import {
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    ImageURISource
} from "react-native";
import { Background } from "@components";
import { DiaryResType } from "@type-definition/diary";
import { Menu } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { diaryApis } from "@apis";
import { Memeber } from "@type-definition/diary";

import { observer } from "mobx-react";
import { UserStore } from "@store";

import { DeleteConfirm, AdministratorConfirm } from "./confirm";

import {
    // EmptyContainer,
    // EmptyText,
    ExportFriendContainer,
    ExportFriendListItemContainer,
    ExportFriendThumbnailImage,
    ExportFriendListItemCenter,
    ExportFriendListItemRight,
    ExportFriendNickName,
    DisableButton,
    DisableMessage
} from "./style";
import { Snackbar } from "react-native-paper";

type ExportFriendsProps = {
    diary: DiaryResType | null;
};

const thumbnail = {
    "01": require("@assets/images/profile/home_profile_01.png") as ImageURISource,
    "02": require("@assets/images/profile/home_profile_02.png") as ImageURISource,
    "03": require("@assets/images/profile/home_profile_03.png") as ImageURISource,
    "04": require("@assets/images/profile/home_profile_04.png") as ImageURISource
};

/**
 * 멤버 썸네일 이미지로 변경
 * @param item
 * @returns
 */
const getThumbnail = (item: Memeber): ImageURISource => {
    try {
        const number = item.profileImagePath.split(
            ":"
        )[1] as keyof typeof thumbnail;
        return thumbnail[number];
    } catch (error) {
        return thumbnail["01"];
    }
};

export const ExportFriends = observer(({ diary }: ExportFriendsProps) => {
    const [resDiary, setResDiary] = useState<DiaryResType | null>(diary);

    /**
     * 스낵메세지 노출여부
     */
    const [snackVisible, setSnackVisible] = React.useState(false);

    /**
     * 메세지내용
     */
    const [message, setMessage] = useState("");

    /**
     * 스낵메세지 가리기
     */
    const onDismissSnackBar = () => setSnackVisible(false);

    /**
     * mobx 으로 유저 닉네임 추출
     */
    const { nickname } = UserStore;

    /**
     * 현재 로그인한 사용자가 해당 다이러리에서 관리자인지 판별하는 부분
     * -> true : 관리자 , false : 일반 유저
     */
    const isAdministrator =
        resDiary?.members.find(item => item.nickname === nickname)
            ?.authority === "DIARY_OWNER";
    // const isAdministrator = false

    /**
     * 출력할 멤버 리스트
     */
    const [members, setMembers] = useState<Memeber[]>(
        resDiary ? [...resDiary.members] : []
    );

    /**
     * 유저 우측 메뉴 노출여부
     */
    const [visible, setVisible] = useState<boolean[]>(members.map(_ => false));

    /**
     * 새로고침 여부
     */
    const [refreshing, setRefreshing] = useState(false);

    /**
     * 내보낼 혹은 관리자로 지정할 멤버
     */
    const [target, setTarget] = useState<Memeber | null>(null);
    /**
     * 내보내기 동의창 생성여부
     */
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [adminConfirm, setAdminConfirm] = useState(false);

    const closeMenu = (index: number) => {
        const newList = [...visible];
        newList[index] = false;
        setVisible(newList);
    };

    const openMenu = (index: number) => {
        const newList = [...visible];
        newList[index] = true;
        setVisible(newList);
    };

    const getDiary = async () => {
        if (diary) {
            setRefreshing(true);
            const { uuid } = diary;
            const res = await diaryApis.viewDiary(uuid);
            setResDiary(res);
            // console.log(res);

            setMembers(res.members);
            setVisible(res.members.map(_ => false));
            setRefreshing(false);
        }
    };

    const deleteMember = async (member: number | null | undefined) => {
        try {
            if (resDiary && member) {
                await diaryApis.deleteMember(resDiary.uuid, member);
                // Alert.alert("", "멤버를 다이어리에서 내보냈어요.");
                setDeleteConfirm(false);
                setMessage("멤버를 다이어리에서 내보냈어요.");
                setSnackVisible(true);
                await getDiary();
            }
        } catch (error: any) {
            console.log(error.response);
        }
    };

    const setAdministrator = async (member: number | null | undefined) => {
        try {
            if (resDiary && member) {
                await diaryApis.setAdministrator(resDiary.uuid, member, {
                    authority: "DIARY_OWNER"
                });
                // Alert.alert("", "다른 멤버를 관리자로 지정했어요.");
                setMessage("다른 멤버를 관리자로 지정했어요.");
                setSnackVisible(true);
                setAdminConfirm(false);
                await getDiary();
            }
        } catch (error: any) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getDiary().then(_ => {});
    }, []);

    return (
        <Background>
            <DeleteConfirm
                visible={deleteConfirm}
                onClose={async () => {
                    setDeleteConfirm(false);
                }}
                onConfirm={async () => {
                    await deleteMember(target?.memberId);
                }}
                confirm="내보낼래요"
                close="아니에요"
                nickName={target?.nickname}
            />

            <AdministratorConfirm
                visible={adminConfirm}
                onClose={async () => {
                    setAdminConfirm(false);
                }}
                onConfirm={async () => {
                    await setAdministrator(target?.memberId);
                }}
                confirm="지정할래요"
                close="아니에요"
                nickName={target?.nickname}
            />
            <ExportFriendContainer>
                {
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList
                            refreshing={refreshing}
                            onRefresh={async () => {
                                await getDiary();
                            }}
                            data={members}
                            ListEmptyComponent={() => {
                                return (
                                    <View>
                                        <ExportFriendNickName>
                                            검색 결과가 없습니다.
                                        </ExportFriendNickName>
                                    </View>
                                );
                            }}
                            keyExtractor={(item, _) => `${item.userId}`}
                            renderItem={({ item, index }) => {
                                return (
                                    <ExportFriendListItemContainer>
                                        <View style={{ width: 40 }}>
                                            <ExportFriendThumbnailImage
                                                source={getThumbnail(item)}
                                            />
                                        </View>
                                        <ExportFriendListItemCenter>
                                            <ExportFriendNickName>
                                                {item.nickname}{" "}
                                                {item.authority ===
                                                    "DIARY_OWNER" && (
                                                    <FontAwesome5
                                                        name="crown"
                                                        size={12}
                                                        color="#6173ff"
                                                    />
                                                )}
                                            </ExportFriendNickName>
                                        </ExportFriendListItemCenter>
                                        <ExportFriendListItemRight>
                                            {
                                                // 초대완료 상태일경우
                                                isAdministrator &&
                                                    item.authority ===
                                                        "DIARY_MEMBER" &&
                                                    item.status ===
                                                        "ACTIVE" && (
                                                        <Menu
                                                            style={{
                                                                marginTop: 30
                                                            }}
                                                            visible={
                                                                visible[index]
                                                            }
                                                            onDismiss={() =>
                                                                closeMenu(index)
                                                            }
                                                            anchor={
                                                                <TouchableOpacity
                                                                    onPress={() =>
                                                                        openMenu(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <Image
                                                                        style={{
                                                                            width: 24,
                                                                            height: 24
                                                                        }}
                                                                        source={require("@assets/icons/menu.png")}
                                                                    />
                                                                </TouchableOpacity>
                                                            }
                                                        >
                                                            <Menu.Item
                                                                onPress={() => {
                                                                    closeMenu(
                                                                        index
                                                                    );
                                                                    setTarget(
                                                                        item
                                                                    );
                                                                    setAdminConfirm(
                                                                        true
                                                                    );
                                                                }}
                                                                title="관리자로 지정"
                                                            />
                                                            <Menu.Item
                                                                onPress={() => {
                                                                    closeMenu(
                                                                        index
                                                                    );
                                                                    setTarget(
                                                                        item
                                                                    );
                                                                    setDeleteConfirm(
                                                                        true
                                                                    );
                                                                }}
                                                                title="내보내기"
                                                            />
                                                        </Menu>
                                                    )
                                            }
                                            {
                                                // 초대중인경우
                                                item.authority ===
                                                    "DIARY_MEMBER" &&
                                                    item.status ===
                                                        "INVITING" && (
                                                        <DisableButton>
                                                            <DisableMessage>
                                                                초대중
                                                            </DisableMessage>
                                                        </DisableButton>
                                                    )
                                            }
                                        </ExportFriendListItemRight>
                                    </ExportFriendListItemContainer>
                                );
                            }}
                        />
                    </SafeAreaView>
                }
            </ExportFriendContainer>
            {/* 메세지 */}
            <Snackbar
                visible={snackVisible}
                onDismiss={onDismissSnackBar}
                style={{ marginHorizontal: 20, marginBottom: 38 }}
                action={{
                    label: "확인",
                    onPress: () => {
                        onDismissSnackBar();
                    }
                }}
            >
                {message}
            </Snackbar>
        </Background>
    );
});

export default ExportFriends;
