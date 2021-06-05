import React, { ReactElement, ReactNode } from "react";
import Navigator from "@config/navigator";
import { AppBootstrap } from "@components";

/**
 * 기본
 * @param param0 
 * @returns 
 */
 export default function App(): ReactElement {
    return (
        <AppBootstrap>
            <Navigator />
        </AppBootstrap>
    )
}