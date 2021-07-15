import { TouchableOpacityProps } from "react-native";
import { ReactElement } from "react";


export type ButtonTypes = 'large'|'medium'|'small';

export type ColorType = 'primary' | 'secondary';

export type Props = {
    children: string| ReactElement,
    width?: string | number,
    height?: string | number,
    disabled?: boolean,
    color?: ColorType,
    type: ButtonTypes
} & TouchableOpacityProps;


export interface CommonStyledProps {
    width?: string | number,
    height?: string | number,
    disabled?: boolean,
    color?: ColorType,
    theme: any,
    type: ButtonTypes,
    [key: string]: any
}

