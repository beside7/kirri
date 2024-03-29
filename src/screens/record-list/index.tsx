import React, { ReactElement, useEffect, useState } from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Alert,
    BackHandler,
    Text,
} from "react-native";
import { Background, Text_2, Header, Popup } from "@components";
import styles from "./style";
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { recordApis, diaryApis } from "@apis";
import { RecordResType } from "@type-definition/diary";
import { Menu } from "react-native-paper";
import { observer } from "mobx-react";
import { UserStore } from "@store";

import { LeaveConfirm } from "./leave-confirm";

import DeleteConfirm from "./delete-confirm";

import RenderItem from "./render-item";
import { useIsFocused } from "@react-navigation/native";

import { Snackbar } from "react-native-paper";

type RecordListProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "RecordList">;
    route: RouteProp<StackNavigatorParams, "RecordList">;
};

export const RecordList = observer(({ navigation, route }: RecordListProps) => {
    /**
     * mobx 으로 유저 닉네임 추출
     */
    const { nickname } = UserStore;

    /**
     * 경고창 출력여부
     */
    const [alertOpen, setAlertOpen] = useState(false);

    /**
     * 우측 상단메뉴 노출여부
     */
    const [visible, setVisible] = React.useState(false);
    /**
     * 우측 상단메뉴 열기
     */
    const closeMenu = () => setVisible(false);
    /**
     * 우측 상단메뉴 닫기
     * @returns
     */
    const openMenu = () => setVisible(true);
    /**
     * 로딩
     */
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState(false);
    /**
     * 리스트 맨마직막 아이디
     */
    const [lastId, setLastId] = useState<number | undefined>(undefined);

    /**
     * info 에서 넘겨받은 다이러리 정보
     */
    const diary = route.params.diary;

    const members = diary && diary?.members ? diary?.members : [];

    /**
     * snack bar
     */
    const snack: string | null = route.params.snack;
    const [snackVisible, setSnackVisible] = useState(snack !== null);
    const onDismissSnackBar = () => setSnackVisible(false);

    /**
     * 현재 로그인한 사용자가 해당 다이러리에서 관리자인지 판별하는 부분
     * -> true : 관리자 , false : 일반 유저
     */
    const isAdministrator =
        diary?.members.find(item => item.nickname === nickname)?.authority ===
        "DIARY_OWNER";

    /**
     * 기록리스트 부분
     */
    const [list, setList] = useState<RecordResType[]>([]);

    /**
     * 삭제동의창 여부
     */
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    /**
     * 떠나기 동의창 여부
     */
    const [leaveConfirm, setLeaveConfirm] = useState(false);

    // check if screen is focused
    const isFocused = useIsFocused();

    /**
     * 다이러리 삭제
     */
    const deleteDiary = async () => {
        try {
            if (diary) {
                await diaryApis.deleteDiary(diary.uuid);
                // Alert.alert("삭제되었습니다.");
                navigation.replace("Home", { snack: "삭제되었습니다." });
            }
        } catch (error: any) {
            /**
             * 400 번대 에러일경우 메세지 출력
             */
            if (
                error.response &&
                error.response.status === 400 &&
                error.response.data.code
            ) {
                Alert.alert(error.response.data.message);
            } else {
                console.error("deleteDiary ERROR", error.response);
            }
        }
    };

    /**
     * 기록목록 가져오기
     * @param uuid 다이러리 아이디
     * @returns 기록목록
     */
    const getRecordList = async (
        uuid: string | undefined,
        recordUuid: number | undefined
    ) => {
        try {
            // console.log(uuid);
            if (uuid) {
                setLoading(true);
                if (lastId === undefined && !recordUuid) {
                    setRefreshing(true);
                }
                const getRecordRes = await recordApis.getRecords(
                    uuid,
                    recordUuid
                );
                const { elements } = getRecordRes;
                console.debug("getRecordList : ", getRecordRes);
                // console.debug("diary : ", uuid);
                // 기존리스트에 추가

                let newList = list.concat(elements);
                // if(recordUuid) {
                //     newList = chain(elements).uniqBy(({ id }) => id).value();
                // }
                const idList = newList.map(({ id }) => id);
                const last_id = Math.min(...idList);

                // console.log(last_id);
                // // 마직막 아이디 지정
                setLastId(last_id);

                setList(recordUuid ? newList : elements);
                setLoading(false);
                setRefreshing(false);
                return newList;
            } else {
                return [];
            }
        } catch (error) {
            console.error("getRecordList ERROR", error);
        }
    };

    const handleLoadMore = () => {
        if (diary) {
            const { uuid } = diary;
            getRecordList(uuid, lastId);
        }
    };

    useEffect(() => {
        if (diary) {
            const { uuid } = diary;
            getRecordList(uuid, undefined);
        }
        return () => {};
    }, []);

    useEffect(() => {
        if (diary) {
            const { uuid } = diary;
            getRecordList(uuid, undefined);
        }
    }, [isFocused]);

    /**
     * 다이러리 떠나기
     */
    const leaveDiary = async () => {
        if (diary) {
            const { uuid } = diary;
            // console.log(diary)
            try {
                await diaryApis.leaveDiary(uuid);
                setLeaveConfirm(false);
                navigation.replace("Home", { snack: "다이어리를 떠났습니다." });
            } catch (error: any) {
                console.log(error.response);
            }
        }
    };

    useEffect(() => {
        const backAction = () => {
            navigation.replace("HomeScreenDown");
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    return (
        <Background>
            {/* Alert */}
            <Popup
                open={alertOpen}
                confirm="확인"
                onConfirm={async () => {
                    setAlertOpen(false);
                }}
                width={300}
                handelOpen={(key: boolean) => {}}
                content={
                    <View style={styles.alertContent}>
                        <Text style={styles.alertText}>
                            다른 멤버에게 관리자 권한을 넘긴 후 다이어리를
                            떠나주세요.
                        </Text>
                    </View>
                }
            />
            <Header
                title={diary ? diary.title : "처음 우리들의 끼리 다이러리"}
                leftIcon={
                    <TouchableOpacity
                        onPress={() => {
                            navigation.replace("HomeScreenDown");
                        }}
                    >
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require("@assets/icons/back.png")}
                        />
                    </TouchableOpacity>
                }
                // 우측 상단 메뉴
                rightIcon={
                    <Menu
                        style={{
                            top: 105
                        }}
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <TouchableOpacity onPress={openMenu}>
                                <Image
                                    style={{ width: 24, height: 24 }}
                                    source={require("@assets/icons/menu.png")}
                                />
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item
                            onPress={() => {
                                closeMenu();
                                navigation.navigate("Cheerup", {
                                    diary: diary
                                });
                            }}
                            title="끼리 응원하기"
                        />
                        <Menu.Item
                            onPress={() => {
                                closeMenu();
                                navigation.navigate("FriendMain", {
                                    diary: diary
                                });
                            }}
                            title="끼리 멤버"
                        />
                        {isAdministrator && (
                            <>
                                <Menu.Item
                                    onPress={() => {
                                        closeMenu();
                                        navigation.navigate("DiaryConfig", {
                                            diary: diary
                                        });
                                    }}
                                    title="다이어리 수정"
                                />
                                <Menu.Item
                                    onPress={() => {
                                        closeMenu();
                                        setDeleteConfirm(true);
                                    }}
                                    title="다이어리 삭제"
                                />
                            </>
                        )}
                        <Menu.Item
                            onPress={() => {
                                closeMenu();
                                // 만약 관리자 권한을 가지고 있다면
                                if (isAdministrator && members.length > 1) {
                                    setAlertOpen(true);
                                    return;
                                }
                                setLeaveConfirm(true);
                            }}
                            title="나가기"
                        />
                    </Menu>
                }
            />
            <LeaveConfirm
                visible={leaveConfirm}
                onClose={async () => {
                    setLeaveConfirm(false);
                }}
                onConfirm={async () => {
                    await leaveDiary();
                }}
                confirm="떠나기"
                close="머무르기"
            />
            {/* 다이러리 삭제창 */}
            <DeleteConfirm
                modal={deleteConfirm}
                onClose={async () => {
                    setDeleteConfirm(false);
                }}
                onConfirm={deleteDiary}
            />
            {/* 리스트 */}
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    contentContainerStyle={{ backgroundColor: "#f4f4f8" }}
                    data={list}
                    renderItem={({ item }) =>
                        item && (
                            <RenderItem
                                item={item}
                                diary={diary}
                                navigation={navigation}
                            />
                        )
                    }
                    keyExtractor={(item, index) => `${index}`}
                    ListEmptyComponent={() => {
                        if (loading) {
                            return <View style={styles.loading}></View>;
                        } else {
                            return (
                                <View style={styles.ListEmptyContainer}>
                                    <Image
                                        style={styles.ListEmptyThumbnail}
                                        source={require("@assets/images/diary/diary_history_empty.png")}
                                    />
                                    <View style={styles.ListEmptyContent}>
                                        <Text_2>앗!</Text_2>
                                        <Text_2>기록이 없어요.</Text_2>
                                    </View>
                                </View>
                            );
                        }
                    }}
                    onEndReachedThreshold={1}
                    onEndReached={handleLoadMore}
                    refreshing={refreshing}
                    onRefresh={() => {
                        getRecordList(diary?.uuid, undefined);
                    }}
                    ListFooterComponentStyle={styles.bottomTab}
                />
            </SafeAreaView>
            <>
                {!loading && (
                    <View style={styles.editButton}>
                        {(!list || list.length === 0) && (
                            <View style={styles.emptyMessage}>
                                <View style={styles.emptyMessageContainer_1}>
                                    <Text_2
                                        style={{
                                            fontSize: 11,
                                            color: "#fff",
                                            fontFamily:
                                                "SpoqaHanSansNeo-Regular"
                                        }}
                                    >
                                        기록 작성 버튼을 눌러
                                    </Text_2>
                                    <Text_2
                                        style={{
                                            fontSize: 11,
                                            color: "#fff",
                                            fontFamily:
                                                "SpoqaHanSansNeo-Regular"
                                        }}
                                    >
                                        첫 기록을 남겨봐요 :)
                                    </Text_2>
                                </View>
                                <View style={styles.emptyMessageContainer_2} />
                            </View>
                        )}
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("RecordInput", {
                                    diary: diary,
                                    prev: "list"
                                });
                            }}
                        >
                            <Image
                                source={require("@assets/icons/edit.png")}
                                style={{ width: 114, height: 114 }}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                {snack !== null && (
                    <Snackbar
                        visible={snackVisible}
                        onDismiss={onDismissSnackBar}
                        style={{ marginHorizontal: 20, marginBottom: 38 }}
                        action={{
                            label: "확인",
                            onPress: () => {}
                        }}
                    >
                        {snack}
                    </Snackbar>
                )}
            </>
        </Background>
    );
});

export default RecordList;
