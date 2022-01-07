import styled from "styled-components/native";

export const Container = styled.View({
    width: 219,
    height: 249,
    backgroundColor: "#fff",
    borderRadius: 10
});

export const HeaderImage = styled.Image``;
export const Content = styled.View({
    paddingTop: 24,
    paddingLeft: 28,
    paddingRight: 28,
    paddingBottom: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    height: 159
});

export const Footer = styled.View({
    // marginTop: 55,
    justifyContent: "flex-end"
});

export const Title = styled.Text({
    color: "#17171c",
    // textAlign: "center",
    fontSize: 20,
    fontFamily: "SpoqaHanSansNeo-Medium"
});

export const NicknameText = styled.Text({
    color: "#17171c",
    fontFamily: "SpoqaHanSansNeo-Bold",
    fontSize: 12
});

export const Author = styled.Text({
    color: "#6f6f7e",
    fontFamily: "SpoqaHanSansNeo-Regular",
    fontSize: 12
});

export const Button = styled.TouchableOpacity({
    width: 220,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffdd1f",
    flexDirection: "row",
    borderRadius: 10,
    marginTop: 40
});

export const Icon = styled.Image({
    width: 24,
    height: 24,
    marginRight: 4
});

export const ButtonText = styled.Text({
    fontSize: 14,
    fontFamily: "SpoqaHanSansNeo-Regular",
    color: "#17171c"
});

export const ScrollDownButton = styled.Image({
    width: 24,
    height: 24
});
