import React from "react";
import { View, Image } from "react-native";
import { Confirm, Text_2, Popup } from "@components";
import styles from "./style";

type LeaveConfirmProps = {
    visible: boolean;
    onClose: () => Promise<void>;
    onConfirm: () => Promise<void>;
    confirm?: string;
    close?: string;
    nickName?: string | null;
};

/**
 * 떠나기 팝업
 * @param props
 * @constructor
 */
export function LeaveConfirm({
    visible,
    confirm,
    close,
    onConfirm,
    onClose
}: LeaveConfirmProps) {
    return (
        <Popup
            open={visible}
            cancel={confirm}
            confirm={close}
            onCancel={onConfirm}
            onConfirm={onClose}
            width={300}
            content={
                <>
                    <View style={styles.modalImages}>
                        <Image
                            source={require("@assets/images/popup_diary_delete_bgimg.png")}
                            style={styles.modalDeleteIcon}
                        />
                        <Text_2 style={styles.modalTitleStyle}>
                            작성한 기록이 모두 사라져요.
                        </Text_2>
                        <Text_2 style={styles.modalTitleStyle}>
                            다이어리를 정말 떠나시겠어요?
                        </Text_2>
                    </View>
                </>
            }
        />
    );
}
