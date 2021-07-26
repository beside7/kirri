import { StyleSheet } from "react-native";
import { Dimensions, } from 'react-native'

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const HEADER_HEIGHT = 174

const styles = StyleSheet.create({
    bottomTab: {
        backgroundColor: "#F2F2F2",
        width: "100%",
        height: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    editButton: {
        position: "absolute",
        right: - 10,
        bottom: 20
    },
    listItemContainer: {
        paddingTop: 24,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: "#ffffff",
        marginVertical: 4,
    },
    listItemTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 17, alignItems: "center" },
    listItemCreatedDate: { fontSize: 12, color: "#6f6f7e" },
    listItemMiddle: { alignItems: "flex-end" },
    listItemThumbnail: { width: 291, height: 200, borderRadius: 10 },
    ListEmptyContainer: {
        width: "100%",
        backgroundColor: "#fff",
        height: SCREEN_HEIGHT - (HEADER_HEIGHT),
        flex: 1,
        alignItems: "center",
        paddingTop: 100,
        // borderWidth: 1
    },
    ListEmptyThumbnail: {
        width: 125,
        height: 125
    },
    ListEmptyContent: {
        marginTop: 24,
        alignItems: "center",
    },
    emptyMessage: {
        position: "absolute",
        bottom: 110,
        right: 30,
    },
    emptyMessageContainer_1 : {
        backgroundColor: "#17171c",
        paddingVertical: 13,
        paddingLeft: 16,
        paddingRight: 23,
        width: 155,
        height: 55,
        borderRadius: 10
    },
    emptyMessageContainer_2 : {
        // backgroundColor: "#17171c",
        top: 0,
        left: 120,
        width: 5,
        height: 5,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderTopWidth: 15,
        borderRightWidth: 9,
        borderBottomWidth: 0,
        borderLeftWidth: 9,
        borderTopColor: "#17171c",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent",
    },
    listItemTitle : { color: "#17171c", fontSize: 16, fontFamily: "SpoqaHanSansNeo-Regular", marginTop: 8 },
    listItemBody : { color: "#6f6f7e", fontSize: 12, fontFamily: "SpoqaHanSansNeo-Regular", marginTop: 6 }
});

export default styles;