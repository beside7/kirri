export interface LoginReqType {
    id: string,
    nickname: string,
    accessToken: string,
    profileImgUrl: string
}

export interface JoinReqType{
    nickname: string,
    autoLogin: boolean,
    profileImagePath: string,
    agreementList: string[]
}
