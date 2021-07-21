import styled from 'styled-components/native';
import Constants from 'expo-constants';


export const HeaderContainer = styled.View({
    paddingTop: 27 + Constants.statusBarHeight,
    paddingBottom: 24,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor:'#29000000',
    borderBottomWidth:  1
});

export const IconWrap = styled.TouchableOpacity({
    width:24,
    height: 24,
})

export const Icon = styled.Image({
    width:24,
    height: 24,
    resizeMode: 'contain'
})

export const Title = styled.Text({
    fontSize: 16
})