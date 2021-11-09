import React from "react";
import { View, Modal, Pressable } from "react-native";

import styles from "./record-input.style";
import { RadioButton } from "react-native-paper";
import { Text_2 } from "@components";

type ImageQualityModalProps = {
    visible: boolean;
    checked: number;
    close: () => void;
    setChecked: (arg0: number) => void;
};

/**
 * 이미지 화질 설정
 * @param param0
 * @returns
 */
export default function ImageQualityModal({
    visible,
    checked,
    close,
    setChecked
}: ImageQualityModalProps) {
    return (
        <Modal statusBarTranslucent={true} visible={visible} transparent={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.form}>
                        <View style={styles.formGroup}>
                            <Text_2>원본 화질</Text_2>
                            <RadioButton
                                value="1"
                                status={checked === 1 ? "checked" : "unchecked"}
                                onPress={() => setChecked(1)}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text_2>높은 화질</Text_2>
                            <RadioButton
                                value="0.75"
                                status={
                                    checked === 0.75 ? "checked" : "unchecked"
                                }
                                onPress={() => setChecked(0.75)}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text_2>일반 화질</Text_2>
                            <RadioButton
                                value="0.5"
                                status={
                                    checked === 0.5 ? "checked" : "unchecked"
                                }
                                onPress={() => setChecked(0.5)}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text_2>낮은 화질</Text_2>
                            <RadioButton
                                value="0.25"
                                status={
                                    checked === 0.25 ? "checked" : "unchecked"
                                }
                                onPress={() => setChecked(0.25)}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text_2>저용량</Text_2>
                            <RadioButton
                                value="0"
                                status={checked === 0 ? "checked" : "unchecked"}
                                onPress={() => setChecked(0)}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            padding: 0
                        }}
                    >
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={close}
                        >
                            <Text_2 style={styles.textStyle}>닫기</Text_2>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
