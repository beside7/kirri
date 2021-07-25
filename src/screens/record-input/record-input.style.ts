import { StyleSheet, Dimensions } from "react-native";
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 34
    },
    editorWrap : {
        height: SCREEN_HEIGHT - 300,
    },
    editor : {
        height: SCREEN_HEIGHT - 300,
    },
    bottomTab : {
        bottom: 0,
        position: "absolute",
   
        width: "100%",
        height: 48,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f4f8"
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
    },
    title : {
        fontSize: 20,
        fontFamily: "SpoqaHanSansNeo-Medium",
    },
    backgroudImage : {
        position: "absolute",
        top: 490,
        right: 0,
        width: 150,
        height: 86,
        opacity: 0.5,
    }
})


export default styles;