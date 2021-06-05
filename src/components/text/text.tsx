import React, { ReactNode, ReactElement } from "react";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

type TextProps = {
    children: ReactNode;
} & NativeTextProps;


export default function Text({ children, style, ...props }: TextProps): ReactElement {
    let fontFamily = "space-mono"
    return (
        <NativeText {...props} style={[{ fontFamily }, style]}>
            {children}
        </NativeText>
    );
}