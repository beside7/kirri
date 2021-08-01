import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const SafeAreaViewTop = styled.SafeAreaView({
    display: 'flex',
    flexDirection: 'column',
    height: 0,
    backgroundColor: '#fff',
})

export const SafeAreaViewBottom = styled.SafeAreaView({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f7f7f7',
    height: '100%'
})

export const ContentContainer = styled.ScrollView({
    backgroundColor:'#f7f7f7'
})

export const Content = styled.View({
    paddingHorizontal: 35,
    backgroundColor: '#fff',
})

export const Profile = styled(Content)({
    paddingBottom: 70,
    marginBottom: 8
}) 

export const NicknameInputWarp = styled.View({
    marginTop:70,
})

export const MakeNicknameTitle = styled.Text({
    color: '#17171c',
    fontSize: 12,
    marginBottom:8
});

export const SettingListWrap = styled.View({
    height: 60,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
})

export const SettingTitleWarp = styled.View({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
});

export const SettingIcon = styled.Image({
    width:24,
    height:24,
    resizeMode: 'contain',
    marginRight: 12
})

export const SettingTitle = styled.Text({
    fontSize: 14
})

export const VersionText = styled.Text((props:{theme: any})=>({
    fontSize: 14,
    color: props.theme['110']
}))

export const LeaveKKiriWarp = styled.TouchableOpacity({
    marginLeft: 70,
    marginTop: 12,
})

export const LeaveKKiriTitle = styled.Text((props:{theme: any})=>({
    fontSize: 14,
    textDecoration: 'underline',
    
    color: props.theme['106'],
    textDecorationColor: props.theme['106'],
}))


export const LeaveKirriPopupContent = styled.View({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

export const SignoutImage = styled.Image({
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 24
})

export const SignoutText = styled.Text((props: {theme: any})=>({
    fontSize: 14,
    color: props.theme['110']
}))