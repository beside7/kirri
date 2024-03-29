import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { Platform } from "react-native";

import { gridWidth } from "./types";

// const backgroundPatterns = {
//     'pattern_1': require()
// }

const styles = StyleSheet.create({
    iconSpace: {
        marginRight: 15
    }
});

export default styles;

export const HomeContainer = styled.SafeAreaView({
    backgroundColor: "#fff",
    flex: 1
});

export const ContentWarp = styled.View({
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f4f4f8",
    height: "100%"
});

const warpStyle = styled.View({
    backgroundColor: "#fff",
    paddingHorizontal: 20
});

export const ProfileWarp = styled(warpStyle)({
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight + 10 : 0
});

export const IconWarp = styled.View({
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row"
});

export const ProfileImageWarp = styled.View({
    width: 68,
    height: 68,
    borderRadius: 34,
    overflow: "hidden"
});

export const ProfileImage = styled.Image({
    width: 68,
    height: 68,
    resizeMode: "contain"
});

export const NicknameContainer = styled.View({
    display: "flex",
    flexDirection: "row",
    paddingTop: 13,
    paddingBottom: 36
});

export const Nickname = styled.Text({
    fontSize: 24,
    fontFamily: "SpoqaHanSansNeo-Medium"
});

export const DiaryListWarp = styled(warpStyle)({
    flexGrow: 1,
    flexBasis: 1,
    marginTop: 8,
    // paddingTop: 24,
    // paddingBottom: 20,
    display: "flex",
    flexDirection: "column"
    // borderWidth: 1,
    // borderColor: "red"
});

export const RecentContentWarp = styled.View({
    marginTop: 24,
    height: 150,
    width: "100%"
});

export const RecentContentList = styled.ScrollView({
    overflow: "visible",
    marginTop: 8,
    // paddingLeft: 2,
    marginBottom: 8
});

export const RecentContentContainer = styled.View({
    width: 120,
    height: 80,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 5,
    marginRight: 12,
    marginTop: 2,
    marginLeft: 5
});

