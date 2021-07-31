import React, { useEffect, useState } from 'react'
import { View, FlatList , TouchableOpacity, Image, SafeAreaView, Dimensions, Alert } from 'react-native'
import { Background, Text_2, Header  } from "@components";
import styles from './style'
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { recordApis, diaryApis } from "@apis"
import { RecordResType, RecordsResType } from "@type-definition/diary"
import { Menu } from 'react-native-paper';

import { observer } from 'mobx-react';
import { UserStore } from '@store';

import DeleteConfirm from './delete-confirm'


const SCREEN_HEIGHT = Dimensions.get("screen").height;




type RecordListProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "RecordList">;
    route: RouteProp<StackNavigatorParams, "RecordList">;
}

export const RecordList = observer(({navigation, route} : RecordListProps) => {

    /**
     * mobx 으로 유저 닉네임 추출
     */
    const { nickname } = UserStore;

    /**
     * 우측 상단메뉴 노출여부
     */
    const [visible, setVisible] = React.useState(false);
    /**
     * 우측 상단메뉴 열기
     */
    const closeMenu = () => setVisible(false);
    /**
     * 우측 상단메뉴 닫기
     * @returns 
     */
    const openMenu = () => setVisible(true);
    /**
     * 로딩
     */
    const [loading, setLoading] = useState(false)
    /**
     * info 에서 넘겨받은 다이러리 정보
     */
    const diary = route.params.diary;

    /**
     * 현재 로그인한 사용자가 해당 다이러리에서 관리자인지 판별하는 부분 
     * -> true : 관리자 , false : 일반 유저
     */
    const isAdministrator = diary?.members.find((item) => item.nickname === nickname )?.authority === "DIARY_OWNER"

    /**
     * 기록리스트 부분
     */
    const [list, setList] = useState<RecordResType[]>([])

    /**
     * 삭제동의창 여부
     */
    const [deleteConfirm, setDeleteConfirm] = useState(false)


    /**
     * 다이러리 삭제
     */
    const deleteDiary = async () => {
        try {
            if(diary){
                await diaryApis.deleteDiary(diary.uuid);
                Alert.alert("삭제되었습니다.");
                navigation.replace("Home");
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 기록목록 가져오기
     * @param uuid 다이러리 아이디
     * @returns 기록목록
     */
    const getRecordList = async (uuid : string | undefined) => {
        try {
            // console.log(uuid);
            if(uuid){
                setLoading(true)
                const getRecordRes = await recordApis.getRecords(uuid);
                const { elements } = getRecordRes
                // console.log(getRecordRes);
                setList(elements)
                setLoading(false)
                return getRecordList;
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                title={ diary ? diary.title : "처음 우리들의 끼리 다이러리" }
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

                // 우측 상단 메뉴
                rightIcon={
                    // 관리자 일경우
                    isAdministrator ? 
                    (
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
                            <Menu.Item onPress={() => {}} title="끼리 응원하기" />
                            <Menu.Item onPress={() => {
                                closeMenu()
                                navigation.navigate("FriendMain", { diary : diary })
                            }} title="끼리 멤버" />
                            <Menu.Item onPress={() => {
                                closeMenu()
                                navigation.navigate("DiaryConfig", { diary : diary })
                            }} title="다이러리 수정" />
                            <Menu.Item onPress={() => {
                                setDeleteConfirm(true)
                            }} title="다이러리 삭제" />
                            <Menu.Item onPress={() => {}} title="나가기" />
                        </Menu>
                    ) :
                    // 일반 유저일경우
                    (
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
                            <Menu.Item onPress={() => {}} title="끼리 응원하기" />
                            <Menu.Item onPress={() => {
                                closeMenu()
                                navigation.navigate("FriendMain", { diary : diary })
                            }} title="끼리 멤버" />
                            <Menu.Item onPress={() => {}} title="나가기" />
                        </Menu>
                    )
                }
            />
            {/* 다이러리 삭제창 */}
            <DeleteConfirm 
                modal={deleteConfirm}
                onClose={() => {
                    setDeleteConfirm(false)
                }}
                onConfirm={deleteDiary}
            />
            {/* 리스트 */}
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
                                    <Text_2 style={styles.listItemBody} numberOfLines={3}>
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
                        navigation.navigate("RecordInput" , { diary : diary })
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
})


export default RecordList;