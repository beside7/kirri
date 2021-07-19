import React, { ReactElement, ReactNode } from "react";
import Navigator from "@config/navigator";
import { AppBootstrap } from "@components";
import { Provider as PaperProvider } from 'react-native-paper';

/**
 * 기본
 * @param param0 
 * @returns 
 */
 export default function App(): ReactElement {
    return (
        <PaperProvider>
            <AppBootstrap>
                <Navigator />
            </AppBootstrap>
        </PaperProvider>
    )
}