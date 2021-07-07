import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {Text, Image, ImageSourcePropType} from 'react-native';


interface StyleProps {
    width?: string | number,
    height?: string | number
}

const Button = styled.TouchableOpacity((props: StyleProps) => ({
    width: props.width || '24',
    height: props.height || '24'
}))

interface Props{
    children?: ReactElement,
    icon?: ImageSourcePropType,
    width?: string | number,
    height?: string | number,
    style?: any
}

export const IconButton = ({children, icon, style}: Props) => {
    return(
        <Button
            style={style}
        >
            {
                icon?<Image source={icon}></Image>:{children}
            }
        </Button>
    )
}