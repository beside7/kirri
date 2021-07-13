import React, { ReactElement } from 'react';
import { TitleContainer, IconWarp, TitleText } from './title.style';

interface Props {
    title: string,
    rightIcon?: ReactElement,
    leftIcon?: ReactElement
}

export const Title = ({title, rightIcon, leftIcon}: Props):ReactElement => {
    return (
        <TitleContainer>
            <IconWarp>{rightIcon}</IconWarp>
            <TitleText>{title}</TitleText>
            <IconWarp>{leftIcon}</IconWarp>
        </TitleContainer>
    )
}