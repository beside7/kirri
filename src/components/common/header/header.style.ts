import styled from 'styled-components/native';
import Constants from 'expo-constants';


export const HeaderContainer = styled.View({
    paddingTop:17,
    paddingBottom: 24,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor:'rgba(41, 0, 0, 0.1)',
    borderBottomWidth:  1,
    backgroundColor: '#fff',
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