import React, {useCallback, Fragment, ReactElement} from 'react';
import {Container, ImageWrap, Image, ContentWrap, ContentText, ContentTextBold, InfoWrap, TimeText} from './message.style';
import { MessageDataType, MessageType } from '@type-definition/message';
import {Cheering, Invitation} from './MessageByType';




const messageByTypes: {[key: string]: any} = {
    CHEERING : Cheering,
    NEW_RECORD : Invitation,
    NOTIFICATION : Invitation,
    INVITATION :Invitation
}


interface Props extends MessageDataType {
    updateMessageStatus: (message: MessageDataType) => void,
    setConfirmPopup: (uuid: string, type: MessageType) => void,
    to: string
}


export const Message = (props: Props) => {
    return React.createElement(messageByTypes[props.type], {...props});
}