import React, { ReactElement, ReactNode } from 'react'
import { View, Image } from 'react-native'
import Constants from 'expo-constants';

type BackgroundProps = {
    children: ReactNode;
};

export default function Background({ children } : BackgroundProps) : ReactElement {
    return (
        <View style={{ 
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Image
                source={require("@assets/images/record/diary_overview_bgimg_color_01.png")}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: Constants.statusBarHeight,
                    bottom: 0
                }}
            />
            {children}
        </View>
    )
}
