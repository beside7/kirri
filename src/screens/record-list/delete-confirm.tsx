import React from "react";
import { View, Image } from "react-native";

import { Confirm, Text_2, Popup } from "@components";

import styles from "./style";

/**
 * 다이러리 삭제 동의창
 * @returns
 */
type DeleteConfirmProps = {
    modal: boolean;
    onClose: () => Promise<void>;
    onConfirm: () => Promise<void>;
};

export default function DeleteConfirm({
    modal,
    onClose,
    onConfirm
}: DeleteConfirmProps) {
    return (
        <Popup
            open={modal}
            cancel="삭제할래요"
            confirm="남겨둘래요"
            onCancel={onConfirm}
            onConfirm={onClose}
            width={300}
            handelOpen={(key: boolean) => {}}
            content={
                <>
                    <View style={styles.modalImages}>
                        <Image
                            source={require("@assets/images/popup_diary_delete_bgimg.png")}
                            style={styles.modalDeleteIcon}
                        />
                        <Text_2 style={styles.modalTitleStyle}>
                            다이어리 기록이 모두 삭제돼요 :(
                        </Text_2>
                    </View>
                </>
            }
        />
    );
}
