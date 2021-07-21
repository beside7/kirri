import styled from 'styled-components/native'

export const Warp = styled.View({
    marginTop: 75,
    display: 'flex',
    alignItems: 'center'
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