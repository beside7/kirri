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

export const ActionSheetContainer = styled.View`
    height: 686;
    padding-top: 30;
    padding-left: 34;
    padding-right: 34;
`

export const ProfileContainer = styled.View`
    flex-direction: row;
`

export const ProfileImage = styled.Image`
    width: 70;
    height: 70;
`

export const TitleContainer = styled.View`
    margin-left: 12;
`

export const Title = styled.Text`
    width: 225;
    font-size: 16;
    color: #17171c;
    font-family: 'SpoqaHanSansNeo-Medium';
`
export const SubTitle = styled.Text`
    width: 238;
    font-size: 12;
    color: #babacb;
    margin-top: 4;    
    font-family: 'SpoqaHanSansNeo-Regular';
`

export const ChreerupContainer = styled.View`
    margin-top: 33;
    flex-direction: row;
    flex-wrap: wrap;
`

export const Chreerup = styled.TouchableOpacity`
    width: 45.5%;
    height: 160;
    margin-top: 7;
    margin-bottom: 7;
    margin-left: 7;
    margin-right: 7;
    align-items: center;
    justify-content: center;
    border-width: 1;
    border-color: #e1e1eb;
    border-radius: 10;
`

export const ChreerupImage = styled.Image`
    width: 70;
    height: 70;
    margin-bottom: 15;
`

export const ChreerupMessage = styled.Text`
    color: #17171c;
    font-size: 12;
    font-family: 'SpoqaHanSansNeo-Regular';
`