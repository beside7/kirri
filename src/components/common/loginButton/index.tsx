import React , { ReactNode } from 'react'
import { View, Text , TouchableOpacity, TouchableOpacityProps, ActivityIndicator} from 'react-native'
import styles from "./button1.style";


type ButtonProps = {
    children: ReactNode;
    loading?: boolean;
} & TouchableOpacityProps;

export function LoginButton({ children, style , loading, ...props }: ButtonProps) {
    return (
        <TouchableOpacity disabled={loading} {...props} style={[styles.button, style]}>
            {loading ? (
                <ActivityIndicator color="#000" />
            ) : (
                <Text style={styles.buttonText}>{children}</Text>
            )}
        </TouchableOpacity>
    )
}
