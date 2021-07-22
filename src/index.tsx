import React, { ReactElement, ReactNode } from "react";
import Navigator from "@config/navigator";
import { AppBootstrap } from "@components";

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
                    <Navigator />
                </ThemeProvider>
            </AppBootstrap>
        </PaperProvider>
    )
}