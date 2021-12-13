import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const SafeAreaViewTop = styled.SafeAreaView({
    display: "flex",
    flexDirection: "column",
    height: 0,
    backgroundColor: "#fff"
});

export const SafeAreaViewBottom = styled.SafeAreaView({
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f7f7f7",
    height: "100%"
});

export const ContentContainer = styled.ScrollView({
    backgroundColor: "#f7f7f7"
});

export const Content = styled.View({
    paddingHorizontal: 35,
    backgroundColor: "#fff"
});

export const Profile = styled(Content)({
    paddingBottom: 66,
    marginBottom: 8,
    paddingTop: 44,
    alignItems: "center"
});

export const ProfileImage = styled.Image({
    width: 100,
    height: 100,
    resizeMode: "contain"
});

export const NicknameWarp = styled.View({
    display: "flex",
    flexDirection: "row",
    marginTop: 24
});

export const NicknameText = styled.Text({
    fontSize: 24,
    color: "#333333",
    marginRight: 5,
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const EditProfile = styled.TouchableOpacity((props: { theme: any }) => ({
    width: 18,
    height: 18,
    marginTop: 7,
    marginLeft: 5,
    borderRadius: 9,
    backgroundColor: props.theme["101"]
}));

export const NicknameInputWarp = styled.View({
    marginTop: 70
});

export const MakeNicknameTitle = styled.Text({
    color: "#17171c",
    fontSize: 12,
    marginBottom: 8,
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const SettingListWrap = styled.View({
    height: 60,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
});

export const SettingTitleWarp = styled.View({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
});

export const SettingIcon = styled.Image({
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 12
});

export const SettingTitle = styled.Text({
    fontSize: 14,
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const VersionText = styled.Text((props: { theme: any }) => ({
    fontSize: 14,
    color: props.theme["110"],
    fontFamily: "SpoqaHanSansNeo-Regular"
}));

export const LeaveKKiriWarp = styled.TouchableOpacity({
    marginLeft: 70,
    marginTop: 12
});

export const LeaveKKiriContainer = styled.View({
    height: 100,
    backgroundColor: "#f7f7f7"
});

export const LeaveKKiriTitle = styled.Text((props: { theme: any }) => ({
    fontSize: 14,
    textDecoration: "underline",
    color: props.theme["106"],
    textDecorationColor: props.theme["106"],
    fontFamily: "SpoqaHanSansNeo-Regular"
}));

export const LeaveKirriPopupContent = styled.View({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24
});

export const SignoutImage = styled.Image({
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 24
});

export const SignoutText = styled.Text`
    font-size: 14;
    color: ${(props: { theme: { "110": any } }) => props.theme["110"]};
    font-family: "SpoqaHanSansNeo-Regular";
    text-align: "center";
`;
