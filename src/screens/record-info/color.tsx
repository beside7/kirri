import React from 'react'
import { View, Text } from 'react-native'

type ColorType = {
    color : string
}

export default function Color({color} : ColorType) {
    return (
        <View
            style={{
                width: 219,
                height: 90,
                borderRadius: 10,
                backgroundColor: color
            }}
        />
    )
}
