import React, { ReactElement } from 'react'
import { Modal, StyleSheet, Image, Pressable, View, Dimensions } from "react-native";
import { Text_2 } from "@components";
const { width , height } = Dimensions.get("screen")

type PushMessageProps = {
    visible : boolean
    onClose : () => void
    onConfirm: () => void
    content: ReactElement | string | undefined
    confirm?: string
    close?: string
}

const Confirm = ({ visible, onClose, onConfirm, content, confirm,close } : PushMessageProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            statusBarTranslucent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalContent}>
                        { content }
                    </View>
                    <View style={styles.modalFooter}>
                        <Pressable
                            style={[styles.buttonConfirm]}
                            onPress={() => onConfirm()}
                        >
                            <Text_2 style={styles.titleStyle}>{confirm}</Text_2>
                        </Pressable>
                        <Pressable
                            style={[styles.buttonClose]}
                            onPress={() => onClose()}
                        >
                            <Text_2 style={styles.titleStyle}>{close}</Text_2>
                        </Pressable>
                    </View>
                    
                </View>
                
            </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
        position: "relative",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: height,
        backgroundColor: "#17171c60",
    },
    modalView: {
        width: 300,
        height: "auto",
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalContent: {
        paddingTop: 40,
        paddingBottom: 36,
        paddingHorizontal: 20
    },

    modalFooter: {
        flexDirection: "row",
        height: 50,
    },
    
    buttonConfirm: {
        width: "50%",
        height: 50,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#e4e4ef",
        borderRightWidth: 1,
        borderBottomLeftRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonClose: {
        width: "50%",
        height: 50,
        backgroundColor: "#ffdd1f",
        borderBottomRightRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    titleStyle: {
        color: "#17171c",
        fontWeight: "bold",
        textAlign: "center"
    },
 
  });

Confirm.defaultProps = {
    visible : false,
    onClose: () => console.warn("onClose 미정의"),
    onConfirm: () => console.warn("onConfirm 미정의"),
    confirm: "confirm",
    close: "close",
}
  
export default Confirm;