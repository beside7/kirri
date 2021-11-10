import React from "react";
import { View, Image } from "react-native";
import { Confirm, Text_2, Popup } from "@components";
import { styles } from "./style";

type DeleteConfirmProps = {
    visible: boolean;
    onClose: () => Promise<void>;
    onConfirm: () => Promise<void>;
    confirm?: string;
    close?: string;
    nickName?: string | null;
};
/**
 * 내보내기 팝업
 * @returns
 */
export function DeleteConfirm({
    visible,
    confirm,
    close,
    onConfirm,
    onClose,
    nickName
}: DeleteConfirmProps) {
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
                            {nickName} 님의 기록이 모두 삭제돼요.
                        </Text_2>
                        <Text_2 style={styles.modalTitleStyle}>
                            다이어리에서 내보낼까요?
                        </Text_2>
                    </View>
                </>
            }
        />
    );
}

type AdministratorConfirmProps = {
    visible: boolean;
    onClose: () => Promise<void>;
    onConfirm: () => Promise<void>;
    confirm?: string;
    close?: string;
    nickName?: string | null;
};

/**
 * 관리자 지정 동의창
 * @returns
 */
export function AdministratorConfirm({
    visible,
    confirm,
    close,
    onConfirm,
    onClose,
    nickName
}: AdministratorConfirmProps) {
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
                            source={require("@assets/images/popup_diary_edit_bgimg.png")}
                            style={styles.modalDeleteIcon}
                        />
                        <Text_2 style={styles.modalTitleStyle}>
                            {nickName} 님을 관리자로 지정할까요?
                        </Text_2>
                    </View>
                </>
            }
        />
    );
}
