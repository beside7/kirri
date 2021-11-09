import styled from "styled-components/native";
import { StyledProps } from "./types";

const fontSizeOfType = {
    small: 12,
    medium: 14,
    large: 14
};

export const StyledText = styled.Text((props: StyledProps): any => {
    let fontColor = "";
    switch (props.color) {
        case "primary":
            fontColor = props.theme["110"];
            break;
        case "secondary":
            fontColor = props.theme["106"];
            break;
        default:
            fontColor = props.theme["110"];
            break;
    }
    return {
        color: props.disabled ? props.theme["103"] : fontColor,
        fontSize: fontSizeOfType[props.type],
        fontFamily: "SpoqaHanSansNeo-Regular"
    };
});

const Button = styled.TouchableOpacity((props: StyledProps) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: props.width || "100%",
    borderRadius: 10
}));

export const Large = styled(Button)((props: StyledProps) => ({
    maxWidth: 335,
    height: props.height || 50,
    backgroundColor: props.disabled ? props.theme["101"] : props.theme["201"]
}));

const ButtonOfType = styled(Button)((props: StyledProps) => {
    let color = "";
    switch (props.color) {
        case "primary":
            color = props.theme["201"];
            break;
        case "secondary":
            color = props.theme["101"];
            break;
        default:
            color = props.theme["201"];
            break;
    }
    return {
        backgroundColor: props.disabled ? props.theme["101"] : color
    };
});

export const Medium = styled(ButtonOfType)((props: StyledProps) => ({
    maxWidth: 219,
    height: props.height || 50
}));

export const Small = styled(ButtonOfType)((props: StyledProps) => ({
    width: props.width || 52,
    height: props.height || 28
}));
