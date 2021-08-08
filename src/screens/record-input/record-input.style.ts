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
    insertImages : { width: 80, height: 80 },
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
    },
    bottomPopupContainer:{
        height: 550,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingTop: 20
    },
    bottomPopupBarContainer: { 
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4 
    },
    bottomPopupBar: {
        width: 42,
        height: 6,
        backgroundColor: "#d1d1de",
        borderRadius: 10,
        marginBottom: 20,
    },
    bottomPopupTitleContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50,
    },
    bottomPopupTitle: {
        fontSize: 16,
        color: "#17171c"
    },
    diatyListItemContainer: {
        height: 60,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 34,
        flexDirection: "row",
    },
    diatyListItemThumbnailContainer: {
        marginRight: 12
    },
    selectDiaryImage : {
        borderWidth: 3,
        borderColor: "yellow",
        borderRadius: 100
    },
    diatyListItemTitle: {
        fontSize: 16,
        color: "#17171c"
    },
    diatyListItemCount: {
        color: "#6f6f7e",
        fontSize: 12,
    },
    bottomPopupButtonContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60
    },
    bottomPopupDisableButton: {
        width: 307,
        height: 50,
        backgroundColor: "#f4f4f8",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    bottomPopupEnableButton: {
        width: 307,
        height: 50,
        backgroundColor: "#ffdd1f",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
})


export default styles;