import {Paging, PageReqType} from '../common';
 
export type MessageType = "CHEERING" | "NEW_RECORD" | "NOTIFICATION" | "INVITATION";

export interface MessageActionType {
    type: string,
    typeId: string
}

export interface MessageDataType {
    id: number,
    diaryUuid: string,
    type: string,
    diaryTitle: string,
    body: string,
    fromNickname: string,
    createdDate: string,
    title: string,
    updatedDate: string
} 

export type MessageResType = Paging<MessageDataType>;

export interface MessageReqType extends PageReqType{
}

export interface MessageByTypeReqType{
    type: MessageType
}

/**
 * 푸쉬알림에서 받아오는 data 형식
 */
export interface PushNotification {
    diaryUuid : string,
    fromUserId: number,
    messageType : MessageType,
    toUserId: number,
}

/**
 * 보내는 메세지 타입
 */
export interface SendMessageReq {
    type : MessageType,
    toUserId : number,
    title: string,
    body: string
}