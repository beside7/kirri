import styled, {css} from 'styled-components/native';


export const TitleContainer = styled.View({
    display: 'flex',
    height: 32,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between'
});

export const IconWarp = styled.View({
    width: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

export const TitleText = styled.Text({
    textAlign:'center',
    fontSize: 16,
})