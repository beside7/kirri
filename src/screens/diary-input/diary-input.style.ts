import { globalStyles } from "@utils";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container
    },
    editorWrap : {
        borderWidth: 1,
        borderColor: "red",
    },
    editor : {
        
    },
    bottomTab : {
        bottom: 0,
        position: "absolute",
        backgroundColor: "#F2F2F2",
        width: "100%",
        height: 50,
        paddingHorizontal: 20,
        paddingVertical: 10

    }
})


export default styles;