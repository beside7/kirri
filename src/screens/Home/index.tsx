import React, { ReactElement, useCallback } from 'react'
import { View } from 'react-native'

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from './home.style';

import { Button_1 as KakaoLoginButton, Text_2, Background } from "@components";

import { observer } from 'mobx-react';
import { UserStore } from '@store';


type HomeProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};

// export default function _Home({ navigation }: HomeProps): ReactElement {
//     return (
//         <Background>
//             <View style={styles.container}>

//             </View>
//         </Background>
//     )
// }


const Home = observer(({ navigation }: HomeProps) => {
    return (
        <Background>
            <View style={styles.container}>
                <Text_2>{JSON.stringify(UserStore)}</Text_2>
            </View>
        </Background>
    )
})

export default Home;