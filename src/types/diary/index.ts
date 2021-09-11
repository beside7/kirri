export interface Memeber {
    userId: number | null;
    nickname: string | null;
    /**
     * INVITING :초대중
     * ACTIVE : 초대 승락
     * null: 초대안함 (프론트엔드에서 추가됨)
     */
    status: "INVITING" | "ACTIVE" | null;
    authority: "DIARY_MEMBER" | "DIARY_OWNER" | null;
    profileImagePath: string;
    memberId: number | null;
}

export interface DiariesResType {
    totalCounts: number,
    page: number,
    size: number,
    totalPages: number,
    elements: DiaryResType[]
}

export interface DiaryResType {
    uuid: string,
    title: string,
    icon: string,
    createdDate: string,
    members: Memeber[]
}

export interface CreateDiaryReqType{
    title: string,
    icon: string,
}

/**
 * 기록 정보
 */
export interface RecordsResType {
    totalCounts: number,
    page: number,
    size: number,
    totalPages: number,
    elements: RecordResType[]
}

/**
 * 기록 내용
 */
export interface RecordResType {
    uuid: string,
    title: string,
    body: string,
    images: RecordImageInfo[],
    createdByNickname: string,
    createdBy: number,
    createdDate: string,
    updatedDate: string,
    id: number
}

/**
 * 섬네일 정보
 */
export interface RecordImageInfo {
    path : string,
}

export interface CreateRecordReqType {
    title: string,
    body: string,
    // file: Blob | null
    files: string[] | null
}