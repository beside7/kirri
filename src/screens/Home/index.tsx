import React, {ReactElement, useCallback} from 'react'
import { View } from 'react-native'

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from './home.style';

import { Button_1 as KakaoLoginButton, Text, Background } from "@components";

import {observer} from 'mobx-react';
import UserStore from '@mobx-store/user';


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


const Home = observer(({navigation}:HomeProps)=> {
    return (
        <Background>
            <View style={styles.container}>
            
            </View>
        </Background>
    )
})

export default Home;