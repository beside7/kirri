import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import Navigator from "@config/navigator";
import { AppBootstrap, PushMessageProvider } from "@components";
import * as Font from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from "styled-components/native";
import { theme } from "./utils/styleTheme";

/**
 * 기본
 * @param param0 
 * @returns 
 */


 export default function App(): ReactElement {
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