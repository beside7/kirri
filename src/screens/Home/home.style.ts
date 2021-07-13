import { globalStyles } from "@utils";
import { StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';

// const backgroundPatterns = {
//     'pattern_1': require()
// }

const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    iconSpace: {
        marginRight: 15
    }
});

export default styles;


export const HomeContainer = styled.SafeAreaView({
    backgroundColor: '#fff',
})


export const ContentWarp = styled.View({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f4f4f8',
    height: '100%'
})

const warpStyle = styled.View({
    backgroundColor: '#fff',
    paddingHorizontal: 20
})

export const ProfileWarp = styled(warpStyle)({
 
    
});

export const IconWarp = styled.View({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row'
})


export const ProfileIcon = styled.View({
    width: 68,
    height: 68,
    borderRadius: 34,
    overflow: 'hidden',
    backgroundColor: 'yellow'
})



export const NicknameContainer = styled.View({
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 13,
    paddingBottom: 36
})

export const NicknameWarp = styled.Text({
    fontSize:24
})

export const DiaryListWarp = styled(warpStyle)({
    flexGrow: 1,
    flexBasis: 1,
    marginTop: 8,
    paddingTop: 24,
    paddingBottom:20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'

})



export const RecentContentWarp = styled.View({
    height: 130
})

export const RecentContentList = styled.ScrollView({
    overflow: 'visible',
    marginTop:8
})

export const RecentContentContainer = styled.View({
    width: 150,
    height: 80,
    borderRadius: 10,
    boxShadow:'1.5px 2.5px 5px #0000002b',
    backgroundColor: '#fff',
    padding: 10
})

export const RecentContentWriter = styled.Text({
    fontSize:12,
    color: '#6f6f7e'
})


export const RecentContentTitle = styled.Text({
    marginTop:2,
    color: '#17171c',
    fontSize: 12
})

export const RecentDiaryTitleWarp = styled.View({
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    marginTop:15
})

export const RecentDiaryColor = styled.View((props: {background: string}) => ({
    width: 10,
    height: 10,
    marginRight: 4,
    backgroundColor: props.background,
    borderRadius:2
    
}))

export const RecentDiaryTitle = styled.Text({
    fontSize: 12,
    color: '#babacb'

})

export const DiaryTitle = styled.Text({
    fontSize:14,
    color: '#6f6f7e',
  
})

export const DiaryListContainer = styled.ScrollView({
    paddingTop:20,
    flexGrow: 1,
    flexBasis: 1,
})

export const DiaryList = styled.View({
    display: 'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    flexWrap: 'wrap',
    marginTop: 8
})

export const DiaryContainer = styled.View({
    width: 159,
    height: 158,
    borderRadius:12,
    display: 'flex',
    flexDirection: 'column',
    boxShadow:'1.5px 2.5px 5px #0000002b',
    marginBottom: 18
});

export const DiaryContent = styled.View({
    flexGrow: 1,
    backgroundColor:'#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

export const DiaryCover = styled.View((props: {backgroundColor: string, pattern?: string, })=>({
    backgroundColor: props.backgroundColor,
    height: 49,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
}));

export const DiaryDetailTitle = styled.Text({
    fontSize: 16,
    color: '#17171c'
});

export const DiaryBottom = styled.View({

})
export const MembersText = styled.Text({
    color: '#696969',
    fontSize: 12
})

export const RecommandCreateDiary = styled.View({
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#fff',
    flexGrow: 1,
    flexBasis: 1,
    marginTop: 8
})


export const CreateDiaryText = styled.Text({
    color: '#6f6f7e',
    fontSize: 14,
    marginTop: 7
})

export const CreateDiaryContainer = styled.TouchableOpacity({
    width: 159,
    height: 158,
    borderRadius: 10,
    borderColor: '#e2e2e2',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
})

export const CreateDiaryModalBackground = styled.View({
    backgroundColor: 'rgba(23, 23, 28, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
})

export const CreateDiary = styled.View({
    height: 558,
    backgroundColor: '#fff',
    paddingHorizontal: 34,
    paddingBottom: 38
});

export const ModalTouchable = styled.View({
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    paddingVertical: 4
});

export const TouchableIcon = styled.View({
    backgroundColor: '#d1d1de',
    borderRadius: 3,
    width:42,
    height: 6
});

export const CreateDiatyTitleWarp = styled.View({
    width:'100%',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    paddingTop: 16,
    marginBottom: 40
})

export const CreateDiaryTitle = styled.Text({
    fontSize:16,
    color: '#17171c'
})

export const CreateDiaryInputWarp = styled.View({

})

export const CreateInputTitle = styled.Text({
    fontSize: 12,
    color:'#17171c',
    marginBottom: 8
})

export const CreateDiaryCoverContainer = styled.View((props: {backgroundColor: string})=>({
    marginTop: 40,
    display: 'flex',
    flexBasis: 1,
    flexGrow: 1,
    backgroundColor: props.backgroundColor
}));

export const CreateDiaryCoverTitle = styled.Text({
    fontSize: 12,
    color: '#17171c',
})

export const CreateDiaryCoverSelectedWarp = styled.View({
    marginTop: 12,
    width: 161,
    alignSelf: 'center'
})
export const CreateDiaryCoverSelected = styled.View({
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: '#babacb',
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 30,
    paddingBottom: 20
})
export const CreateDiaryCoverColor = styled.View((props:{color: string})=>({
    backgroundColor: props.color || '#fff',
    height: 49
}))
export const CreateDiaryCoverList = styled.View({
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 18
})

export const CreateDiaryCoverContent = styled.TouchableOpacity((props:{color?: string, selected?: boolean})=>({
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: props.color || '#fff',
    borderWidth: props.selected?1.5:0,
    borderColor: '#ffdd1f'
}))

export const SelectedCheck = styled.View({
    position: 'absolute',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    width: 159,
    height: 158,
    top:0,
    left: 0
})