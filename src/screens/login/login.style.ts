import { globalStyles } from "@utils";
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        
    },
    swiperContainer:{
        flex: 1,
        width: '100%',
        display: 'flex',
        paddingTop: 189,
        paddingHorizontal: 30,
    },
    swiperWarp: {
        width: '100%',
        minHeight: 281,
        padding: 0,
        marginHorizontal: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
    },
    swiperContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    swiperImage: {
        width: 315,
        height: 240,
        resizeMode: 'contain',
    },
    swiperText: {
        textAlign: 'center'
    },
    swiperIndexWarp: {
        marginTop: 48,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    swiperIndex: {
        marginHorizontal: 4,
        width: 6, 
        height: 6,
        borderRadius: 3,
        backgroundColor: '#e8e8e8',
        
    },
    swiperIndexActive: {
        marginHorizontal: 4,
        width: 20, 
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ffcc24'
    },
    kakaoButton: {
        marginBottom: 8,
        width: 335,
        height: 56
    },
    buttonImage:{
        width: 335,
        resizeMode: 'contain',
    },
    appleButton: {
        width: 335,
        height: 56,
        marginBottom: 100
    },
    
});

export default styles;