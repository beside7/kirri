import React from 'react'
import { View, Image } from 'react-native'

import { Confirm, Text_2 } from "@components";

import styles from './style'

/**
 * 다이러리 삭제 동의창
 * @returns 
 */
type DeleteConfirmProps = {
    modal : boolean,
    onClose: () => void,
    onConfirm: () => void
}

export default function DeleteConfirm({ modal, onClose , onConfirm } : DeleteConfirmProps) {
    return (
        <Confirm 
            visible={modal}
            onClose={onClose}
            onConfirm={onConfirm}
            close="남겨둘래요"
            confirm="삭제할래요"
            content={
                <>
                    <View style={styles.modalImages}>
                        <Image 
                            source={require("@assets/images/popup_diary_delete_bgimg.png")}
                            style={styles.modalDeleteIcon}
                        />
                        <Text_2 style={styles.modalTitleStyle}>다이어리 기록이 모두 삭제돼요 :(</Text_2>
                    </View>
                </>
            }
        />
    )
}
