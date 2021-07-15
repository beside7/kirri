import React, { useState, useEffect, useCallback } from 'react';
import {Text, Image} from 'react-native';
import {Container, Title, Button} from '@components';
import { SelectProfileImage } from './SelectProfileImg';
import {MakeNicknameContianer, MakeNicknameTitle, MakeNicknameInput, InputAddedText, MakeNicknameInputWarp, ButtonContainer, BackIcon} from './nickname.style'
import {JoinProcessing} from './JoinProcessing';
import {debounce} from 'lodash';
import { KirriTextInput } from '@components';
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { userApis } from '@apis';
import {UserStore} from '@store';
import {navigate} from '@config/navigator';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface Props {
    username: string,
    accessToken: string ,
    authorities: string[],
    [key : string]: any
}


export const Nickname = ({accessToken, authorities}: Props) => {
    const [joinProcessLoading, setJoinProcessLoading] = useState(false);
    const [nickname, setNickname] = useState('');
    const [duplicate, setDuplicate] = useState(false);
    
    const joinKirri = async () =>{
        if (!nickname || duplicate) {
            return;
        }
        setJoinProcessLoading(true);
        try {
            const result = await userApis.signin(
                {
                    nickname,
                    autoLogin: true,
                    profileImagePath:'',
                    agreementList:['SERVICE']
                }
            );
            const user = await userApis.userMe();
            UserStore.login(user)
            setJoinProcessLoading(false);
        } catch (error) {

        }
    }
    
    if (joinProcessLoading) {
      return (
        <JoinProcessing open={joinProcessLoading}></JoinProcessing>
      )
    }

    const checkDuple = debounce(() => {
        try {
            userApis.checkNicknameDupl(nickname).then((result: any)=>{
                if (result.exists) {
                    setDuplicate(true);
                    
                }else {
                    setDuplicate(false);
                }
                
            })
            
        } catch (error) {
            
        }
    }, 1000);

    const checkSubmitPayload = useCallback(()=>{
        if (!nickname) {
            return true;
        }
        if(duplicate) {
            return true;
        }
        return false;
    }, [nickname, duplicate])

    useEffect(()=>{
        if(!nickname) {
            setDuplicate(false);

        }
        checkDuple();
    },[nickname]);

    const handleGoBack = () => {
        navigate('Login', null);
    }

    return (
        <>
            <JoinProcessing  open={joinProcessLoading}/>
            <Container>
                <Title
                    title='닉네임만들기'
                    rightIcon={<TouchableOpacity onPress={()=>{handleGoBack()}}><BackIcon style={{width:24, height:24}} source={require('@assets/images/various_back_normal.png') }/></TouchableOpacity>}
                />

                <SelectProfileImage
                    selecteChanged={(img: string)=>{

                    }}
                ></SelectProfileImage>
                <MakeNicknameContianer>
                    <MakeNicknameTitle>한글, 영문, 숫자를 사용해 멋진 닉네임을 만들어주세요</MakeNicknameTitle>
                    <KirriTextInput
                        onChange={(text)=>{
                            setNickname(text);
                           
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
                            joinKirri();
                        }}
                        disabled={checkSubmitPayload()}
                    >다음</Button>
                </ButtonContainer>
            </Container>
        </>
    )
}