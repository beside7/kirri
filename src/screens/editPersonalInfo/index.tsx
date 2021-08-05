import React, { useState, useEffect, useCallback, useRef } from 'react';
import {Title, Button, Header} from '@components';
import { SelectProfileImage } from './SelectProfileImg';
import {
    MakeNicknameContianer,
    ButtonContainer,
    BackIcon,
    MakeNicknameTitle,
    SafeAreaView,
    Container
} from './nickname.style'
import { observer } from 'mobx-react';
import { UserStore } from '@store';
import {debounce} from 'lodash';
import { KirriTextInput } from '@components';
import { userApis } from '@apis';
import {navigateGoBack} from '@config/navigator';
import { ProfileImageTypes } from '@utils';
import { UpdateUserMeResType } from '@type-definition/user';



export const EditPersonalInfo = observer(()=> {
    const {nickname, profileImagePath} = UserStore;
    const [changeProcessLoading, setChangeProcessLoading] = useState(false);
    const [selectedProfileImage, setSelectedProfileImage] = useState<ProfileImageTypes>(profileImagePath[1] as ProfileImageTypes);
    const [duplicate, setDuplicate] = useState(false);
    const [changeNickname, setChangeNickname] = useState<string>('');
    const changeNicknameRef = useRef<string>('');
    
    const changePersonalInfo = async () =>{
        if (!changeNickname || duplicate) {
            return;
        } 
        const payload: UpdateUserMeResType = {};
        profileImagePath[1]!==selectedProfileImage && (payload.profileImagePath = 'profile:'+selectedProfileImage);
        nickname!==changeNickname && (payload.nickname = changeNickname);
        try {
            const data = await userApis.updateUserMe(payload);
            payload.profileImagePath && (UserStore.changeProfileImg(payload.profileImagePath));
            payload.nickname&& (UserStore.setNickname(payload.nickname));
            navigateGoBack();
        } catch (error) {
            setChangeProcessLoading(false);
        }
    }


    const checkDuple = debounce(() => {
        try {
            userApis.checkNicknameDupl(changeNicknameRef.current).then((result: any)=>{
                if (result.exists) {
                    if (nickname === changeNicknameRef.current) {
                        setDuplicate(false);
                        return;
                    }
                    setDuplicate(true);
                    
                }else {
                    setDuplicate(false);
                }
                
            })
            
        } catch (error) {
            
        }
    }, 500);

    const checkSubmitPayload = useCallback(()=>{
        if (profileImagePath[1]===selectedProfileImage && nickname === changeNickname) {
            return true;
        }
        if (!changeNickname) {
            return true;
        }
        if(duplicate) {
            return true;
        }
        return false;
    }, [changeNickname, duplicate, selectedProfileImage]);


    const handleGoBack = () => {
        navigateGoBack();
    }

    return (
        
            <SafeAreaView>
                <Header
                    title='프로필 변경하기'
                    leftIcon={require('@assets/images/various_back_normal.png')}
                    onLeftClick={handleGoBack}
                    borderBottom={false}
                />
                <Container>
                    
                    
                    <SelectProfileImage
                        selectedImage={profileImagePath[1]}
                        selecteChanged={(img: ProfileImageTypes)=>{
                            setSelectedProfileImage(img);
                        }}
                    ></SelectProfileImage>
                    <MakeNicknameContianer>
                        <MakeNicknameTitle>한글, 영문, 숫자를 사용해 멋진 닉네임을 만들어주세요</MakeNicknameTitle>
                        <KirriTextInput
                            onChange={(text)=>{
                                setChangeNickname(text);
                                changeNicknameRef.current = text;
                                if(!text) {
                                    setDuplicate(false);
                        
                                }
                                checkDuple();
                            
                            }}
                            placeholder='멋진자몽'
                            text={nickname}
                            rightText='끼리'
                            onError={duplicate}
                            errorMessage='사용할 수 없는 닉네임이예요'
                        />
                        
                    </MakeNicknameContianer>
                    <ButtonContainer>
                        <Button
                            type='large'
                            onPress={()=>{
                                changePersonalInfo();
                            }}
                            disabled={checkSubmitPayload()}
                        >완료</Button>
                    </ButtonContainer>
                </Container>
            </SafeAreaView>
            
        
    )
})