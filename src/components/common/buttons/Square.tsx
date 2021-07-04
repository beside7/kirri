import React, {ReactElement} from 'react';
import { Text , TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

interface StyleProps {
    backgroundColor?: string,
    width?: string | number,
    height?: string | number,
    disabled?: boolean,
    color?: string
}

const Button = styled.TouchableOpacity((props: StyleProps) => ({
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    width: props.width || '100%',
    height: props.height || '100%',
    borderRadius: 10,
    backgroundColor: props.disabled?'#f0f0f7':(props.backgroundColor||'#000'),
    color:  props.disabled?'#babacb':'#fff'
}))

const StyledText = styled.Text((props: StyleProps) => ({
    color:  props.disabled?'#babacb':'#fff'
}))

type Props = {
    onClick: (event: any) => void,
    children: string| ReactElement,
    width?: string | number,
    height?: string | number,
    disabled: boolean,
    backgroundColor?: string
} & TouchableOpacityProps;

export const SquareButton = ({onClick, children, width, height, disabled, backgroundColor}:Props): ReactElement => {
    return (
        <Button
            disabled={disabled}
            backgroundColor={backgroundColor}
            width={width}
            height={height}
        >
            {
                typeof children === 'string'?<StyledText disabled={disabled}>{children}</StyledText>:{children}
            }
        </Button>
    )
}

SquareButton.defaultValues = {
    onClick : (e: any) => {},
    width: '100%',
    height: '100%',
    disabled: false,
    backgroundColor: '#000'
}