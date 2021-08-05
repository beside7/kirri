export interface LoginReqType {
    id: string,
    nickname: string,
    accessToken: string,
    profileImagePath: string
}

export interface JoinReqType{
    nickname: string,
    autoLogin: boolean,
    profileImagePath: string,
    agreementList: string[]
}

export interface RecentRecodeType{
    diaryTitle: string,
    diaryIcon: string,
    recordTitle: string,
    recordCreatedBy: string,
    recordCreatedDate: string
}

export interface RecentRecordResType {
    totalCounts: number,
    elements: RecentRecodeType[]
}

export interface UpdateUserMeResType {
    nickname?: string,
    profileImagePath?: string
}

export interface PushUpdateResType {
    type:string,
    active: boolean
}

export interface TermsResType {
    id: number,
    type: string,
    url: string
}