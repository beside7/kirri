import React, { useEffect, useState } from 'react'
import { View, FlatList , TouchableOpacity, Image, SafeAreaView, Dimensions, } from 'react-native'
import { Background, Text_2, Header  } from "@components";
import styles from './style'
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { recodeApis } from "@apis"
import { RecordResType, RecordsResType } from "@type-definition/diary"
import { Menu } from 'react-native-paper';

const SCREEN_HEIGHT = Dimensions.get("screen").height;




type RecordListProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "RecordList">;
    route: RouteProp<StackNavigatorParams, "RecordList">;
}


export default function RecordList({navigation, route} : RecordListProps) {

    const [visible, setVisible] = React.useState(false);
    const closeMenu = () => setVisible(false);
    
    const openMenu = () => setVisible(true);

    const [loading, setLoading] = useState(false)

    const diary = route.params.diary;

    /**
     * 기록리스트 부분
     */
    const [list, setList] = useState<RecordResType[]>([])

    const getRecordList = async (uuid : string | undefined) => {
        try {
            // console.log(uuid);
            if(uuid){
                setLoading(true)
                const getRecordRes = await recodeApis.getRecords(uuid);
                const { element } = getRecordRes
                // sconsole.log(getRecordRes);
                setList(element)
                setLoading(false)
                return getRecordList;
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     console.log(list);
    // }, [list])

    useEffect(() => {        
        
        if(diary){
            const { uuid } = diary
            getRecordList(uuid)
        }
        return () => {
            
        }
    }, [])

    return (
        <Background>
            <Header
                title="처음 우리들의 끼리 다이러리"
                leftIcon={
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Image 
                            style={{ width: 24, height: 24 }}
                            source={require("@assets/icons/back.png")}
                        />
                    </TouchableOpacity>
                }

                rightIcon={
                    // 우측 상단 메뉴
                    <Menu
                        style={{
                            top: 105
                        }}
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <TouchableOpacity onPress={openMenu}>
                                <Image 
                                    style={{ width: 24, height: 24 }}
                                    source={require("@assets/icons/menu.png")}
                                />
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item onPress={() => {}} title="우리끼리 응원하기" />
                        <Menu.Item onPress={() => {
                            closeMenu()
                            navigation.navigate("FriendMain", { diary : diary })
                        }} title="친구 관리" />
                    </Menu>
                }
            />
            <SafeAreaView style={{flex: 1}}>
                <FlatList 
                    contentContainerStyle={{ backgroundColor: "#f4f4f8" }}
                    data={list} 
                    renderItem={( {item : { uuid , title, body , images, createdDate, createdBy , updatedDate} }) => (
                        <View style={styles.listItemContainer}>
                            <View style={styles.listItemTop}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image 
                                        source={require("@assets/images/profile/home_profile_02.png")}
                                        style={{ width: 36, height: 36, marginRight: 8 }}
                                    />
                                    <Text_2 style={{fontSize: 12, color: "#24242e"}} >닉네임</Text_2>
                                </View>
                                <Text_2 style={styles.listItemCreatedDate}>{createdDate}</Text_2>
                            </View>
                            <View style={styles.listItemMiddle}>
                                {
                                    (images.length > 0) && 
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("RecordView" , {  diary: diary , record : { uuid , title, body , images, createdDate, createdBy , updatedDate} })
                                        }}
                                    >
                                        <Image 
                                            style={styles.listItemThumbnail}
                                            source={{
                                            uri: images[0].path
                                            }}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("RecordView" , {  diary: diary , record : { uuid , title, body , images, createdDate, createdBy , updatedDate} })
                                }}
                            >
                                <View style={{ paddingLeft: 64 }}>
                                    <Text_2 style={styles.listItemTitle}>{title}</Text_2>
                                </View>
                                <View style={{ paddingLeft: 64 }}>
                                    <Text_2 style={styles.listItemBody}>
                                        {body.replace(/(<([^>]+)>)/ig, "")}
                                    </Text_2>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) =>
                        `${index}`
                    } 

                    ListEmptyComponent={
                        <View style={styles.ListEmptyContainer}>
                            <Image 
                                style={styles.ListEmptyThumbnail}
                                source={require("@assets/images/diary/diary_history_empty.png")}
                            />
                            <View
                                style={styles.ListEmptyContent}
                            >
                                <Text_2>앗!</Text_2>
                                <Text_2>기록이 없어요.</Text_2>
                            </View>
                        </View>
                    }

                    // ListFooterComponent={
                    //     () => {
                    //         return (
                    //             <View>
                    //                 <View>
                    //                     <Text_2 bold="Regular" style={{ color : "#bebece" , fontSize: 12 }}>
                    //                         오늘의 너를 기억할께
                    //                     </Text_2>
                    //                 </View>
                    //             </View>
                    //         )
                    //     }
                    // }
                    ListFooterComponentStyle={styles.bottomTab}
                />
            </SafeAreaView>
            <View style={styles.editButton}>
                {
                    (!list || list.length === 0)  &&
                    <View style={styles.emptyMessage}>
                        <View style={styles.emptyMessageContainer_1}>
                            <Text_2 style={{ fontSize: 11 , color: "#fff" , fontFamily: "SpoqaHanSansNeo-Regular" }}>기록 작성 버튼을 눌러</Text_2>
                            <Text_2 style={{ fontSize: 11 , color: "#fff" , fontFamily: "SpoqaHanSansNeo-Regular" }}>첫 기록을 남겨봐요 :)</Text_2>
                        </View>
                        <View style={styles.emptyMessageContainer_2}/>
                    </View>
                }
                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate("RecordInput" , { diary : diary, record : null })
                    }}
                    >
                    <Image 
                        source={require("@assets/icons/edit.png")}
                        style={{ width: 114, height: 114 }}
                    />
                </TouchableOpacity>
            </View>
        </Background>
    )
}
