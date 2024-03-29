import React, { ReactElement, forwardRef } from "react";
import {
    TextInput as NativeTextInput,
    TextInputProps as NativeTextInputProps,
    StyleSheet
} from "react-native";

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: "100%",
        borderWidth: 0,
        backgroundColor: "#ffffff",
        padding: 10,
        color: "#a0a0a0",
        fontSize: 20
    }
});

const TextInput = forwardRef<NativeTextInput, NativeTextInputProps>(
    ({ style, ...props }: NativeTextInputProps, ref): ReactElement => {
        return (
            <NativeTextInput
                ref={ref}
                {...props}
                placeholderTextColor="#cccccc"
                style={[styles.input, style]}
            />
        );
    }
);

TextInput.displayName = "TextInput";

export default TextInput;
