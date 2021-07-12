import React from 'react'
import { View, Image } from 'react-native'
import { Text_2 } from "@components";
import styled from 'styled-components/native';


export default function Header_1() {
    return (
        <View style={{ borderBottomWidth: 0, borderColor: "#d1d1de" }}>
            <View style={{ height: 44 }}>
            </View>
            <View style={{ height: 62, flexDirection: "row" }}>
                <View style={{ width: "20%", justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{ width: 24, height: 24 }}
                        source={require("@assets/icons/back.png")}
                    />
                </View>
                <View style={{ width: "60%", justifyContent: "center", alignItems: "center" }}>
                    <Text_2>
                        친구 관리
                    </Text_2>
                </View>

            </View>
        </View>
    )
}
