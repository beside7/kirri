import React, { ReactElement, ReactNode, useEffect } from "react";
import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";
import { initNotifications } from "@utils";

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
        initNotifications()
    }, [])

    

    let [fontLoaded] = useFonts({
        'space-mono': require('../../../../assets/fonts/SpaceMono-Regular.ttf'),
        'Korea_hero': require('../../../../assets/fonts/Korea_hero.ttf'),
        'SpoqaHanSansNeo-Medium' : require('../../../../assets/fonts/SpoqaHanSansNeo-Medium.ttf'),
        'SpoqaHanSansNeo-Regular' : require('../../../../assets/fonts/SpoqaHanSansNeo-Regular.ttf'),
    });


    return fontLoaded ? <>{children}</> : <AppLoading />;
}
