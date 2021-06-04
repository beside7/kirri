import React, { ReactElement, ReactNode } from "react";
import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";

type AppBootstrapProps = {
    children: ReactNode;
};


/**
 * 폰트 로드 확인용
 * @param param0 
 * @returns 
 */
export default function AppBootstrap({ children } : AppBootstrapProps): ReactElement {

    let [fontLoaded] = useFonts({
        'space-mono': require('../../../assets/fonts/SpaceMono-Regular.ttf'),
        'Korea_hero': require('../../../assets/fonts/Korea_hero.ttf'),
    });
    

    return fontLoaded ? <>{children}</> : <AppLoading />;
}
