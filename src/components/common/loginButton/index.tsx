import React , { ReactNode } from 'react'
import { View, Text , TouchableOpacity, TouchableOpacityProps, ActivityIndicator} from 'react-native'
import styles from "./button1.style";


type ButtonProps = {
    children: ReactNode;
    loading?: boolean;
    textStyle?: any;
    // onPress: (e:any)=>void
} & TouchableOpacityProps;

export function LoginButton({ children, style , loading, textStyle, onPress }: ButtonProps) {
    return (
        <TouchableOpacity disabled={loading} style={[styles.button, style]}
            onPress={onPress}
        >
            {loading ? (
                <ActivityIndicator color="#000" />
            ) : (
                <Text style={[styles.buttonText, textStyle]}>{children}</Text>
            )}
        </TouchableOpacity>
    )
}
