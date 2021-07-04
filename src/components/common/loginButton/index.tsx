import React , { ReactNode } from 'react'
import { View, Text , TouchableOpacity, TouchableOpacityProps, ActivityIndicator} from 'react-native'
import styles from "./button1.style";


type ButtonProps = {
    children: ReactNode;
    loading?: boolean;
    textStyle?: any
} & TouchableOpacityProps;

export function LoginButton({ children, style , loading, textStyle }: ButtonProps) {
    return (
        <TouchableOpacity disabled={loading} style={[styles.button, style]}>
            {loading ? (
                <ActivityIndicator color="#000" />
            ) : (
                <Text style={[styles.buttonText, textStyle]}>{children}</Text>
            )}
        </TouchableOpacity>
    )
}
