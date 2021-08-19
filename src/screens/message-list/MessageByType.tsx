import React, {useCallback, Fragment} from 'react';
import {Container, ImageWrap, Image, ContentWrap, ContentText, ContentTextBold, InfoWrap, TimeText, ButtonWrap} from './message.style';
import { MessageDataType, MessageType } from '@type-definition/message';
import { View } from 'react-native';

import { userApis } from '@apis';
import {Button} from '@components';
// import { Timezone } from '@components';

const messageImage = require('@assets/images/alarm/various_message.png');


interface Props extends MessageDataType {
    to:string
}

interface ComponenetType extends Props{
    time: (time: string)=>string,
    updateMessageStatus: (message: Props) => void,
    setConfirmPopup: (uuid: string, type: MessageType, message?: MessageDataType) => void
}



export const Invitation = ({id, type, fromNickname, title, body, to, diaryUuid, createdDate, updateMessageStatus, setConfirmPopup}:ComponenetType) => {
    const refuse = async () => {
        try {
            const result = await userApis.refuseInvitationDiary(diaryUuid);
            updateMessageStatus({id, diaryUuid, type, fromNickname, title, body, to, createdDate});
        } catch (error) {
            
        }
    }

    const accept = async () => {
        try {
            const result = await userApis.acceptInvitationDiary(diaryUuid);
            setConfirmPopup(diaryUuid, 'INVITATION');
            updateMessageStatus({id, type, fromNickname, title, body, to, diaryUuid, createdDate});
        } catch (error) {
            alert(error)
        }
    }
    return (
        <Container>
            <ImageWrap>
                <Image source={messageImage}></Image>
            </ImageWrap>
            <ContentWrap>
                <ContentText>
                    <ContentTextBold>{fromNickname}</ContentTextBold>님이 <ContentTextBold>{to}</ContentTextBold>님과 [{title}]를 함께 쓰고 싶어해요.
                </ContentText>
                <InfoWrap>
                    {/* <Timezone
                        time={createdDate}
                        // element={TimeText}
                    ></Timezone> */}
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


export const Cheering = ({id, type, fromNickname, title, body, to, diaryUuid, createdDate, updateMessageStatus, setConfirmPopup}:ComponenetType) => {

    return (
        <Container>
            <ImageWrap>
                <Image source={messageImage}></Image>
            </ImageWrap>
            <ContentWrap>
            <ContentText>
                [{to}]에게, {body} {'\n'}
                    from.[{fromNickname}]
                </ContentText>
                <InfoWrap>
                    <TimeText></TimeText>
                    <View>
                        <Button
                            width={90}
                            color= 'secondary'
                            onPress={
                                () => {
                                    setConfirmPopup(diaryUuid, 'CHEERING', {id, type, fromNickname, title, body, diaryUuid, createdDate});
                                }
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