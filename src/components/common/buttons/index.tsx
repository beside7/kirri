import React from 'react';
import {Props, ButtonTypes} from './types';
import {StyledText, Large, Medium, Small} from './button.style';

const buttonTypes = {
    large: Large,
    medium: Medium,
    small: Small
}


type ButtonProps = {
    children: string
} & Props;

export const Button = (props:ButtonProps) =>{
    return React.createElement(buttonTypes[props.type], {
        ...props
    }, (<StyledText>{props.children}</StyledText>)
    )
}

Button.defaultProps = {
    color: 'primary',
    disabled: false
}