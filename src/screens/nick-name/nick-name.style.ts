import { globalStyles } from "@utils";
import { StyleSheet, } from "react-native";



const styles = StyleSheet.create({
    container: {
        ...globalStyles.container
    },
    content: {
        borderWidth: 1,
        borderColor: "red",
    },
    thumbnailImage : {
        width: 70,
        height: 70,
        borderRadius: 70,
        backgroundColor: "#D1D1D1",
    }
});


export default styles