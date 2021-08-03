import React, { ReactElement, ReactNode, useEffect } from "react";
import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";
import { updateExpoToken } from "@utils";

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
        /**
         * 서버에 expo Notification token 전송
         */
        updateExpoToken();
    }, [])

    
    /**
     * 폰트 로드
     */
    let [fontLoaded] = useFonts({
        'space-mono': require('../../../../assets/fonts/SpaceMono-Regular.ttf'),
        'Korea_hero': require('../../../../assets/fonts/Korea_hero.ttf'),
        'SpoqaHanSansNeo-Medium' : require('../../../../assets/fonts/SpoqaHanSansNeo-Medium.ttf'),
        'SpoqaHanSansNeo-Regular' : require('../../../../assets/fonts/SpoqaHanSansNeo-Regular.ttf'),
        'SpoqaHanSansNeo-Bold' : require('../../../../assets/fonts/SpoqaHanSansNeo-Bold.ttf'),
    });


    return fontLoaded ? <>{children}</> : <AppLoading />;
}
