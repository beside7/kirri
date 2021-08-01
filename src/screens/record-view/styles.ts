import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    viewTitle :{ 
        justifyContent : "center",
        paddingHorizontal: 20 ,
        height: 80,
        borderBottomWidth: 1,
        borderColor: "#e1e1eb" 
    },
    viewWriterContainer: { 
        marginBottom: 8,
        paddingTop: 24 ,
        height: 60 ,
        justifyContent: "space-between",
        flexDirection: "row" ,
        paddingHorizontal: 28 
    },
    modalImages: {
        alignItems: "center",
        justifyContent: "center",
    },
    modalDeleteIcon: {
        width: 100,
        height: 100,
        marginBottom: 24,
    },
    modalTitleStyle: {
        color: "#17171c",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 14,
    },
})

export default styles;