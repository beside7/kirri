import { makeObservable, observable, action } from 'mobx';
import { LoginReqType } from 'src/types/user';


class UserStore {
    id = '';
    nickname = '';
    username= '';
    accessToken = '';
    profileImgUrl = '';
    status= '';

    constructor() {
        makeObservable(this, {
            nickname: observable,
            id: observable,
            profileImgUrl: observable,
            accessToken: observable,
            login: action,
            changeProfileImg: action
        });
    }

    login = ({id, nickname, accessToken, profileImgUrl}: LoginReqType) => {
        this.id = id;
        this.nickname = nickname;
        this.accessToken = accessToken;
        this.profileImgUrl = profileImgUrl;
    }

    changeProfileImg = (profileImgUrl:string) => {
        this.profileImgUrl = profileImgUrl;
    }


}

export default new UserStore();