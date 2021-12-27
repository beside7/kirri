import React, { useState } from "react";
import {
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    Alert
} from "react-native";
import { Background, Text_2, Popup } from "@components";
import { DiaryResType, Memeber } from "@type-definition/diary";

import { TextInput, Icon, Button, AlertContent, AlertText } from "./style";
import { userApis, diaryApis } from "@apis";
import { Snackbar } from "react-native-paper";

/**
 * 닉네임 중복체크 결과 타입
 */
type CheckNicknameDuplRes = {
    exists: boolean;
};

/**
 * 다이러리 멤버 조회 결과
 */

type InviteFriendProps = {
    diary: DiaryResType | null;
};

export default function InviteFriend({ diary }: InviteFriendProps) {
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
     * 사용자가 입력한 닉네임
     */
    const [nickname, setNickname] = useState("");

    /**
     * api 호출중 표시
     */
    const [loading, setLoading] = useState(false);

    /**
     * 초대하기 결과 상태
     */
    const [members, setMembers] = useState<Memeber[]>([]);

    /**
     * 검색결과가 없을때 처리
     */
    const [notfound, setNotfound] = useState(false);

    /**
     * 경고창 출력여부
     */
    const [alertOpen, setAlertOpen] = useState(false);

    /**
     * 경고창 메세지
     */
    const [alertMessage, setAlertMessage] = useState("");

    const findNickname = async () => {
        setLoading(true);

        if (diary) {
            const { uuid } = diary;

            /**
             * 닉네임 중복 체크
             */

            try {
                const res = (await userApis.checkNicknameDupl(
                    nickname
                )) as CheckNicknameDuplRes;
                // console.log(res);

                const { exists } = res;
                if (exists) {
                    try {
                        // console.log(uuid);
                        /**
                         * 다이러리 멤버 조회
                         */
                        // console.log(nickname);
                        const data = (await diaryApis.findMember(
                            uuid,
                            nickname
                        )) as Memeber;
                        // console.log(data);
                        if (data) {
                            setMembers([data]);
                        } else {
                            setNotfound(true);
                            setMembers([]);
                        }
                    } catch (error: any) {
                        if (error.response) {
                            const { data } = error.response;
                            /**
                             * 만약 해당멤베가 존재하지 않는다면
                             */
                            if (data.code === "4001") {
                                setMembers([
                                    {
                                        nickname: nickname,
                                        userId: null,
                                        status: null,
                                        authority: null,
                                        profileImagePath: "",
                                        memberId: null
                                    }
                                ]);
                            }
                        }
                        // console.log(error);
                        // setNotfound(true);
                        // setMembers([]);
                    }
                } else {
                    /**
                     * 닉네임 중복테스트 결과 중복되는 아이디가 없으면 없다고 처리
                     */
                    setNotfound(true);
                    setMembers([]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        setLoading(false);
    };

    const addMember = async () => {
        if (diary) {
            setLoading(true);
            const { uuid } = diary;
            try {
                const res = await diaryApis.addMember(uuid, nickname);

                // setAlertMessage(`${nickname} 님을 초대헀어요.`);
                // setAlertOpen(true)

                setMessage(`${nickname} 님을 초대헀어요.`);
                setSnackVisible(true);

                await findNickname();
                setLoading(false);
                // console.log(res);
                return res;
            } catch (error) {
                setAlertMessage(`초대중 에러발생`);
                setAlertOpen(true);
                console.log(error);
            }
        }
    };

    return (
        <Background>
            <View
                style={{ paddingVertical: 0, paddingHorizontal: 34, flex: 1 }}
            >
                <View
                    style={{
                        height: 77,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text_2 style={{ fontSize: 14, color: "#17171c" }}>
                        친구와 같이 일기를 작성해보세요!
                    </Text_2>
                </View>
                <View>
                    <TextInput
                        placeholder="친구의 닉네임을 검색해보세요!"
                        value={nickname}
                        onChangeText={value => {
                            setNickname(value);
                        }}
                        onSubmitEditing={findNickname}
                    />
                    <Button
                        onPress={() => {
                            setNickname("");
                        }}
                    >
                        <Icon source={require("@assets/icons/x.png")} />
                    </Button>
                </View>
                <View
                    style={{
                        height: 77,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                "",
                                "끼리 앱 다운로드 링크가 복사되었어요!"
                            );
                        }}
                    >
                        <Text_2
                            style={{
                                fontSize: 12,
                                color: "#6f6f7e",
                                textDecorationLine: "underline"
                            }}
                        >
                            앗, 친구가 아직 끼리에 가입하지 않았나요?
                        </Text_2>
                    </TouchableOpacity>
                </View>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={members}
                        ListEmptyComponent={() => {
                            return notfound ? (
                                <View
                                    style={{
                                        paddingTop: 130,
                                        alignItems: "center",
                                        flex: 1
                                    }}
                                >
                                    <Text_2>검색 결과가 없습니다.</Text_2>
                                </View>
                            ) : null;
                        }}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item: { nickname, status } }) => {
                            return (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        height: 60
                                    }}
                                >
                                    {/*
                                     * 프로파일 이미지
                                     */}
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
                                    {/*
                                     * 닉네임 부분
                                     */}
                                    <View
                                        style={{
                                            width: "60%",
                                            alignItems: "flex-start"
                                        }}
                                    >
                                        <Text_2
                                            style={{
                                                fontSize: 14,
                                                color: "#000000"
                                            }}
                                        >
                                            {nickname}
                                        </Text_2>
                                    </View>
                                    <View
                                        style={{
                                            width: "20%",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        {status !== null && (
                                            <View
                                                style={{
                                                    backgroundColor: "#b4b4b4",
                                                    width: 52,
                                                    height: 28,
                                                    borderRadius: 10,
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <Text_2
                                                    bold="Medium"
                                                    style={{
                                                        fontSize: 12,
                                                        color: "#17171c"
                                                    }}
                                                >
                                                    {status === "ACTIVE" &&
                                                        "초대됨"}
                                                    {status === "INVITING" &&
                                                        "초대중"}
                                                </Text_2>
                                            </View>
                                        )}
                                        {status === null && (
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: "#ffdd1f",
                                                    width: 52,
                                                    height: 28,
                                                    borderRadius: 10,
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                                onPress={addMember}
                                            >
                                                <Text_2
                                                    bold="Medium"
                                                    style={{
                                                        fontSize: 12,
                                                        color: "#17171c"
                                                    }}
                                                >
                                                    초대
                                                </Text_2>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            );
                        }}
                    />
                </SafeAreaView>
            </View>
            <Popup
                open={alertOpen}
                confirm="확인"
                onConfirm={async () => {
                    setAlertOpen(false);
                }}
                width={300}
                handelOpen={(key: boolean) => {}}
                content={
                    <AlertContent>
                        <AlertText>{alertMessage}</AlertText>
                    </AlertContent>
                }
            />
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
}
