import { apiClient } from '../clients';
import {MessageReqType, MessageResType, MessageByTypeReqType} from '@type-definition/message';
import {ResType} from '@type-definition/common';


export const messageApis = {
    getAllMessages : async ({size, page}: MessageReqType)=> {
        try {
            const {data}: ResType<MessageResType> = await apiClient.get('/messages', {params: {size, page}});
            return data; 
        } catch (error) {
            return error;
        }
    },
    getMessagesByType : async ({size, page, type}: MessageByTypeReqType)=> {
        try {
            const {data}: ResType<MessageResType> = await apiClient.get('/messages', {params: {size, page, type}});
            return data; 
        } catch (error) {
            return error;
        }
    },
};
