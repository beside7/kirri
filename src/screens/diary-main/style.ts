import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    bottomTab : {
        bottom: 0,
        position: "absolute",
        backgroundColor: "#F2F2F2",
        width: "100%",
        height: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    editButton : {
        position: "absolute",
        right: - 10,
        top: - 20
    }
});

export default styles;