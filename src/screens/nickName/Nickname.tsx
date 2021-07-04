import React from 'react';
import {Text, Image} from 'react-native';
import {Container, Title, SquareButton} from '@components';
import { SelectProfileImage } from './SelectProfileImg';
import {MakeNicknameContianer, MakeNicknameTitle, MakeNicknameInput, InputAddedText, MakeNicknameInputWarp, ButtonContainer, BackIcon} from './nickname.style'



interface Props {

}

export const Nickname = ({}: Props) => {
    return (
        <Container>
            <Title
                title='닉네임만들기'
                rightIcon={<BackIcon style={{width:24, height:24}} source={require('@assets/images/various_back_normal.png')}/>}
            />

            <SelectProfileImage
                selecteChanged={(img: string)=>{

                }}
            ></SelectProfileImage>
            <MakeNicknameContianer>
                <MakeNicknameTitle>한글, 영문, 숫자를 사용해 멋진 닉네임을 만들어주세요</MakeNicknameTitle>
                <MakeNicknameInputWarp>
                    <MakeNicknameInput
                        placeholder='멋진자몽'
                    />
                    <InputAddedText><Text style={{color:'#6f6f7e'}}>끼리</Text></InputAddedText>
                </MakeNicknameInputWarp>
                
            </MakeNicknameContianer>
            <ButtonContainer>
                <SquareButton
                    
                    onClick={()=>{}}
                    disabled={false}
                >다음</SquareButton>
            </ButtonContainer>

        </Container>
    )
}