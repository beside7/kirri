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
import {JoinProcessing} from './JoinProcessing';
import {debounce} from 'lodash';
import { KirriTextInput } from '@components';
import { userApis } from '@apis';
import {UserStore} from '@store';
import {navigateGoBack} from '@config/navigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProfileImageTypes } from '@utils';
import { UpdateUserMeResType } from '@type-definition/user';


interface Props {
    username: string,
    accessToken: string ,
    authorities: string[],
    [key : string]: any
}


export const PersonalInfo = ({accessToken, authorities}: Props) => {
    const [joinProcessLoading, setJoinProcessLoading] = useState(false);
    // const [nickname, setNickname] = useState('');
    const selectedProfileImage = useRef<ProfileImageTypes>('01');
    const [duplicate, setDuplicate] = useState(false);
    const nickname = useRef<string>('');
    
    const changePersonalInfo = async () =>{
        if (!nickname.current || duplicate) {
            return;
        }
        const payload:UpdateUserMeResType = {};
        
        try {
            const data = await userApis.updateUserMe(payload);
            alert(data)
            payload.profileImagePath && (UserStore.changeProfileImg(payload.profileImagePath));
            payload.nickname && (UserStore.setNickname(payload.nickname));
        } catch (error) {
            setJoinProcessLoading(false);
        }
    }


    const checkDuple = debounce(() => {
        try {
            userApis.checkNicknameDupl(nickname.current).then((result: any)=>{
                if (result.exists) {
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
                    title='닉네임만들기'
                    leftIcon={require('@assets/images/various_back_normal.png')}
                    onLeftClick={handleGoBack}
                    borderBottom={false}
                />
                <Container>
                    
                    
                    <SelectProfileImage
                        selecteChanged={(img: ProfileImageTypes)=>{
                            selectedProfileImage.current = img;
                        }}
                    ></SelectProfileImage>
                    <MakeNicknameContianer>
                        <MakeNicknameTitle>한글, 영문, 숫자를 사용해 멋진 닉네임을 만들어주세요</MakeNicknameTitle>
                        <KirriTextInput
                            onChange={(text)=>{
                                nickname.current = text;
                                if(!nickname) {
                                    setDuplicate(false);
                        
                                }
                                checkDuple();
                            
                            }}
                            placeholder='멋진자몽'
                            text=''
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
            
        </>
    )
}