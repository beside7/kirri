import React, { ReactElement } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import {TermsAndConStyle as styles, AgreeAllWarp, TermsWarp, AgreeAllIcon, TermsText, TermsListWarp, TermsDetail, NextButtonWarp} from './join.style';
import {terms} from './TermList';
import {LoginButton} from '@components';


export interface TermsAndConditionsProps {
    navigation: StackNavigationProp<StackNavigatorParams, "TermsAndConditions">
}

export const TermsAndConditions = ({navigation}:TermsAndConditionsProps):ReactElement => {
    const [agrees, setAgrees] = React.useState<{[key: string]: boolean}>({});
    const agreeAll = React.useCallback(()=>{
        return !Object.keys(agrees).find(key=> !agrees[key]);
    }, [agrees]);
    const aggreeEssentail = React.useCallback(()=>{
        return !!terms.filter(term => !term.optional).find(term => agrees[term.id]===false)
    }, [agrees]);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={styles.closeIcon}><Text>X</Text></View>
                <View style={styles.titleWarp}><Text style={styles.titleText}>이용약관</Text></View>
            </View>
            <AgreeAllWarp>
                <AgreeAllIcon style={{backgroundColor:agreeAll()?'#fff':'#000'}}></AgreeAllIcon>
                <TermsText>이용약관에 모두 동의</TermsText>
            </AgreeAllWarp>
            <TermsListWarp>
                {
                    terms.map((term) => 
                        <TermsWarp>
                            <AgreeAllIcon style={{backgroundColor:agrees[term.id]?'#000':'#fff'}}
                                onPress={()=>{
                                    setAgrees({...agrees, [term.id]: !agrees[term.id] })
                                }}
                            ></AgreeAllIcon>
                            <TermsText>{term.title}</TermsText>
                            <View><Text>-></Text></View>
                            <TermsDetail>{term.details}</TermsDetail>
                        </TermsWarp>
                    )
                }
                
            </TermsListWarp>
            <NextButtonWarp>
                <LoginButton
                    style={{backgroundColor: '#000'}}
                    textStyle= {{color: '#fff'}}
                >
                    다음
                </LoginButton>

            </NextButtonWarp>
        </SafeAreaView>
    )
}

