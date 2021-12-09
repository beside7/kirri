import React, { ReactElement, useEffect } from "react";
import Navigator from "@config/navigator";
import { AppBootstrap, PushMessageProvider } from "@components";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./utils/styleTheme";
import * as SplashScreen from "expo-splash-screen";
/**
 * 기본
 * @param param0
 * @returns
 */

export default function App(): ReactElement {
    useEffect(() => {
        setTimeout(() => SplashScreen.hideAsync(), 2000);
    }, []);
    return (
        <PaperProvider>
            <AppBootstrap>
                <ThemeProvider theme={theme}>
                    <PushMessageProvider>
                        <Navigator />
                    </PushMessageProvider>
                </ThemeProvider>
            </AppBootstrap>
        </PaperProvider>
    );
}
