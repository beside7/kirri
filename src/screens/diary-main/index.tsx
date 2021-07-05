import React from 'react'
import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import Header_1 from './header_1/header_1'
import { Background, Text_2  } from "@components";

import styles from './style'

export default function index() {
    return (
        <Background>
            <Header_1 />
            <View>

            </View>
            <View style={styles.bottomTab}>
                <View>
                    <Text_2 bold="Regular" style={{ color : "#bebece" , fontSize: 12 }}>
                        오늘의 너를 기억할께
                    </Text_2>
                </View>
                <TouchableOpacity 
                    style={styles.editButton}
                    
                    >
                    <Image 
                        source={require("@assets/icons/edit.png")}
                        style={{ width: 114, height: 114 }}
                    />
                </TouchableOpacity>
            </View>
        </Background>
    )
}
