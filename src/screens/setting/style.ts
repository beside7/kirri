import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;
`

export const ProfileContainer = styled.View`
    height: 441;
    border-bottom-width: 8;
    border-color: #f7f7f7;
    align-items: center;
    padding-top: 40;
`

export const ProfileImage = styled.Image`
    width: 100;
    height: 100;
`

export const SelectProfileContainer = styled.View`
    flex-direction: row;
    margin-top: 40;
    align-items: center;
`

export const SelectProfileImage = styled.Image`
    width: 54;
    height: 54;
    margin-right: 19;
    margin-left: 19;
`

export const Description = styled.Text`
    margin-top: 70;
    color: #17171c;
    font-size: 12;
    font-family: 'SpoqaHanSansNeo-Medium';
`

export const TextInput = styled.TextInput`
    padding-left: 12;
    margin-top: 8;
    margin-bottom: 60;
    border-width: 1.5;
    border-color: #d1d1de;
    width: 307;
    height: 40;
    border-radius: 10;
`

export const Placeholder = styled.Text`
    position: absolute;
    top: 20;
    right: 18;
    font-size: 12;
    color: #6f6f7e;
`

export const SettingContainer = styled.View`
`

export const SettingColumn = styled.View`
    /* width: 375; */
    height: 60;
    flex-direction: row;
    padding-left: 34;
    padding-right: 34;
    align-self: center;
`

export const SettingColumnTitle = styled.Text`
    width: 259;
    height: 60;
    text-align: left;
    padding-left: 12;
    padding-top: 21;
    padding-bottom: 21;
    font-size: 14;
    font-family: 'SpoqaHanSansNeo-Medium';
    color: #17171c;
`

export const Icon = styled.Image`
    width: 24;
    height: 24;
`

export const SwitchContainer = styled.View`
    width: 50;
    justify-content: center;
    height: 60;
`

export const WithdrawalContainer = styled.View`
    height: 100;
    background-color: #f7f7f7;
    padding-left: 70;
    padding-right: 70;
    padding-top: 12;
`

export const WithdrawalText = styled.Text`
    color: #6f6f7e;
    text-decoration: underline;
    font-family: 'SpoqaHanSansNeo-Regular';
    font-size: 14;
`