import { makeObservable, observable, action } from "mobx";
import { LoginReqType, PushReqType } from "src/types/user";
import { getProfileImage, ProfileImageTypes } from "@utils";
import { userApis } from "@apis";

class UserStore {
    id = "";
    nickname = "";
    username = "";
    profileImage: any = undefined;
    status = "";
    profileImagePath: string[] = [];
    pushSettings: PushReqType[] = [];
    pushStatus: boolean = false;
    autoLogin: boolean = false;
    newPushReceived: boolean = false;
    newMessage: boolean = false;

    constructor() {
        makeObservable(this, {
            nickname: observable,
            id: observable,
            profileImage: observable,
            profileImagePath: observable,
            pushSettings: observable,
            pushStatus: observable,
            autoLogin: observable,
            newMessage: observable,
            login: action,
            changeProfileImg: action,
            setNickname: action,
            logout: action,
            setUser: action,
            setNewMessage: action
        });
    }

    login = async () => {
        try {
            const user = await userApis.userMe();
            this.setUser(user);
        } catch (error) {
            throw new Error("Login Fail");
        }
    };

    setUser = ({
        id,
        nickname,
        profileImagePath,
        pushSettings,
        status,
        autoLogin
    }: LoginReqType) => {
        this.id = id;
        this.nickname = nickname;
        this.changeProfileImg(profileImagePath);
        this.pushSettings = pushSettings;
        this.pushStatus = pushSettings.reduce<boolean>(
            (prev, curr) => curr.active,
            true
        );
        this.status = status;
        this.autoLogin = autoLogin;
    };

    logout = () => {
        this.id = "";
        this.nickname = "";
        this.username = "";
        this.profileImage = undefined;
        this.status = "";
        this.profileImagePath = [];
    };

    changeProfileImg = (profileImgPath: string) => {
        const image = profileImgPath
            ? profileImgPath.split(":")
            : ["profile", "01"];
        this.profileImage =
            image[0] === "profile"
                ? getProfileImage(image[1] as ProfileImageTypes)
                : getProfileImage("01");
        this.profileImagePath = image;
    };

    setNickname = (nickname: string) => {
        this.nickname = nickname;
    };

    setNewMessage = (checked: boolean) => {
        this.newMessage = checked;
    };
}

export default new UserStore();
