export interface LoginReqType {
    id: string,
    nickname: string,
    accessToken: string,
    profileImgUrl: string
}

export interface JoinReqType{
    id: string,
    password: string,
    nickname: string
}
