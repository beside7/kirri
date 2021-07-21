import React, {ReactElement, useCallback, useState, useRef} from 'react'
import { Modal, Alert, Dimensions, View, SafeAreaView } from 'react-native'
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';


const INJECTED_JAVASCRIPT =
'(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';


interface Props {
    source: string,
    closeSocialModal: boolean,
    onComplete: Function
}



export const LoginWebview:React.FC<Props>= ({source, closeSocialModal, onComplete}) => {
    return (
        <Modal
        animationType="slide"
        transparent={true}
        style={styles.modalView}
        visible={closeSocialModal}
      >
        <SafeAreaView
        style={styles.modalView}
        >
          <WebView
          source={{uri:source}}
          onMessage={(event) => {
            onComplete(event);
          }}
          scalesPageToFit={false}
          style={{
              flex: 1,
              resizeMode: 'cover',
              width:Dimensions.get('window').width,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
        />
        </SafeAreaView>
      </Modal>
    )
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    
    },
    modalView: {
      flex:1,
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    }
  });