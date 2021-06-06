import { globalStyles } from "@utils";
import { StyleSheet, } from "react-native";



const styles = StyleSheet.create({
    container: {
        ...globalStyles.container
    },
    content: {
    },
    thumbnailContent: {
        width: "100%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",

    },
    thumbnailImage : {
        width: 90,
        height: 90,
        borderRadius: 90,
        backgroundColor: "#D1D1D1",
    },
    textInputContent : {
        alignItems: "center",
        paddingLeft: 30,
        paddingRight: 30
    },
    message1: {
        marginBottom: 10,
        color: "#ABA48C",
        fontSize: 10,
        letterSpacing: 0
    },
    textInput:{
        marginBottom: 80
    },
    button: {
        width: "100%"
    }
});


export default styles