import React, { useState, Fragment, useEffect } from "react";
import { View, StatusBar, Image } from "react-native";
import { Header, KirriTextInput, Switch, Popup } from "@components";
import {
    SafeAreaViewTop,
    SafeAreaViewBottom,
    ContentContainer,
    MakeNicknameTitle,
    NicknameInputWarp,
    Content,
    Profile,
    SettingIcon,
    VersionText,
    LeaveKKiriTitle,
    LeaveKKiriWarp,
    LeaveKirriPopupContent,
    SignoutImage,
    SignoutText,
    ProfileImage,
    NicknameWarp,
    EditProfile,
    NicknameText
} from "./setting.style";
import { SelectProfileImage } from "../nickname/SelectProfileImg";
import { observer } from "mobx-react";
import { UserStore } from "@store";
import { debounce } from "lodash";
import { userApis } from "@apis";
import { SettingContent } from "./SettingContent";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    navigate,
    navigateGoBack,
    navigateWithoutRefresh,
    navigateWithReset
} from "@config/navigator";
import { UpdateUserMeResType } from "@type-definition/user";
import { getProfileImage, ProfileImageTypes } from "@utils";

export const Settings = observer(() => {
    const { nickname, profileImage, pushStatus } = UserStore;
    const [leavKKiriPopupOpen, setLeavKKiriPopupOpen] = useState(false);
    const [leavePopupOpen, setLeavePopupOpen] = useState(false);
    const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);

    /**
     * 알림설정 여부
     */
    const [pushNotification, setPushNotification] = useState(pushStatus);

    /**
     * 알림설정 토글시 이벤트
     * @param payload
     */
    const handleChangeAlarmState = async (value: boolean) => {
        try {
            setPushNotification(value);
            await AsyncStorage.setItem(
                "pushNotification",
                JSON.stringify(value)
            );
            userApis
                .updatePush({
                    CHEERING: value,
                    NEW_RECORD: value,
                    NOTIFICATION: value,
                    INVITATION: value
                })
                .catch(err => {
                    console.log(err.response);
                });
        } catch (error) {
            console.log("device", error);
        }
    };

    const logout = () => {
        setLogoutPopupOpen(false);
        UserStore.logout();
        AsyncStorage.removeItem("userKey", () => {
            navigateWithReset("Login", null);
        });
    };

    const handleSignout = async () => {
        try {
            const result = await userApis.deleteUserMe();
            UserStore.logout();
            setLeavKKiriPopupOpen(false);
            setLeavePopupOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    const leave = () => {
        setLeavePopupOpen(false);
        logout();
    };

    useEffect(() => {
        AsyncStorage.getItem("pushNotification", (err, value) => {
            setPushNotification(value ? (JSON.parse(value) as boolean) : false);
        });
    }, []);

    return (
        <Fragment>
            <SafeAreaViewTop></SafeAreaViewTop>
            {/* <StatusBar barStyle="light-content" /> */}
            <SafeAreaViewBottom>
                <Header
                    leftIcon={require("@assets/icons/back.png")}
                    onLeftClick={() => {
                        navigateGoBack();
                    }}
                    title="설정"
                ></Header>
                <ContentContainer>
                    <Profile>
                        <ProfileImage source={profileImage} />
                        <NicknameWarp>
                            <NicknameText>{nickname}</NicknameText>
                            <EditProfile
                                onPress={() => {
                                    navigate("EditPersonalInfo", null);
                                }}
                            >
                                <Image
                                    style={{
                                        width: 18,
                                        height: 18,
                                        resizeMode: "contain"
                                    }}
                                    source={require("@assets/images/settings/setting_edit_name_normal.png")}
                                ></Image>
                            </EditProfile>
                        </NicknameWarp>
                    </Profile>
                    <Content>
                        <SettingContent
                            icon={require("@assets/images/settings/setting_notice_setting.png")}
                            title="알림 설정"
                        >
                            <Switch
                                value={pushNotification}
                                onValueChange={handleChangeAlarmState}
                            ></Switch>
                        </SettingContent>
                        <TouchableOpacity
                            onPress={() => {
                                navigateWithoutRefresh("TermsWebview", {
                                    title: "공지 사항",
                                    url: "https://sponge-anger-3ef.notion.site/857070a7a9a7405aa7beb9e7b923622a"
                                });
                            }}
                        >
                            <SettingContent
                                icon={require("@assets/images/settings/setting_personal_info.png")}
                                title="공지사항"
                            >
                                <SettingIcon
                                    source={require("@assets/images/settings/setting_next_normal.png")}
                                />
                            </SettingContent>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigateWithoutRefresh("TermsWebview", {
                                    type: "SERVICE",
                                    title: "이용 약관"
                                });
                            }}
                        >
                            <SettingContent
                                icon={require("@assets/images/settings/setting_personal_info.png")}
                                title="이용약관"
                            >
                                <SettingIcon
                                    source={require("@assets/images/settings/setting_next_normal.png")}
                                />
                            </SettingContent>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigateWithoutRefresh("TermsWebview", {
                                    type: "PRIVACY",
                                    title: "개인정보 처리 방침"
                                });
                            }}
                        >
                            <SettingContent
                                icon={require("@assets/images/settings/setting_personal_info.png")}
                                title="개인정보 처리 방침"
                            >
                                <SettingIcon
                                    source={require("@assets/images/settings/setting_next_normal.png")}
                                />
                            </SettingContent>
                        </TouchableOpacity>
                        <SettingContent
                            icon={require("@assets/images/settings/setting_version.png")}
                            title="버전정보"
                        >
                            <VersionText>V1.0.0</VersionText>
                        </SettingContent>
                        <TouchableOpacity
                            onPress={() => {
                                setLogoutPopupOpen(true);
                            }}
                        >
                            <SettingContent
                                icon={require("@assets/images/settings/setting_logout.png")}
                                title="로그아웃"
                            >
                                <SettingIcon
                                    source={require("@assets/images/settings/setting_next_normal.png")}
                                />
                            </SettingContent>
                        </TouchableOpacity>
                    </Content>
                    <LeaveKKiriWarp
                        onPress={() => {
                            setLeavKKiriPopupOpen(true);
                        }}
                    >
                        <LeaveKKiriTitle>아쉽지만 탈퇴 할래요.</LeaveKKiriTitle>
                    </LeaveKKiriWarp>
                </ContentContainer>
            </SafeAreaViewBottom>
            <Popup
                open={leavKKiriPopupOpen}
                cancel="맞아요"
                confirm="싫어요"
                onConfirm={async () => {
                    setLeavKKiriPopupOpen(false);
                }}
                onCancel={handleSignout}
                width={300}
                handelOpen={(key: boolean) => {}}
                content={
                    <LeaveKirriPopupContent>
                        <SignoutImage
                            source={require("@assets/images/settings/popup_setting_account_delete_bgimg.png")}
                        ></SignoutImage>
                        <SignoutText>
                            정말 끼리를 떠나시나요?{"\n"}모든 다이어리와 기록이
                            {"\n"}삭제되고 복구할 수 없어요.
                        </SignoutText>
                    </LeaveKirriPopupContent>
                }
            />
            <Popup
                open={leavePopupOpen}
                confirm="꼭 돌아올게요"
                onConfirm={async () => {
                    leave();
                }}
                width={300}
                handelOpen={(key: boolean) => {}}
                content={
                    <LeaveKirriPopupContent>
                        <SignoutText>
                            끼리와 함께한 시간이 행복했길 바랄게요.{"\n"}언제든
                            다시 돌아오세요!
                        </SignoutText>
                    </LeaveKirriPopupContent>
                }
            />
            <Popup
                open={logoutPopupOpen}
                cancel="로그아웃"
                confirm="취소"
                onCancel={async () => {
                    logout();
                }}
                onConfirm={async () => {
                    setLogoutPopupOpen(false);
                }}
                width={300}
                handelOpen={(key: boolean) => {}}
                content={
                    <LeaveKirriPopupContent>
                        <SignoutText>
                            로그아웃 하시겠어요? {"\n"}친구들의 응원 메시지와 새
                            알림을 받지 못해요.
                        </SignoutText>
                    </LeaveKirriPopupContent>
                }
            />
        </Fragment>
    );
});