export const RecentContentWriter = styled.Text({
    fontSize: 12,
    color: "#6f6f7e",
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const RecentContentTitle = styled.Text({
    marginTop: 2,
    color: "#17171c",
    fontSize: 12,
    fontFamily: "SpoqaHanSansNeo-Medium"
});

export const RecentContentTitleWarp = styled.View({
    minHeight: 34,
    width: "100%"
});

export const RecentDiaryTitleWarp = styled.View({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
    // marginTop: 15
});

export const RecentDiaryColor = styled.View(
    (props: { background: string }) => ({
        width: 10,
        height: 10,
        marginRight: 4,
        backgroundColor: props.background,
        borderRadius: 5
    })
);

export const RecentDiaryTitle = styled.Text({
    fontSize: 12,
    color: "#babacb",
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const DiaryTitle = styled.Text({
    // marginBottom: 8,
    fontSize: 14,
    color: "#6f6f7e",
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const DiaryListContainer = styled.View({
    // paddingTop:20,
    flexGrow: 1,
    flexBasis: 1,
    overflow: "visible"
});

export const DiaryList = styled.ScrollView({
    // paddingTop: 8,
    marginHorizontal: -20,
    paddingHorizontal: 20
});

export const DiaryContainer = styled.View({
    display: "flex",
    height: gridWidth,
    marginBottom: 18,
    marginLeft: 2,
    marginRight: 2,
    width: gridWidth,
    borderWidth: 0
    // boxShadow:'1.5px 2.5px 5px #0000002b',
    // shadowColor: "rgb(0, 0, 0)",
    // shadowOffset: {
    //     width: 1,
    //     height: 3
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    // borderRadius: 10,
    // elevation: 5
});

export const CreateDiaryWrap = styled.View({
    display: "flex",
    height: 158,
    marginBottom: 18,
    width: 159
});
export const DiaryWarp = styled.TouchableOpacity({
    width: 159,
    height: 158,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column"
});

export const DiaryContent = styled.View({
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start"
});

export const DiaryCover = styled.View(
    (props: { backgroundColor?: string; pattern?: string }) => ({
        backgroundColor: props.backgroundColor,
        height: 49,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        left: -3,
        width: gridWidth + 3
    })
);

export const CoverImage = styled.Image({
    width: gridWidth + 3,
    left: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
});

export const DiaryDetailTitle = styled.Text({
    fontSize: 16,
    color: "#17171c",
    fontFamily: "SpoqaHanSansNeo-Medium"
});

export const DiaryBottom = styled.View({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
});

export const MembersText = styled.Text({
    color: "#696969",
    fontSize: 12,
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const RecommandCreateDiaryWrap = styled.View({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flexGrow: 1,
    flexBasis: 1,
    marginTop: 8
});

export const RecommandCreateDiary = styled.View({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-20%"
});

export const CreateDiaryText = styled.Text({
    color: "#6f6f7e",
    fontSize: 14,
    marginTop: 7,
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const CreateDiaryContainer = styled.TouchableOpacity({
    width: gridWidth,
    height: gridWidth - 1,
    borderRadius: 10,
    borderColor: "#e2e2e2",
    borderWidth: 1.5,
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
});

export const CreateDiaryModalBackground = styled.View({
    backgroundColor: "rgba(23, 23, 28, 0.3)",
    display: "flex",
    flexDirection: "column",
    height: "100%"
});

export const CreateDiary = styled.View({
    height: 558,
    backgroundColor: "#fff",
    paddingHorizontal: 34,
    paddingBottom: 38
});

export const ModalTouchable = styled.View({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4
});

export const TouchableIcon = styled.View({
    backgroundColor: "#d1d1de",
    borderRadius: 3,
    width: 42,
    height: 6
});

export const CreateDiatyTitleWarp = styled.View({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    marginBottom: 40
});

export const CreateDiaryTitle = styled.Text({
    fontSize: 16,
    color: "#17171c",
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const CreateDiaryInputWarp = styled.View({});

export const CreateDiaryTitleWarp = styled.View({
    flexDirection: "row",
    justifyContent: "space-between"
});

export const CreateInputCount = styled.Text({
    color: "#d1d1de",
    fontSize: 10,
    fontFamily: "SpoqaHanSansNeo-Bold",
    fontWeight: "bold",
    marginLeft: 8
});

export const CreateInputTitle = styled.Text({
    fontSize: 12,
    color: "#17171c",
    marginBottom: 8,
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const CreateDiaryCoverContainer = styled.View(
    (props: { backgroundColor?: string }) => ({
        marginTop: 40,
        display: "flex",
        flexBasis: 1,
        flexGrow: 1,
        backgroundColor: props.backgroundColor
    })
);

export const CreateDiaryCoverTitle = styled.Text({
    fontSize: 12,
    color: "#17171c",
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const CreateDiaryCoverSelectedWarp = styled.View({
    marginTop: 12,
    width: 161,
    alignSelf: "center"
});
export const CreateDiaryCoverSelected = styled.View({
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: "#babacb",
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 30,
    paddingBottom: 20
});
export const CreateDiaryCoverColor = styled.View(
    (props: { color: string }) => ({
        backgroundColor: props.color || "#fff",
        height: 49
    })
);
export const CreateDiaryCoverList = styled.View({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18
});

export const CreateDiaryCoverContent = styled.TouchableOpacity(
    (props: { color?: string; selected?: boolean }) => ({
        width: 40,
        height: 40,
        borderRadius: 20,
        // overflow: 'hidden',
        backgroundColor: props.color || "#fff"
    })
);

export const SelectedCheck = styled.View((props: { theme: any }): any => ({
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    top: 0,
    left: 0,
    zIndex: 10,
    borderRadius: 26,
    borderColor: props.theme["201"],
    borderWidth: 1.5,
    // backgroundColor: "#8017171c"
    backgroundColor: "rgba(23, 23, 28, 0.502)"
}));

export const DiaryEmptyImageWarp = styled.View({
    position: "relative"
});

export const DiaryEmptyImage = styled.Image({
    width: 120,
    height: 94,
    resizeMode: "contain"
});

export const LogoType = styled.Image({
    width: 40,
    height: 30,
    resizeMode: "contain"
});

export const DiaryBadge = styled.Image({
    width: 25,
    height: 20,
    resizeMode: "contain"
});

export const DiaryListBottom = styled.View({
    marginBottom: 20,
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
});

export const DiaryListBottomImage = styled.Image({
    width: 100,
    height: 100,
    resizeMode: "contain"
});

export const DiaryListBottomMention = styled.Text({
    color: "#bebece",
    fontSize: 12,
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const SpeechBubbleWrap = styled.View({
    position: "absolute",
    left: 70,
    top: -37
});
export const SpeechBubbleWrapBg = styled.View((props: { theme: any }) => ({
    backgroundColor: props.theme["110"],
    borderRadius: 10,
    width: 144,
    height: 55,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 13
}));

export const EmptyDiaryText = styled.Text({
    fontSize: 11,
    color: "#fff",
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const SpeechBubbleWrapBgTail = styled.View((props: { theme: any }) => ({
    backgroundColor: "transparent",
    width: 3,
    height: 3,
    marginLeft: 20,
    borderStyle: "solid",
    borderTopWidth: 9,
    borderRightWidth: 4,
    borderBottomWidth: 0,
    borderLeftWidth: 4,
    borderTopColor: props.theme["110"],
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent"
}));

// @ts-ignore
export const NewAlarm = styled.View((props: { theme: any }) => ({
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: props.theme["401"],
    position: "absolute",
    right: 0
}));

export const AlertContent = styled.View({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24
});

// @ts-ignore
export const AlertText = styled.Text((props: { theme: any }) => ({
    fontSize: 14,
    color: props.theme["110"],
    fontFamily: "SpoqaHanSansNeo-Regular",
    textAlign: "center"
}));
