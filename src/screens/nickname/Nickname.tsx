import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native'
import {Title, Button, Header} from '@components';
import { SelectProfileImage } from './SelectProfileImg';
import {
    MakeNicknameContianer,
    ButtonContainer,
    MakeNicknameTitle,
    SafeAreaView,
    Container,
    SelectProfileImageWrap,
    ProfileSpeechBubbleWrap,
    ProfileSpeechBubbleWrapBg,
    ProfileSpeechBubbleWrapBgTail,
    ProfileImageText, NickNameCount
} from './nickname.style'
import {JoinProcessing} from './JoinProcessing';
import {debounce} from 'lodash';
import { KirriTextInput } from '@components';
import { userApis } from '@apis';
import {UserStore} from '@store';
import {navigate, navigateGoBack} from '@config/navigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProfileImageTypes } from '@utils';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateExpoToken } from "@utils";


interface Props {
    username: string,
    accessToken: string ,
    authorities: string[],
    [key : string]: any
}


export const Nickname = ({accessToken, authorities}: Props) => {
    const [joinProcessLoading, setJoinProcessLoading] = useState(false);
    const selectedProfileImage = useRef<ProfileImageTypes>('01');
    const [duplicate, setDuplicate] = useState<undefined|boolean>(undefined);
    const [nickname, setNickname] = useState<string>();
    const currentNickname = useRef<string>('');
    const [errorMessage, setErrorMessage] = useState("");
    const [nickNameCount, setNickNameCount] = useState(0);
    
    const joinKirri = async () =>{
        if (!nickname || duplicate) {
            return;
        }
        setJoinProcessLoading(true);
        try {
            const result = await userApis.signin(
                {
                    nickname: currentNickname.current,
                    autoLogin: true,
                    profileImagePath:'profile:'+selectedProfileImage.current,
                    agreementList:["SERVICE", "PRIVACY"]
                }
            );
            if(result){
                await userApis.updatePush({
                    CHEERING: true,
                    NEW_RECORD: true,
                    NOTIFICATION: true,
                    INVITATION: true
                })
                /**
                 * config 설정 : 활성화
                 */
                await AsyncStorage.setItem('pushNotification', JSON.stringify(true));
            }
            const expoTokenResult = await updateExpoToken();
            UserStore.login();
            setJoinProcessLoading(false);
            navigate('Home', null);
        } catch (error) {
            setJoinProcessLoading(false);
        }
    }


    const checkDuple = debounce(() => {
        try {
            if (!currentNickname.current) {
                setDuplicate(undefined);
                return;
            }
            const pattern = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi;
            if (currentNickname.current.replace(pattern, "")!==currentNickname.current){
                setDuplicate(true);
                setErrorMessage("영문, 숫자, 한글만을 이용해, 닉네임을 만들 수 있어요.");
                return;
            }
            userApis.checkNicknameDupl(currentNickname.current).then((result: any)=>{
                if (result.exists) {
                    setErrorMessage("앗 이미 등록된 닉네임이에요.");
                    setDuplicate(true);
                }else {
                    setDuplicate(false);
                }
                
            })
            
        } catch (error) {
            
        }
    }, 500);

    const checkSubmitPayload = useCallback(()=>{
        if (!nickname) {
            return true;
        }
        if(duplicate) {
            return true;
        }
        return false;
    }, [nickname, duplicate])


    const handleGoBack = () => {
        navigateGoBack();
    }

    return (
        <>
            <JoinProcessing  open={joinProcessLoading}/>
            <SafeAreaView>
                <Header
                    title='닉네임 만들기'
                    leftIcon={require('@assets/images/various_back_normal.png')}
                    onLeftClick={handleGoBack}
                    borderBottom={false}
                />
                <Container>
                    
                    <SelectProfileImageWrap>
                        <SelectProfileImage
                            selectedImage='01'
                            selecteChanged={(img: ProfileImageTypes)=>{
                                selectedProfileImage.current = img;
                            }}
                        ></SelectProfileImage>
                        <ProfileSpeechBubbleWrap>
                            <ProfileSpeechBubbleWrapBg>
                                <ProfileImageText>
                                    나만의 프로필 이미지로 {'\n'}
                                    바꿔 보자 뿌! :D
                                </ProfileImageText>
                            </ProfileSpeechBubbleWrapBg>
                            <ProfileSpeechBubbleWrapBgTail/>
                        </ProfileSpeechBubbleWrap>
                    </SelectProfileImageWrap>
                    <MakeNicknameContianer>
                        <View style={{ flexDirection: 'row' }}>
                            <MakeNicknameTitle>한글, 영문, 숫자를 사용해 멋진 닉네임을 만들어주세요!</MakeNicknameTitle>
                            <NickNameCount>{nickNameCount}/12</NickNameCount>
                        </View>
                        <KirriTextInput
                            onChange={(text)=>{
                                currentNickname.current = text;
                                if(nickNameCount >= 12){
                                    setNickname(text);
                                }
                                checkDuple();
                                setNickNameCount(text.length);
                            }}
                            placeholder='멋진자몽'
                            text=''
                            rightText='끼리'
                            onError={duplicate}
                            errorMessage={errorMessage}
                            maxLength={12}
                            onBlur={()=>{}}
                            confirmMessage="사용할 수 있는 닉네임이에요."
                        />
                        
                    </MakeNicknameContianer>
                    <ButtonContainer>
                        <Button
                            type='large'
                            onPress={()=>{
                                joinKirri();
                            }}
                            disabled={checkSubmitPayload()}
                        >다음</Button>
                    </ButtonContainer>
                </Container>
            </SafeAreaView>
            
        </>
    )
}