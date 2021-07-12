import React, { useState } from 'react'
import { Alert, Modal, StyleSheet, Image, Pressable, View, Dimensions } from "react-native";
import { Text_2 } from "@components";
const { width , height } = Dimensions.get("screen")

type PushMessageProps = {
    visible : boolean
    closeModal : () => void
}

const PushMessage = ({ visible, closeModal } : PushMessageProps) => {
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
                        <View style={styles.images}>
                            <Image 
                                source={require("@assets/icons/mail.png")}
                                style={styles.mailIcon}
                            />
                            <Text_2 style={styles.titleStyle}>메세지 도착</Text_2>
                        </View>
                        <View style={styles.modalText}>
                            <Text_2 style={styles.titleStyle}>댕청미 에게, 언제까지 쓰는 지 안쓰는 지 내가 지켜본다. </Text_2>
                            <Text_2 style={styles.textStyle}>from. 최애옹 [처음 우리들의 끼리 다이어리!!]</Text_2>
                        </View>
                    </View>
                    <Pressable
                        style={[styles.buttonClose]}
                        onPress={() => closeModal()}
                    >
                        <Text_2 style={styles.titleStyle}>Hide Modal</Text_2>
                    </Pressable>
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
        height: 268,
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
    images: {
        alignItems: "center",
        justifyContent: "center",
    },
    mailIcon: {
        width: 24,
        height: 24,
        marginBottom: 4,
    },
    buttonClose: {
        width: "100%",
        height: 50,
        backgroundColor: "#ffdd1f",
        position: "absolute",
        bottom: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        marginTop: 24,
        paddingHorizontal: 10
    },
    titleStyle: {
        color: "#17171c",
        fontWeight: "bold",
        textAlign: "center"
    },
    textStyle: {
        color: "#babacb",
        fontSize: 12,
        textAlign: "center",
        marginTop: 12
    }
 
  });

PushMessage.defaultProps = {
    visible : false,
    closeModal: () => console.warn("closeModal 미정의")
}
  
export default PushMessage;