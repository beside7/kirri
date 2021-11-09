import styled from "styled-components/native";
import { StyledProps } from "styled-components";

interface StyleProps {
    width?: string | number;
    height?: string | number;
}

export const Container = styled.View(({ width, height }: StyleProps) => ({
    width: width ? width : "100%",
    height: height ? height : "100%"
}));

export const TabWarp = styled.View(() => ({
    width: "100%",
    height: 50
}));

export const Blank = styled.View({
    width: "100%",
    height: "100%"
});

export const Tab = styled.TouchableOpacity({
    flexGrow: 1,
    flexBasis: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingHorizontal: 19
});

export const TabTitle = styled.Text(
    (props: { active: boolean; theme: any }) => ({
        color: props.active ? props.theme["110"] : props.theme["106"],
        fontSize: 18,
        fontFamily: "SpoqaHanSansNeo-Regular"
    })
);

export const ActiveBar = styled.View((props: { theme: any }) => ({
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 2,
    backgroundColor: props.theme["110"]
}));
