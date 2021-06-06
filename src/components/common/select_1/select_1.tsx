import React from 'react'
import {  } from 'react-native'
import {Picker} from '@react-native-picker/picker';

export default function Select_1() {
    return (
        <Picker>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
        </Picker>
    )
}
