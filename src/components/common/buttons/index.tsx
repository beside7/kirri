import React from "react";
import { Props, ButtonTypes } from "./types";
import { StyledText, Large, Medium, Small } from "./button.style";

const buttonTypes = {
    large: Large,
    medium: Medium,
    small: Small
};

export const Button = (props: Props) => {
    return React.createElement(
        buttonTypes[props.type],
        {
            ...props
        },
        <StyledText color={props.color} disabled={props.disabled}>
            {props.children}
        </StyledText>
    );
};

Button.defaultProps = {
    color: "primary",
    disabled: false,
    type: "large"
};
