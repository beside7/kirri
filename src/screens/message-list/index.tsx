import React from 'react'
import { Background } from "@components";
import AppNavigator from "./tab-navigator";
import Header_1 from './header_1/header_1'

export default function MessageList() {
    return (
        <Background>
            <Header_1 />
            <AppNavigator />
        </Background>
    )
}
