import styled from "styled-components/native";

export const TextInput = styled.TextInput`
    border-color: #d1d1de;
    border-width: 1;
    border-radius: 5;
    height: 40;
    padding-top: 11;
    padding-bottom: 11;
    padding-left: 12;
    padding-right: 12;
`

export const Icon = styled.Image({
    width: 24,
    height: 24,
})

export const Button = styled.TouchableOpacity`
    position: absolute;
    top: 8;
    right: 8;
`