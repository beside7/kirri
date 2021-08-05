import { apiClient } from '../clients';
import {MessageReqType, MessageResType, MessageByTypeReqType} from '@type-definition/message';
import {ResType} from '@type-definition/common';


export const messageApis = {
    getAllMessages : async ({size, lastId}: MessageReqType)=> {
        try {
            const {data}: ResType<MessageResType> = await apiClient.get('/messages', {params: {size, 'last-id': lastId}});
            return data; 
        } catch (error) {
            return error;
        }
    },
    getMessagesByType : async ({size, lastId, type}: MessageByTypeReqType)=> {
        try {
            const {data}: ResType<MessageResType> = await apiClient.get('/messages', {params: {size, type, 'last-id': lastId}});
            return data; 
        } catch (error) {
            return error;
        }
    },
};
