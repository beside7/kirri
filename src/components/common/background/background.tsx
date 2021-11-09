import React, { ReactElement } from "react";
import { SafeAreaView } from "react-native";

type BackgroundProps = {
    children: ReactElement | ReactElement[];
};

export default function Background({ children }: BackgroundProps) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            {children}
        </SafeAreaView>
    );
}
