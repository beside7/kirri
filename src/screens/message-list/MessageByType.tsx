import React, {useCallback, Fragment} from 'react';
import {Container, ImageWrap, Image, ContentWrap, ContentText, ContentTextBold, InfoWrap, TimeText, ButtonWrap, Button} from './message.style';
import { MessageDataType } from '@type-definition/message';
import { View } from 'react-native';

import { userApis } from '@apis';


const messageImage = require('@assets/images/alarm/various_message.png');


interface Props extends MessageDataType {
    updateMessageStatus: (message: MessageDataType) => void 
}

interface ComponenetType extends Props{
    time: (time: string)=>string,
}



export const Invitation = ({id, type, from, title, body, to, actionList, updateMessageStatus}:ComponenetType) => {
    const refuse = async () => {
        try {
            const result = await userApis.refuseInvitationDiary(actionList[0].typeId);
            updateMessageStatus({id, type, from, title, body, to, actionList});
        } catch (error) {
            
        }
    }

    const accept = async () => {
        try {
            const result = await userApis.acceptInvitationDiary(actionList[0].typeId);
            updateMessageStatus({id, type, from, title, body, to, actionList});
        } catch (error) {
            
        }
    }
    return (
        <Container>
            <ImageWrap>
                <Image source={messageImage}></Image>
            </ImageWrap>
            <ContentWrap>
                <ContentText>
                    <ContentTextBold>{from}</ContentTextBold>님이 <ContentTextBold>{to}</ContentTextBold>님과 [{title}]를 함께 쓰고 싶어해요.
                </ContentText>
                <InfoWrap>
                    <TimeText></TimeText>
                    <ButtonWrap>
                        <Button
                            color= 'secondary'
                            onPress={
                                () => {refuse()}
                            }
                            type='small'
                        >
                            거부
                        </Button>
                        <Button
                            color= 'primary'
                            onPress={
                                () => {accept()}
                            }
                            type='small'
                        >
                            수락
                        </Button>
                    </ButtonWrap>
                </InfoWrap>
            </ContentWrap>
        </Container>   
    )
}


export const Cheering = ({id, type, from, title, body, to, actionList, updateMessageStatus}:ComponenetType) => {

    return (
        <Container>
            <ImageWrap>
                <Image source={messageImage}></Image>
            </ImageWrap>
            <ContentWrap>
            <ContentText>
                [{to}]에게, {body} {'\n'}
                    from.[{from}]
                </ContentText>
                <InfoWrap>
                    <TimeText></TimeText>
                    <View>
                        <Button
                            width={90}
                            color= 'secondary'
                            onPress={
                                () => {}
                            }
                            type='small'
                        >
                            자세히보기
                        </Button>
                    </View>
                </InfoWrap>
            </ContentWrap>
        </Container>   
    )
}