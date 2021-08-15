import styled from 'styled-components/native'


export const SafeAreaView = styled.SafeAreaView({
    display: 'flex',
    backgroundColor: '#fff',
    flexDirection:'column',
    height: '100%'
})

export const Container = styled.View({
    flexGrow: 1,
    paddingHorizontal: 34,
    backgroundColor: '#fff',
})

export const SelectProfileImageWrap = styled.View({

})

export const ProfileImageContainer = styled.View({
    height: 194,
    display: 'flex',
    flexDirection: 'column',
    alignItems:"center",
    justifyContent: 'space-between',
    width: '100%',
    marginTop:54
})

export const ProfileSpeechBubbleWrap = styled.View({
    position: 'absolute',
    left: '50%',
    top: 18
})
export const ProfileSpeechBubbleWrapBg = styled.View((props:{theme: any})=>({
    backgroundColor: props.theme['110'],
    borderRadius: 10,
    width:135,
    height:55,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
}))

export const ProfileImageText = styled.Text({
    fontSize: 11,
    color: '#fff'
})

export const ProfileSpeechBubbleWrapBgTail = styled.View((props:{theme: any})=>({
    backgroundColor: "transparent",
    width:3,
    height:3,
    marginLeft:20,
    borderStyle: "solid",
    borderTopWidth: 9,
    borderRightWidth: 4,
    borderBottomWidth: 0,
    borderLeftWidth: 4,
    borderTopColor:props.theme['110'],
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",

}))

export const SelectedWarp = styled.View({
    alignItems: 'center'
})

export const ProfileImageWarp = styled.View({
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
})

export const SelectedImageContainer = styled.View({
    borderRadius: 50,
    overflow: 'hidden',
    width: 100,
    height: 100
})

export const SelectedImage = styled.Image({
    width: 100,
    height: 100
})



export const ImageWapper = styled.TouchableOpacity({
    borderRadius: 30,
    marginHorizontal: 11,
    position:'relative',
    overflow: 'hidden',
})

export const Images = styled.Image({
    width:54,
    height:54,
    resizeMode: "contain",
    
})

export const ImageLisContainer = styled.View({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between'
})


export const MakeNicknameContianer = styled.View({
    paddingTop: 70,
    flexGrow: 5,
});

export const MakeNicknameTitle = styled.Text({
    color: '#17171c',
    fontSize: 12,
    marginBottom:8
});

export const MakeNicknameInput = styled.TextInput({
    borderWidth:2,
    borderColor: '#d1d1de',
    borderRadius: 4,
    height: 40,
    paddingLeft: 12,
    paddingRight: 30
})

export const MakeNicknameInputWarp = styled.View({
    position: 'relative'
})

export const InputAddedText = styled.View({
  position: 'absolute',
  right: 12,
  height: 40,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 12,
  
});

export const ButtonContainer = styled.View({
    height: 50

})

export const BackIcon = styled.Image({
    width:24,
    height:24
})


export const SelectedCheck = styled.View((props:{ theme: any}):any=>({
    position: 'absolute',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    width: 54,
    height: 54,
    borderRadius:26,
    top:0,
    left: 0,
    borderColor: props.theme['201'],
    borderWidth: 1.5,
    backgroundColor:'#8017171c'
}))