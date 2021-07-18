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
    elements: DiaryResType
}

export interface DiaryResType {
    uuid: string,
    title: string,
    icon: string,
    created_date: string,
    members: Memeber[]
}

export interface CreateDiaryReqType{
    title: string,
    icon: string,
}