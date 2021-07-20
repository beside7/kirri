import styled from "styled-components/native";
import Constants from 'expo-constants';

export const Container = styled.View`
    justify-content: flex-start;
    align-items: center;
    padding-top: ${Constants.statusBarHeight};
    flex: 1;
    background-color: #fff;
    
`

export const OnboardingContainer = styled.View`
    width: 315;
    height: 340;
    margin-top: 99;
`

export const OnboardItem = styled.View`
    align-items: center;
`

export const OnboardingImage = styled.Image`
    height: 240;
    width: 315;
`

export const OnboardingText = styled.Text`

`