import { globalStyles } from "@utils";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container
    },
    editorWrap : {
    },
    editor : {
   
    },
    bottomTab : {
        bottom: 0,
        position: "absolute",
   
        width: "100%",
        height: 50,
        paddingHorizontal: 20,
        paddingVertical: 10

    },
    imageList : {
        display: "flex",
        flexDirection: "row",
        marginTop: 15,
        width: "100%",
    },
    imageWrap: {
        width: 68, 
        height: 68,
        marginRight: 5,
    },
    closeIcon: {
        position: "absolute",
        bottom: 0,
        right: 0
    }
})


export default styles;