import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";


const initNotifications = async (): Promise<string | null> => {
    if (Constants.isDevice) {
        /**
         * 푸쉬 알람 권한 부여 확인
        */
        const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        /**
         * 만약 권한이 없다고 하면 기기로 권한 요청 전송
         */
         if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        /**
         * 권한을 요청해도 승인이 없을경우 중단
         */
        if (finalStatus !== "granted") {
            return null;
        }

        /**
         * Expo token 발급
         */
        const tokenRes = await Notifications.getExpoPushTokenAsync();
        console.log(tokenRes);

        const { data } = tokenRes
        
        /**
         * 여기에 토큰값 전송
         */

        /**
         * 만약 안드로이드일경우 별도의 채널을 생성
         * https://docs.expo.io/versions/latest/sdk/notifications/#notificationchannelinput
         */
        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX
            });
        }
        return data;
    } else {
        return null;
    }
}

export default initNotifications;
