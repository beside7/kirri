import React from 'react'
import { View, Image } from 'react-native'
import { Confirm, Text_2 } from "@components";
import { styles } from "./style";


type DeleteConfirmProps = {
    visible : boolean
    onClose : () => void
    onConfirm: () => void
    confirm?: string
    close?: string
    nickName?: string | null
}
/**
 * 내보내기 팝업
 * @returns 
 */
export function DeleteConfirm(props : DeleteConfirmProps) {
    return (
        <Confirm
            {...props}
            content={
                <>
                    <View style={styles.modalImages}>
                        <Image 
                            source={require("@assets/images/popup_diary_delete_bgimg.png")}
                            style={styles.modalDeleteIcon}
                        />
                        <Text_2 style={styles.modalTitleStyle}>{props.nickName} 님의 기록이 모두 삭제돼요.</Text_2>
                        <Text_2 style={styles.modalTitleStyle}>다이어리에서 내보낼까요?</Text_2>
                    </View>
                </>
            }
        />
    )
}


type AdministratorConfirmProps = {
    visible : boolean
    onClose : () => void
    onConfirm: () => void
    confirm?: string
    close?: string
    nickName?: string | null
}

/**
 * 관리자 지정 동의창
 * @returns 
 */
export function AdministratorConfirm(props : AdministratorConfirmProps) {
    return (
        <Confirm
            {...props}
            content={
                <>
                    <View style={styles.modalImages}>
                        <Image 
                            source={require("@assets/images/popup_diary_edit_bgimg.png")}
                            style={styles.modalDeleteIcon}
                        />
                        <Text_2 style={styles.modalTitleStyle}>{props.nickName} 님을 관리자로 지정할까요?</Text_2>
                    </View>
                </>
            }
        />
    )
}