import React, { ReactElement, ReactNode } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

type BackgroundProps = {
    children: ReactNode;
};

export default function Background({ children }: BackgroundProps): ReactElement {
    return (
        <View style={{ flex: 1 , backgroundColor: "#fff"}}>
            <StatusBar style="light" />
            {children}
        </View>
    );
}
