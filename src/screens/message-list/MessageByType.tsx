import React, {useCallback, Fragment} from 'react';
import {Container, ImageWrap, Image, ContentWrap, ContentText, ContentTextBold, InfoWrap, TimeText, ButtonWrap, ButtonPadding} from './message.style';
import { MessageDataType, MessageType } from '@type-definition/message';
import { View } from 'react-native';

import { userApis } from '@apis';
import {Button} from '@components';
import { StringIterator } from 'lodash';
// import { Timezone } from '@components';

const messageImage = require('@assets/images/alarm/various_message.png');


interface Props extends MessageDataType {
    to:string,
    createdTimeForamt?: string
}

interface ComponenetType extends Props{
    time: (time: string)=>string,
    updateMessageStatus: (message: Props) => void,
    setConfirmPopup: (uuid: string, type: MessageType|"REFUSE_INVITATION", message?: MessageDataType) => void
}



export const Invitation = ({id, type, fromNickname, title, diaryTitle, body, to, diaryUuid, createdDate, updatedDate,updateMessageStatus, setConfirmPopup, createdTimeForamt}:ComponenetType) => {
    const refuse = async () => {
        try {
            const result = await userApis.refuseInvitationDiary(diaryUuid);
            setConfirmPopup(diaryUuid, 'REFUSE_INVITATION');
            updateMessageStatus({id, type, fromNickname, title, body, to, diaryUuid, createdDate, diaryName});
        } catch (error) {
            
        }
    }

    const accept = async () => {
        try {
            const result = await userApis.acceptInvitationDiary(diaryUuid);
            setConfirmPopup(diaryUuid, 'INVITATION');
            updateMessageStatus({id, type, fromNickname, title, diaryTitle, body, to, diaryUuid, createdDate, updatedDate});
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
                    <ContentTextBold>{fromNickname}</ContentTextBold>님이 <ContentTextBold>{diaryTitle}</ContentTextBold> 다이어리에 초대했어요.
                </ContentText>
                <InfoWrap>
                    
                    <TimeText>{createdTimeForamt}</TimeText>
                    <ButtonWrap>
                        <Button
                            color= 'secondary'
                            onPress={
                                () => {refuse()}
                            }
                            type='small'
                        >
                            거절
                        </Button>
                        <ButtonPadding/>
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


export const Cheering = ({id, type, fromNickname, title, diaryTitle, body, to, diaryUuid, createdDate,updatedDate, updateMessageStatus, setConfirmPopup, createdTimeForamt}:ComponenetType) => {

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
                    <TimeText>{createdTimeForamt}</TimeText>
                    <View>
                        <Button
                            width={90}
                            color= 'secondary'
                            onPress={
                                () => {
                                    setConfirmPopup(diaryUuid, 'CHEERING', {id, type, fromNickname, title, diaryTitle, body, diaryUuid, createdDate, updatedDate});
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