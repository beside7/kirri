import styled from 'styled-components/native'

export const Container = styled.View``

export const BackgroundImage = styled.Image`
    width: 100;
    height: 100;
    position: absolute;
    top: 48;
`

export const SpeechBubble = styled.Text`
    width: 152;
    height: 53;
    position: absolute;
    top: 40;
    left: 100;
    color: #fff;
    background-color: #17171c;
    padding-top: 13;
    padding-bottom: 12;
    font-size: 11;
    padding-left: 12;
    padding-right: 12;
    font-family: "SpoqaHanSansNeo-Regular";
    border-radius: 13;
`
export const SpeechBubble2 = styled.View`
    width: 0;
    height: 0;
    background-color: transparent;
    border-style: solid;
    border-top-width: 9;
    border-right-width: 15;
    border-bottom-width: 9;
    border-left-width: 0;
    border-top-color: transparent;
    border-right-color: #17171c;
    border-bottom-color: transparent;
    border-left-color: transparent;
    position: absolute;
    top: 60;
    left: 85;
`

export const FriendList = styled.FlatList`
    margin-top: 160;
    padding-left: 40;
    padding-right: 40;
`

export const ListItem = styled.TouchableOpacity`
    margin-right: 44;
    margin-top: 44;
`

export const ListItemImage = styled.Image`
    width: 70;
    height: 70;
`

export const ListItemTitle = styled.Text`
    margin-top: 8;
    font-family: "SpoqaHanSansNeo-Regular";
    text-align: center;
    font-size: 12;
    color: #17171c;
`