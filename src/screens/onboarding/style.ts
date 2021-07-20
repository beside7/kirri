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
    margin-bottom: 20;
`

export const OnboardingText = styled.Text`
    font-family: 'SpoqaHanSansNeo-Regular';
    font-size: 16;
    color: #17171c;
`

export const ButtonContainer = styled.View`
    margin-top: 132;
`

export const ButtonImage = styled.Image`
    width: 335;
    height: 56;
    margin-bottom: 8;
`