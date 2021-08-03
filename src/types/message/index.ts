import {Paging, PageReqType} from '../common';
 
export type MessageType = "CHEERING" | "NEW_RECORD" | "NOTIFICATION" | "INVITATION";

export interface MessageActionType {
    type: string,
    typeId: string
}

export interface MessageDataType {
    id: number,
    type: string,
    title: string,
    body: string,
    from: string,
    to: string,
    actionList: MessageActionType[]
} 

export type MessageResType = Paging<MessageDataType>;

export interface MessageReqType extends PageReqType{
}

export interface MessageByTypeReqType extends PageReqType{
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