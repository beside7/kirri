import React, { ReactElement, ReactNode, useEffect } from "react";
import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

type AppBootstrapProps = {
    children: ReactNode;
};


/**
 * 폰트 로드 확인용
 * @param param0 
 * @returns 
 */
export default function AppBootstrap({ children }: AppBootstrapProps): ReactElement {

    useEffect(() => {
        registerForPushNotification().then(token => console.log(token));
    }, [])

    async function registerForPushNotification() {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            // finalStatus = status;
        }
        if (status !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        return token
    }

    let [fontLoaded] = useFonts({
        'space-mono': require('../../../../assets/fonts/SpaceMono-Regular.ttf'),
        'Korea_hero': require('../../../../assets/fonts/Korea_hero.ttf'),
    });


    return fontLoaded ? <>{children}</> : <AppLoading />;
}
