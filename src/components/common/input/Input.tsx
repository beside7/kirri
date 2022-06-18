import React, { ReactElement, useState, useEffect , useCallback} from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
// 아오 $#%$#^%$&$^&
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";

interface StyleProps {
    width?: string | number;
    height?: string | number;
    onFocus?: boolean;
    onError?: boolean;
    errorMessage?: string;
}

const InputContainer = styled.View((props: StyleProps) => ({
    borderWidth: 2,
    borderRadius: 4,
    borderColor: props.onError
        ? "#eb5858"
        : props.onFocus
        ? "#17171c"
        : "#d1d1de"
}));

const InputWarp = styled.View({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    height: 40,
    alignItems: "center"
});

const DivisionLine = styled.View({
    width: 1,
    backgroundColor: "#e1e1eb",
    marginHorizontal: 8,
    height: 24
});

const RightTextWarp = styled.Text({
    color: "#6f6f7e",
    fontFamily: "SpoqaHanSansNeo-Bold"
});

const ErrorMsg = styled.Text({
    color: "#eb5858",
    marginTop: 8,
    fontSize: 12,
    fontFamily: "SpoqaHanSansNeo-Regular"
});

const StyledTextInputContainer = styled.View({
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
})

const StyledTextInput = styled.TextInput({
    borderWidth: 0,
    flexGrow: 1,
    flexBasis: 1,
    marginHorizontal: 8,
    fontFamily: "SpoqaHanSansNeo-Regular"
});

const Non = styled.View({
    display: "none"
});

const ConfirmMsg = styled.Text({
    color: "#6173ff"
});

type Props = {
    width?: string | number;
    height?: string | number;
    onError?: boolean | undefined;
    rightText?: string;
    icon?: ReactElement;
    text: string;
    onChange: (e: string) => void;
    errorMessage?: string;
    diabled?: boolean;
    placeholder?: string;
    maxLength?: number;
    onBlur?: () => void;
    confirmMessage?: string;
};
export const KirriTextInput = ({
    width,
    height,
    onError,
    rightText,
    icon,
    text,
    onChange,
    errorMessage,
    diabled,
    placeholder,
    maxLength,
    onBlur = () => {},
    confirmMessage
}: Props) => {
    const [onFocus, setOnFocus] = useState(false);
    const [val, setVal] = useState(text);
    useEffect(() => {
        onChange(val);
    }, [val]);

    const onChangeHandler = useCallback(
        (text: string) => {
            const length = [...text].length
            if(maxLength !== undefined && length > maxLength) {
                return;
            }
            setVal(text)
        },
        [],
    );



    return (
        <>
            <InputContainer
                // onFocus={onFocus} onError={onError}
            >
                <InputWarp>
                    {icon ? icon : <Non></Non>}
                    <StyledTextInputContainer>
                        <StyledTextInput
                            onChangeText={onChangeHandler}
                            onFocus={() => {
                                setOnFocus(true);
                            }}
                            onBlur={() => {
                                setOnFocus(false);
                                onBlur();
                            }}
                            editable={diabled === true ? false : true}
                            placeholder={placeholder}
                            // defaultValue={val}
                            value={val}

                            // maxLength={maxLength ? maxLength : 3000}
                            // keyboardType='decimal-pad'
                        />
                    </StyledTextInputContainer>

                    {val ? (
                        <TouchableOpacity
                            onPress={() => {
                                setVal("");
                            }}
                        >
                            <Image
                                style={{
                                    width: 24,
                                    height: 24,
                                    resizeMode: "contain"
                                }}
                                source={require("@assets/images/search_bar_cancel_normal.png")}
                            />
                        </TouchableOpacity>
                    ) : (
                        <Non></Non>
                    )}
                    {val && rightText ? (
                        <DivisionLine>
                            <Text></Text>
                        </DivisionLine>
                    ) : (
                        <></>
                    )}
                    {rightText ? (
                        <RightTextWarp>{rightText}</RightTextWarp>
                    ) : (
                        <Non></Non>
                    )}
                </InputWarp>
            </InputContainer>
            {onError === true && errorMessage ? (
                <ErrorMsg>{errorMessage}</ErrorMsg>
            ) : (
                <Non></Non>
            )}
            {onError === false && confirmMessage ? (
                <ConfirmMsg>{confirmMessage}</ConfirmMsg>
            ) : (
                <Non></Non>
            )}
        </>
    );
};
