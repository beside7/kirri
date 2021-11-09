import { userApis } from "@apis";
import { initNotifications } from "@utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "userKey";

const getUserKey = (): Promise<string | undefined> =>
    new Promise((resolve, reject): void => {
        AsyncStorage.getItem(USER_KEY, (err, userKey) => {
            if (err) {
                reject(err);
            }
            resolve(userKey);
        });
    });

/**
 * Expo Notication Token 을 서버에 갱신하는 메서드
 */
const updateExpoToken = async (): Promise<boolean> => {
    try {
        // token 획득
        const token = await initNotifications();
        // 로그인 여부 확인
        const isAuthkey = await getUserKey();
        if (isAuthkey && token) {
            /**
             * 토큰 전송
             */
            await userApis.addPushDevice(token);

            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default updateExpoToken;
