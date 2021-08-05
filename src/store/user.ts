import { makeObservable, observable, action } from 'mobx';
import { LoginReqType } from 'src/types/user';
import { getProfileImage, ProfileImageTypes } from '@utils';


class UserStore {
    id = '';
    nickname = '';
    username= '';
    profileImage: any = undefined;
    status= '';
    profileImagePath: string[] = [];

    constructor() {
        makeObservable(this, {
            nickname: observable,
            id: observable,
            profileImage: observable,
            profileImagePath: observable,
            login: action,
            changeProfileImg: action,
            setNickname: action,
            logout: action
        });
    }

    login = ({id, nickname, profileImagePath}: LoginReqType) => {
        this.id = id;
        this.nickname = nickname;
        this.changeProfileImg(profileImagePath);
       
    }

    logout = () => {
        this.id = '';
        this.nickname = '';
        this.username= '';
        this.profileImage = undefined;
        this.status= '';
        this.profileImagePath = [];
    }

    changeProfileImg = (profileImgPath:string) => {
        const image = profileImgPath?profileImgPath.split(':'):['profile','01'];
        this.profileImage = (image[0] === 'profile')?getProfileImage(image[1] as ProfileImageTypes):getProfileImage('01');
        this.profileImagePath = image;
    }

    setNickname = (nickname: string) => {
        this.nickname = nickname;
    }
}

export default new UserStore();