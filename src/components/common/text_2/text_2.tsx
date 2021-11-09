import React, { ReactNode, ReactElement } from "react";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

type TextProps = {
    children: ReactNode;
    bold?: "Regular" | "Medium";
} & NativeTextProps;

export default function Text({
    children,
    style,
    bold,
    ...props
}: TextProps): ReactElement {
    let fontFamily =
        bold === "Regular"
            ? "SpoqaHanSansNeo-Regular"
            : "SpoqaHanSansNeo-Medium";
    return (
        <NativeText {...props} style={[{ fontFamily }, style]}>
            {children}
        </NativeText>
    );
}
