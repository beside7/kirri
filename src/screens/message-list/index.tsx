import React from 'react'
import { Background, Header } from "@components";
import AppNavigator from "./tab-navigator";

export default function MessageList() {
    return (
        <Background>
            <Header
                title="알림"
                rightIcon={null}
            />
            <AppNavigator />
        </Background>
    )
}
