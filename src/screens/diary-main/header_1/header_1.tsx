import React from 'react'
import { View , Image } from 'react-native'
import styles from './header_1.style'
import { Text_2 } from "@components";

export default function Header_1() {
    return (
        <View style={{ borderBottomWidth: 1, borderColor: "#d1d1de"}}>
            <View style={{ height: 44 }}>
                
            </View>
            <View style={{ height: 62, flexDirection: "row" }}>
                <View style={{width : "20%" , justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{ width: 24, height: 24 }}
                        source={require("@assets/icons/back.png")} 
                    />
                </View>
                <View style={{width : "60%", justifyContent: "center", alignItems: "center"  }}>
                    <Text_2>
                        처음 우리들의 끼리 다이러리
                    </Text_2>
                </View>
                <View style={{width : "20%", justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{ width: 24, height: 24 }}
                        source={require("@assets/icons/menu.png")} 
                    />
                </View>
            </View>
        </View>
    )
}
