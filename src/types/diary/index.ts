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
 * 기록
 */
export interface RecordsResType {
    totalCounts: number,
    page: number,
    size: number,
    totalPages: number,
    elements: RecordResType[]
}

export interface RecordResType {
    uuid: string,
    title: string,
    body: string,
    images: string[],
    createdBy: string,
    createdDate: string,
    updatedDate: string
}

export interface CreateRecordReqType {
    title: string,
    body: string,
}