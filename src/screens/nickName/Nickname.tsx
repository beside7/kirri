import React, { useState, useEffect } from 'react';
import {Text, Image} from 'react-native';
import {Container, Title, SquareButton} from '@components';
import { SelectProfileImage } from './SelectProfileImg';
import {MakeNicknameContianer, MakeNicknameTitle, MakeNicknameInput, InputAddedText, MakeNicknameInputWarp, ButtonContainer, BackIcon} from './nickname.style'
import {JoinProcessing} from './JoinProcessing';
import _ from 'lodash';
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
            alert(user)
            UserStore.login(user)
            setJoinProcessLoading(false);
        } catch (error) {
            alert(error)
        }
    }
    
    if (joinProcessLoading) {
      return (
        <JoinProcessing open={joinProcessLoading}></JoinProcessing>
      )
    }

    // useEffect(()=>{
    //   _.debounce(()=>{

    //   },2000)
    // },[nickname]);

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
                        onChange={(text)=>{setNickname(text)}}
                        placeholder='멋진자몽'
                        text={nickname}
                        rightText='끼리'
                    />
                    
                </MakeNicknameContianer>
                <ButtonContainer>
                    <SquareButton
                        onClick={()=>{
                            joinKirri();
                        }}
                        disabled={false}
                    >다음</SquareButton>
                </ButtonContainer>
            </Container>
        </>
    )
}