import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import {Text, Image, ImageSourcePropType, TouchableOpacityProps } from 'react-native';


interface StyleProps {
    width?: string | number,
    height?: string | number
}

const Button = styled.TouchableOpacity((props: StyleProps) => ({
    width: props.width || '24',
    height: props.height || '24'
}))

type Props = {
    children?: ReactElement,
    icon?: ImageSourcePropType,
    width?: string | number,
    height?: string | number,
    style?: any,
} & TouchableOpacityProps

export const IconButton = ({children, icon, style, ...props}: Props) => {
    return(
        <Button
            {...props}
            style={style}
        >
            {
                icon?<Image source={icon} style={{ width: 24, height: 24 }}></Image>:{children}
            }
            {
                children
            }
        </Button>
    )
}