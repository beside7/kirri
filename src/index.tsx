import React, { ReactElement, ReactNode } from "react";
import { AppBootstrap } from "./components";
import Navigator from "@config/navigator";

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