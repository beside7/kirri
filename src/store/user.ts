import { makeObservable, observable, action } from 'mobx';
import { LoginReqType } from 'src/types/user';


class UserStore {
    id = '';
    nickname = '';
    username= '';
    profileImgUrl = '';
    status= '';

    constructor() {
        makeObservable(this, {
            nickname: observable,
            id: observable,
            profileImgUrl: observable,
            login: action,
            changeProfileImg: action
        });
    }

    login = ({id, nickname, profileImgUrl}: LoginReqType) => {
        this.id = id;
        this.nickname = nickname;
        this.profileImgUrl = profileImgUrl;
    }

    changeProfileImg = (profileImgUrl:string) => {
        this.profileImgUrl = profileImgUrl;
    }


}

export default new UserStore();