import { apiClient } from "../clients";
import {
    MessageReqType,
    MessageResType,
    MessageByTypeReqType,
    SendMessageReq
} from "@type-definition/message";
import { ResType } from "@type-definition/common";

export const messageApis = {
    getAllMessages: async ({ size, lastId }: MessageReqType) => {
        try {
            const { data }: ResType<MessageResType> = await apiClient.get(
                "/messages"
            );
            return data;
        } catch (error) {
            return error;
        }
    },
    getMessagesByType: async ({ type }: MessageByTypeReqType) => {
        try {
            const { data }: ResType<MessageResType> = await apiClient.get(
                "/messages",
                { params: { type } }
            );
            return data;
        } catch (error) {
            return error;
        }
    },
    /**
     * 메세지 전송
     * @param diaryUuid 다이러리 uuid
     * @param payload 보내는 내용
     * @returns
     */
    sendMessage: async (
        diaryUuid: string,
        payload: SendMessageReq
    ): Promise<void> => {
        await apiClient.post(`/diaries/${diaryUuid}/messages`, payload);
        return;
    }
};
