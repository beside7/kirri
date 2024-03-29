import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, Header } from "@components";
import { SelectProfileImage } from "./SelectProfileImg";
import {
    MakeNicknameContianer,
    ButtonContainer,
    MakeNicknameTitle,
    SafeAreaView,
    Container,
    TextCounter,
    TitleContainer
} from "./nickname.style";
import { observer } from "mobx-react";
import { UserStore } from "@store";
import { debounce } from "lodash";
import { KirriTextInput } from "@components";
import { userApis } from "@apis";
import { navigateGoBack } from "@config/navigator";
import { ProfileImageTypes } from "@utils";
import { UpdateUserMeResType } from "@type-definition/user";
import { Platform, BackHandler } from "react-native";

export const EditPersonalInfo = observer(() => {
    const { nickname, profileImagePath } = UserStore;
    const [changeProcessLoading, setChangeProcessLoading] = useState(false);
    const [selectedProfileImage, setSelectedProfileImage] =
        useState<ProfileImageTypes>(profileImagePath[1] as ProfileImageTypes);
    const [duplicate, setDuplicate] = useState<undefined | boolean>();
    const [changeNickname, setChangeNickname] = useState<string>("");
    const changeNicknameRef = useRef<string>("");
    const [errorMessage, setErrorMessage] = useState("");
    const [textCount, setTextCount] = useState(0);

    const changePersonalInfo = async () => {
        if (!changeNickname || duplicate) {
            return;
        }
        const payload: UpdateUserMeResType = {};
        profileImagePath[1] !== selectedProfileImage &&
            (payload.profileImagePath = "profile:" + selectedProfileImage);
        nickname !== changeNickname && (payload.nickname = changeNickname);
        try {
            const data = await userApis.updateUserMe(payload);
            payload.profileImagePath &&
                UserStore.changeProfileImg(payload.profileImagePath);
            payload.nickname && UserStore.setNickname(payload.nickname);
            navigateGoBack();
        } catch (error) {
            setChangeProcessLoading(false);
        }
    };

    const checkDuple = debounce(() => {
        try {
            if (!changeNicknameRef.current) {
                setDuplicate(undefined);
                return;
            }
            const pattern = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi;

            if (
                changeNicknameRef.current.replace(pattern, "") !==
                changeNicknameRef.current
            ) {
                setDuplicate(true);
                setErrorMessage(
                    "영문, 숫자, 한글만을 이용해, 닉네임을 만들 수 있어요."
                );
                return;
            }
            userApis
                .checkNicknameDupl(changeNicknameRef.current)
                .then((result: any) => {
                    if (result.exists) {
                        setErrorMessage("앗 이미 등록된 닉네임이에요.");
                        setDuplicate(true);
                    } else {
                        setDuplicate(false);
                        setErrorMessage("");
                    }
                });
        } catch (error) {}
    }, 700);

    const checkSubmitPayload = useCallback(() => {
        if (
            profileImagePath[1] === selectedProfileImage &&
            nickname === changeNickname
        ) {
            return true;
        }
        if (!changeNickname) {
            return true;
        }
        if (duplicate) {
            return true;
        }
        return false;
    }, [changeNickname, duplicate, selectedProfileImage]);

    const handleGoBack = () => {
        navigateGoBack();
    };

    useEffect(() => {
        const backAction = () => {
            navigateGoBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView>
            <Header
                title="프로필 변경하기"
                leftIcon={require("@assets/images/various_back_normal.png")}
                onLeftClick={handleGoBack}
                borderBottom={false}
            />
            <Container>
                <SelectProfileImage
                    selectedImage={profileImagePath[1]}
                    selecteChanged={(img: ProfileImageTypes) => {
                        setSelectedProfileImage(img);
                    }}
                ></SelectProfileImage>
                <MakeNicknameContianer>
                    <TitleContainer>
                        <MakeNicknameTitle>
                            한글, 영문, 숫자를 사용해 멋진 닉네임을
                            만들어주세요!
                        </MakeNicknameTitle>
                        <TextCounter>{textCount} / 12</TextCounter>
                    </TitleContainer>
                    <KirriTextInput
                        onChange={text => {
                            setChangeNickname(text);
                            setTextCount(text.length);
                            changeNicknameRef.current = text;
                            if (!text) {
                                setDuplicate(undefined);
                            }
                            if (text === nickname) {
                                setDuplicate(undefined);
                                return;
                            }
                            checkDuple();
                        }}
                        placeholder="멋진자몽"
                        text={nickname}
                        rightText="끼리"
                        onError={duplicate}
                        errorMessage={errorMessage}
                        maxLength={12}
                        onBlur={() => {}}
                        confirmMessage="사용할 수 있는 닉네임이에요."
                    />
                </MakeNicknameContianer>
                <ButtonContainer
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <Button
                        type="large"
                        onPress={() => {
                            changePersonalInfo();
                        }}
                        disabled={checkSubmitPayload()}
                    >
                        완료
                    </Button>
                </ButtonContainer>
            </Container>
        </SafeAreaView>
    );
});
