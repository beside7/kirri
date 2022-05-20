import styled from "styled-components/native";
import Constants from "expo-constants";
import { Platform } from "react-native";

type HeaderContainerProps = {
    borderBottom: boolean;
};
export const HeaderContainer = styled.View(
    ({ borderBottom }: HeaderContainerProps): any => {
        return {
            paddingTop:
                Platform.OS === "android" ? 17 + Constants.statusBarHeight : 17,
            paddingBottom: 17,
            paddingHorizontal: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "rgba(41, 0, 0, 0.1)",
            borderBottomWidth: borderBottom ? 1 : 0,
            backgroundColor: "#fff"
        };
    }
);

export const IconWrap = styled.TouchableOpacity({
    width: 24,
    height: 24
});

export const Icon = styled.Image({
    width: 24,
    height: 24,
    resizeMode: "contain"
});

export const Title = styled.Text({
    fontSize: 18,
    fontFamily: "SpoqaHanSansNeo-Bold",
    fontWeight: "bold"
});
