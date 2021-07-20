import { makeObservable, observable, action } from 'mobx';
import { LoginReqType } from 'src/types/user';
import { getProfileImage, ProfileImageTypes } from '@utils';


class UserStore {
    id = '';
    nickname = '';
    username= '';
    profileImage: any = undefined;
    status= '';

    constructor() {
        makeObservable(this, {
            nickname: observable,
            id: observable,
            profileImage: observable,
            login: action,
            changeProfileImg: action
        });
    }

    login = ({id, nickname, profileImgUrl}: LoginReqType) => {
        this.id = id;
        this.nickname = nickname;
        const image = profileImgUrl?profileImgUrl.split(':'):['',''];
        this.profileImage = (image[0] === 'profile')?getProfileImage(image[1] as ProfileImageTypes):getProfileImage('01');
       
    }

    changeProfileImg = (profileImgUrl:string) => {
        this.profileImage = profileImgUrl;
    }


}

export default new UserStore();