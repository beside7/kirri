import {
    CreateDiaryReqType,
    CreateRecordReqType,
    DiariesResType,
    DiaryResType,
    GetUploadURLReqType,
    GetUploadURLResType,
    RecordResType,
    RecordsResType,
    UploadImageReqType
} from "./../../types/diary/index";
import {apiClient} from "../clients";
import FormData from "form-data";

export const diaryApis = {
    async getDiaries(): Promise<DiariesResType> {
        const { data } = await apiClient.get("/diaries");
        return data;
    },
    async createDiary(payload: CreateDiaryReqType) {
        const { data } = await apiClient.post("/diaries", payload);
        return data;
    },

    /**
     * 다이러리 상세조회
     * @param uuid 다이러리기본키
     * @returns
     */
    async viewDiary(uuid: string): Promise<DiaryResType> {
        const { data } = await apiClient.get(`/diaries/${uuid}`);
        return data;
    },
    /**
     * 다이러리 수정
     * @param uuid 다이러리기본키
     * @param payload
     * @returns
     */
    async modifyDiary(uuid: string, payload: CreateDiaryReqType) {
        const { data } = await apiClient.put(`/diaries/${uuid}`, payload);
        return data;
    },
    /**
     * 다이러리 삭제
     * @param uuid
     */
    async deleteDiary(uuid: string): Promise<void> {
        await apiClient.delete(`/diaries/${uuid}`);
    },
    /**
     * 다이러리 멤버 조회
     * @param uuid 다이러리기본키
     * @param nickname 닉네임
     * @returns
     */
    async findMember(uuid: string, nickname: string) {
        const { data } = await apiClient.get(`/diaries/${uuid}/members`, {
            params: {
                nickname: nickname
            }
        });
        return data;
    },

    /**
     * 다이러리 멤버 추가
     * @param uuid  다이러리기본키
     * @param nickname 닉네임
     * @returns
     */
    async addMember(uuid: string, nickname: string) {
        const { data } = await apiClient.post(`/diaries/${uuid}/members`, {
            nickname: nickname
        });
        return data;
    },

    /**
     * 다이러리 멤버 내보내기
     * @param uuid
     * @param userId
     * @returns
     */
    async deleteMember(uuid: string, userId: number) {
        const { data } = await apiClient.delete(
            `/diaries/${uuid}/members/${userId}`
        );
        return data;
    },

    /**
     * 관리자 지정
     * @param diaryUuid
     * @param memberId
     */
    async setAdministrator(
        diaryUuid: string,
        memberId: number,
        param: { authority: "DIARY_MEMBER" | "DIARY_OWNER" }
    ) {
        const { data } = await apiClient.patch(
            `/diaries/${diaryUuid}/members/${memberId}`,
            param
        );
        return data;
    },

    /**
     * 다이러리 나가기
     * @param uuid
     */
    async leaveDiary(uuid: string): Promise<void> {
        await apiClient.delete(`/diaries/${uuid}`);
    }
};

/**
 * 기록에 관한 API
 */
export const recordApis = {
    /**
     * 기록목록을 가져온다
     * @param uuid 다이러리 기본키
     * @param last_id 기록 마지막기본키
     * @returns
     */
    async getRecords(
        uuid: string,
        last_id: number | undefined,
        count: number = 10
    ): Promise<RecordsResType> {
        const { data } = await apiClient.get(`/diaries/${uuid}/records`, {
            params: {
                "last-id": last_id,
                count
            }
        });
        // console.debug("getRecords", { data, uuid });
        return data;
    },

    /**
     * 기록상세조회
     * @param diaryUuid 다이러리 아이디
     * @param recordUuid 레코드 아이디
     * @returns
     */
    async viewRecord(
        diaryUuid: string,
        recordUuid: string
    ): Promise<RecordResType> {
        const { data } = await apiClient.get(
            `/diaries/${diaryUuid}/records/${recordUuid}`
        );
        return data;
    },

    async getBlob(fileUri: string) {
        const resp = await fetch(fileUri);
        try {
            return await resp.blob();
        } catch (error) {
            console.error("getBlob error",error)
            throw error
        }
    },

    /**
     * 이미지 업로드
     * @param payload
     */
    async uploadImage(payload: UploadImageReqType) {
        const { files, uploadUrl } = payload;
        const bodyFormData = new FormData();

        console.log("uploadImage",{files, uploadUrl})

        if (files && files.length > 0) {
            try {
                const imageBody = await this.getBlob(files[0]);

                const data = await fetch(uploadUrl, {
                    method: "PUT",
                    body: imageBody
                });

                console.debug("uploadImage DEBUG :", data);
                return data;
            } catch (error) {
                console.error("uploadImage ERROR :", error);
                throw error;
            }
        }

        return null;
    },

    /**
     * 기록 이미지를 삭제한다.
     * @param diaryUuid 다이러리 uuid
     * @param recordUuid 기록 uuid
     * @param recordImageId 기록이미지 id
     */
    async deleteRecordImage(diaryUuid: string , recordUuid: string , recordImageId: number){
        try {
            const { data } = await apiClient.delete(
                `/diaries/${diaryUuid}/records/${recordUuid}/images/${recordImageId}`
            );
            return data;
        } catch (error){
            console.error("deleteRecordImage ERROR", error);
            throw error;
        }
    },


    /**
     * 업로드 이미지 주소를 조회한다.
     * @param payload
     */
    async getUploadURL(
        payload: GetUploadURLReqType
    ): Promise<GetUploadURLResType> {
        const { diaryUuid, file } = payload;
        try {
            const { data } = await apiClient.get(
                `/diaries/${diaryUuid}/record-images/${file}`
            );
            console.debug("getUploadURL DEBUG :", data);
            return data as GetUploadURLResType;
        } catch (error) {
            console.error("getUploadURL ERROR", error);
            throw error;
        }
    },

    /**
     * 기록을 저장한다
     * @param diaryUuid 다이러리 기본키
     * @param payload 입력 값
     * @returns
     */
    async createRecord(diaryUuid: string, payload: CreateRecordReqType) {
        const { data } = await apiClient.post(
            `/diaries/${diaryUuid}/records`,
            payload
        );
        return data;
    },

    /**
     * 기록을 수정한다.
     * @param diaryUuid 다이러리 아이디
     * @param recordUuid 레코드 아이디
     * @param payload 입력 값
     * @returns
     */
    async modifyRecord(
        diaryUuid: string,
        recordUuid: string,
        payload: CreateRecordReqType
    ) {
        console.debug("modifyRecord" , payload)
        const { data } = await apiClient.put(
            `/diaries/${diaryUuid}/records/${recordUuid}`,
            payload
        );
        return data;
    },

    /**
     * 기록을 삭제한다
     * @param diaryUuid 다이러리 아이디
     * @param recordUuid 레코드 아이디
     */
    async deleteRecord(diaryUuid: string, recordUuid: string): Promise<void> {
        await apiClient.delete(`/diaries/${diaryUuid}/records/${recordUuid}`);
    }
};
