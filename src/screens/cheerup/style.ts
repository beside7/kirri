import styled from "styled-components/native";

export const Container = styled.View``;

export const BackgroundImage = styled.Image({
    width: 100,
    height: 100,
    position: "absolute",
    top: 48
});

export const SpeechBubble = styled.Text({
    width: 152,
    height: 53,
    position: "absolute",
    top: 40,
    left: 100,
    color: "#fff",
    backgroundColor: "#17171c",
    paddingTop: 13,
    paddingBottom: 12,
    fontSize: 11,
    paddingLeft: 12,
    paddingRight: 12,
    fontFamily: "SpoqaHanSansNeo-Regular",
    borderRadius: 13
});

export const SpeechBubble2 = styled.View({
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 9,
    borderRightWidth: 15,
    borderBottomWidth: 9,
    borderLeftWidth: 0,
    borderTopColor: "transparent",
    borderRightColor: "#17171c",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    position: "absolute",
    top: 60,
    left: 85
});

export const FriendList = styled.FlatList({
    marginTop: 160,
    paddingLeft: 40,
    paddingRight: 40
});

export const ListItem = styled.TouchableOpacity({
    marginRight: 44,
    marginTop: 44
});

export const ListItemImage = styled.Image({
    width: 70,
    height: 70
});

export const ListItemDisabledImage = styled.Image({
    width: 70,
    height: 70,
    opacity: 0.5
});

export const ListItemTitle = styled.Text({
    marginTop: 8,
    fontFamily: "SpoqaHanSansNeo-Regular",
    textAlign: "center",
    fontSize: 12,
    color: "#17171c"
});

export const ListItemDisabledTitle = styled.Text({
    marginTop: 8,
    fontFamily: "SpoqaHanSansNeo-Regular",
    textAlign: "center",
    fontSize: 12,
    color: "#a0a0a0"
});

export const ActionSheetContainer = styled.View({
    paddingTop: 30,
    paddingLeft: 34,
    paddingRight: 34
});

export const ProfileContainer = styled.View({
    flexDirection: "row"
});

export const ProfileImage = styled.Image({
    width: 70,
    height: 70
});

export const TitleContainer = styled.View({
    marginLeft: 12
});

export const Title = styled.Text({
    width: 225,
    fontSize: 16,
    color: "#17171c",
    fontFamily: "SpoqaHanSansNeo-Medium"
});

export const SubTitle = styled.Text({
    width: 238,
    fontSize: 12,
    color: "#babacb",
    marginTop: 4,
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const ChreerupContainer = styled.View({
    marginTop: 33,
    flexDirection: "row",
    flexWrap: "wrap"
});

export const Chreerup = styled.TouchableOpacity({
    width: "45.5%",
    height: 160,
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 7,
    marginRight: 7,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e1e1eb",
    borderRadius: 10
});

export const ChreerupImage = styled.Image({
    width: 70,
    height: 70,
    marginBottom: 15
});

export const ChreerupMessage = styled.Text({
    color: "#17171c",
    fontSize: 12,
    fontFamily: "SpoqaHanSansNeo-Regular"
});

export const EmptyContaner = styled.View({
    paddingTop: 100,
    paddingLeft: 78,
    paddingRight: 78,
    justifyContent: "center",
    alignItems: "center"
});

export const EmptyImage = styled.Image({
    width: 125,
    height: 125,
    marginBottom: 24
});

export const EmptyMessage = styled.Text({
    color: "#17171c",
    fontSize: 14,
    fontFamily: "SpoqaHanSansNeo-Regular",
    lineHeight: 20
});

export const Button = styled.TouchableOpacity({
    width: 219,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffdd1f",
    borderRadius: 10,
    marginTop: 60
});

export const ButtonText = styled.Text({
    fontFamily: "SpoqaHanSansNeo-Medium",
    fontSize: 14
});
