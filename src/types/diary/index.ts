export interface Memeber {
    username: string,
    nickname: string,
    authority: string,
    status: string
}

export interface DiariesResType {
    totalCounts: number,
    page: number,
    size: number,
    totalPages: number,
    element: DiaryResType[]
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
    element: RecordResType[]
}

/**
 * 기록 내용
 */
export interface RecordResType {
    uuid: string,
    title: string,
    body: string,
    images: RecordImageInfo[],
    createdBy: number,
    createdDate: string,
    updatedDate: string
}

/**
 * 섬네일 정보
 */
export interface RecordImageInfo {
    path : string,
    name : string
}

export interface CreateRecordReqType {
    title: string,
    body: string,
    file: Blob | null
}