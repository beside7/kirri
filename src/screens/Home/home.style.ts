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

export const DiaryList = styled.View({
    paddingTop:20,
    flexGrow: 1,
    flexBasis: 1,
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

export const DiaryListContainer = styled.View({

})

export const DiaryContainer = styled.View({
    width: 159,
    height: 158,
    borderRadius:12,
    overflow: 'hidden'
});

export const DiaryCover = styled.View((props: {backgroundColor: string, pattern?: string, })=>({
    backgroundColor: props.backgroundColor,
    // backgroundImage: props.pattern?url(),


}))