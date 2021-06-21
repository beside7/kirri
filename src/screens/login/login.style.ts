import { globalStyles } from "@utils";
import { StyleSheet, Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container
    },
    content: {
        width: "100%",
        height: ScreenHeight,
        paddingTop: 40,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 42,
        marginBottom: 80
    },
    subTitle: {
        alignItems: "center",
        marginBottom: 80
    },
    subTitleText: {
        fontSize: 18,
        color: "#707070",
        marginTop: 3,
        marginBottom: 3
    },
    button: {
        marginBottom: 20,
        width: 300,
    },
    kakaoButton: {
        marginBottom: 20,
        width: 300,
    },
    appleButton: {
        marginBottom: 20,
        width: 300,
        backgroundColor: '#000'
    },
    message: {
        fontSize: 12,
        color: "#a4a4a4",
    },
});

export default styles;