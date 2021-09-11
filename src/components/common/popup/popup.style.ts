import styled from 'styled-components/native';

export const Background = styled.Modal({
    backgroundColor: '#fff'
})

export const BackgroundArea = styled.SafeAreaView({
    backgroundColor: '#17171c30',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    width: '100%',
    height: '100%'
})

export const Container = styled.View((props:{theme: any, width: string|number|undefined, height:string|number|undefined}) => ({
    borderRadius: 10,
    overflow: 'hidden',
    maxWidth: '90%',
    maxHeight: '90%',
    paddingTop: 40,
    backgroundColor: props.theme['100'],
    boxShadow:'1.5px 2.5px 5px #0000002b',
    display: 'flex',
    width: props.width?props.width:300,
    height: props.height?props.height:'auto',
}))

export const HeaderWarp = styled.View({
    paddingHorizontal: 20,
})

export const StyledHeaderIcon = styled.Image({
    width: 24
})

const StyledText = styled.Text({
    textAlign: "center",
    color: `${(props:{theme: any}) => props.theme['110']}`,
    fontFamily: 'SpoqaHanSansNeo-Regular'
});

export const IconWithTitle = styled(StyledText)((props:{theme: any}) => ({
    fontSize: 14,
}));

export const Title = styled(StyledText)((props:{theme: any}) => ({
    fontSize: 16,
}));

export const ContentText = styled(StyledText)((props:{theme: any}) => ({
    fontSize: 14,
    paddingHorizontal: 20,
}));

export const Content = styled.View({
    marginBottom: 40,
    marginTop:24
})

export const ButtonContainer = styled.View({
    alignSelf:'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 50,
})

export const PopupButton = styled.TouchableOpacity((props:{attr: string, theme:any, border: boolean})=>({
    flexGrow: 1,
    flexBasis: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.attr==='cancel'? props.theme['100']: props.theme['201'],
    borderTopWidth: props.border? 1: 0,
    borderRightWidth: props.attr==='cancel'? 1: 0,
    borderColor: '#e4e4ef'
}))

export const ButtonText = styled.Text({
    fontSize:14,
    fontFamily: 'SpoqaHanSansNeo-Regular'
})

export const CancelButtonText = styled(ButtonText)((props:{ theme:any}) => ({
    color: props.theme['106'],
    fontFamily: 'SpoqaHanSansNeo-Regular'
}))