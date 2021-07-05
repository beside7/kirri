import { globalStyles } from "@utils";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container
    },
    editorWrap : {
    },
    editor : {
        backgroundColor: "#FFFCF0",
    },
    bottomTab : {
        bottom: 0,
        position: "absolute",
        backgroundColor: "#F2F2F2",
        width: "100%",
        height: 48,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    imageList : {
        display: "flex",
        flexDirection: "row",
        marginTop: 15,
        width: "100%",
    },
    imageWrap: {
        width: 102, 
        height: 102,
        padding: 12,
        marginRight: 5,
    },
    closeIcon: {
        position: "absolute",
        top: 0,
        right: 0
    }
})


export default styles;