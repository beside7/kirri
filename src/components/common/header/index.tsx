import React, {ReactElement} from 'react';
import {HeaderContainer, IconWrap, Icon, Title} from './header.style';

interface Props {
    title: string | ReactElement,
    rightIcon?: ReactElement | any,
    leftIcon?: ReactElement | any,
    onRightClick?:(e: any) => void,
    onLeftClick?:(e: any) => void,
    borderBottom?: boolean
}

export const Header = ({title, rightIcon, leftIcon, onRightClick=()=>{}, onLeftClick=()=>{}, borderBottom=true}:Props) => {
    return (
        <HeaderContainer>
            {React.isValidElement(leftIcon)?leftIcon:<IconWrap disabled={!leftIcon} onPress={onLeftClick}>{leftIcon?<Icon source={leftIcon}></Icon>:<></>}</IconWrap>}
            {React.isValidElement(title)?{title}:<Title>{title}</Title>}
            {React.isValidElement(rightIcon)?rightIcon:<IconWrap disabled={!rightIcon}  onPress={onRightClick}>{rightIcon?<Icon source={rightIcon}></Icon>:<></>}</IconWrap>}
        </HeaderContainer>
    )

}