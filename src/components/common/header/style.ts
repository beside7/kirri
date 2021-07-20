import styled from 'styled-components/native'
import Constants from 'expo-constants';

export const HeaderContaner = styled.View`
    border-bottom-width: 1;
    border-color: #d1d1de;
    padding-top: ${Constants.statusBarHeight};
`
export const Empty = styled.View`
    height: 45
`
export const Content = styled.View`
    height: 62;
    flex-direction: row
`
export const Side = styled.View`
    width : 20% ;
    justify-content: center;
    align-items: center 
`

export const Center = styled.View`
    width : 60% ;
    justify-content: center;
    align-items: center 
`