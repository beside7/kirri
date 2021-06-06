import React from 'react'
import { View,  ViewStyle } from 'react-native'
import {Picker,} from '@react-native-picker/picker';;

import styles from './select_1.style'

type Select_1Props = {
    style? : ViewStyle
}

export default function Select_1({ style } : Select_1Props) {
    return (
        <View style={[styles.selectWrap, style]}>
            <Picker style={styles.select} itemStyle={styles.selectItem}>
                <Picker.Item label="다이러리를 선택해줘 :D" value="" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
        </View>
    )
}
