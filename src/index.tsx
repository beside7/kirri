import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import Navigator from "@config/navigator";
import { AppBootstrap, PushMessageProvider } from "@components";
import * as Font from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from "styled-components/native";
import { theme } from "./utils/styleTheme";

import {setCustomText} from 'react-native-global-props';
import { JoinProcessing } from "./screens/nickname";


/**
 * 기본
 * @param param0 
 * @returns 
 */


 export default function App(): ReactElement {
    const [loadFont, setLoadFont] = useState(true);
    const getFont = () => {
        Font.loadAsync({
            'SpoqaHanSansNeo':require('@assets/fonts/SpoqaHanSansNeo-Regular.ttf'),
            'SpoqaHanSansNeo-Bold':require('@assets/fonts/SpoqaHanSansNeo-Bold.ttf'),
        }).then(()=>{
            const customTextProps = {
                style: {
                  fontFamily: 'SpoqaHanSansNeo',
                  fontSize: 11
                }
              };
            setCustomText(customTextProps);
            setLoadFont(false);
        }).catch((err)=>{
            console.log(err)
        })

        
    }

    useEffect(()=>{
        getFont();
    },[])
    if (loadFont) {
        <JoinProcessing open={true}/>
    }
    return (
        <PaperProvider>
            <AppBootstrap>
                <ThemeProvider
                    theme={theme}
                >
                    <PushMessageProvider>
                        <Navigator />
                    </PushMessageProvider>
                </ThemeProvider>
            </AppBootstrap>
        </PaperProvider>
    )
}