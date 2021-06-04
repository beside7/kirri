import React, {ReactElement} from 'react'
import { View, Text } from 'react-native'

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";

type HomeProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
    return (
        <View>
            <Text></Text>
        </View>
    )
}
