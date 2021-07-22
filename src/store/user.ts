import { makeObservable, observable, action } from 'mobx';
import { LoginReqType } from 'src/types/user';
import { getProfileImage, ProfileImageTypes } from '@utils';


class UserStore {
    id = '';
    nickname = '';
    username= '';
    profileImage: any = undefined;
    status= '';
    profileImageUrl: string[] = [];

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
        this.changeProfileImg(profileImgUrl);
       
    }

    changeProfileImg = (profileImgUrl:string) => {
        const image = profileImgUrl?profileImgUrl.split(':'):['profile','01'];
        this.profileImage = (image[0] === 'profile')?getProfileImage(image[1] as ProfileImageTypes):getProfileImage('01');
        this.profileImageUrl = image;
    }

    setNickname = (nickname: string) => {
        this.nickname = nickname;
    }
}

export default new UserStore();