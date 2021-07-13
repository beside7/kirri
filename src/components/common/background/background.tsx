import React, { ReactElement, ReactNode } from "react";
import { View, SafeAreaView} from "react-native";
import { StatusBar } from "expo-status-bar";

type BackgroundProps = {
    children: ReactNode;
};

export default function Background({ children }: BackgroundProps): ReactElement {
    return (
<<<<<<< HEAD
        <View style={{ flex: 1 , backgroundColor: "#fff"}}>
            <StatusBar style="dark" />
=======
        <SafeAreaView style={{ flex: 1 , backgroundColor: "#fff"}}>
            {/* <StatusBar style="light" /> */}
>>>>>>> develop
            {children}
        </SafeAreaView>
    );
}
