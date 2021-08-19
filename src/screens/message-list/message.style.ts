import styled from 'styled-components/native';
import {Button as CommonButton} from '@components';

export const Container = styled.View({
    height: 100,
    paddingTop: 8,
    paddingBottom: 10,
    display: 'flex',
    flexDirection:'row',
});

export const ImageWrap = styled.View({
    marginRight: 12,

})

export const Image = styled.Image({
    width: 24,
    height: 24,
    resizeMode: 'contain'
})

export const ContentWrap = styled.View({
    flexBasis: 1,
    flexGrow: 1,
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'space-between'
})

export const ContentText = styled.Text((props:{theme:any})=>({
    fontSize: 14,
    marginBottom: 15,
    color: props.theme['110'],
    fontFamily: 'SpoqaHanSansNeo-Regular'
}))

export const ContentTextBold = styled.Text({
    fontWeight: 'bold',
    fontFamily: 'SpoqaHanSansNeo-Medium'
})

export const InfoWrap = styled.View({
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'flex-end'
})

export const ButtonWrap = styled.View({
    display:'flex',
    flexDirection: 'row'
})

export const TimeText = styled.Text((props:{theme:any})=>({
    fontSize: 12,
    color: props.theme['104'],
    fontFamily: 'SpoqaHanSansNeo-Regular'
}))

// export const Button = styled(CommonButton)({
//     marginLeft: 8
// })

export const ButtonPadding = styled.View({
    width: 8
})