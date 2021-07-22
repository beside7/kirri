import styled from "styled-components/native";


export const Container = styled.View`
    width: 219;
    height: 249;
    background-color: #fff;
    border-radius: 10;
`

export const HeaderImage = styled.Image`
    
`
export const Content = styled.View`
    padding-top: 24;
    padding-left: 28;
    padding-right: 28;
    padding-bottom: 20;
`

export const Footer = styled.View`
    margin-top: 55;
    justify-content: flex-end;
`

export const Title = styled.Text`
    text-align: center;
    font-size: 20;
    font-family: "SpoqaHanSansNeo-Medium";
`

export const Author = styled.Text`
    color: #6f6f7e;
    font-family: 'SpoqaHanSansNeo-Regular';
    font-size: 12;
`

export const Button = styled.TouchableOpacity`
    width: 220;
    height: 50;
    align-items: center;
    justify-content: center;
    background-color: #ffdd1f;
    flex-direction: row;
    border-radius: 10;
    margin-top: 40;
`

export const Icon = styled.Image`
    width: 24;
    height: 24;
    margin-right: 4;
`

export const ButtonText = styled.Text`
    font-size: 14;
    font-family: 'SpoqaHanSansNeo-Medium';
    color: #17171c;
`