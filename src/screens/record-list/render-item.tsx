import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { RecordResType, DiaryResType  } from "@type-definition/diary"
import { Text_2  } from "@components";
import styles from './style'
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";

import dateFormat from 'dateformat'
import { stringToDatetime, ProfileImages , ProfileImageTypes } from '@utils'

type RenderProps = {
    item : RecordResType,
    navigation: StackNavigationProp<StackNavigatorParams, "RecordList">
    diary: DiaryResType | null
}

/**
 * 리스트에 그려질 컨포넌트
 * @param props
 * @returns 
 */
export default function RenderItem({ item : { id, uuid , title, body , images, createdDate, createdBy , updatedDate, createdByNickname } , navigation, diary } : RenderProps ) {
    
    const type = (diary) ? diary.members.find(({ nickname }) => nickname === createdByNickname )?.profileImagePath.split(":")[1] as ProfileImageTypes : "01"    
    const diaryUuid = (diary) ? diary.uuid : null
    const profileImage = ProfileImages[type]
    
    return (
        <View style={styles.listItemContainer}>
            <View style={styles.listItemTop}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* 유저 썸네일 이미지 */}
                    <Image 
                        source={profileImage}
                        style={{ width: 36, height: 36, marginRight: 8 }}
                    />
                    {/* 유저 닉네임 */}
                    <Text_2 style={{fontSize: 12, color: "#24242e"}} >{createdByNickname}</Text_2>
                </View>
                {/* 생성일자 */}
                <Text_2 style={styles.listItemCreatedDate}>{dateFormat(stringToDatetime(createdDate) , 'yyyy-mm-dd HH:MM:ss')}</Text_2>
            </View>
            <View style={styles.listItemMiddle}>
                {
                    (images.length > 0) && 
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("RecordView" , { diaryUuid : diaryUuid , recordUuid : uuid })
                            }}
                        >
                            {/* 글쓴이가 업로드한 이미지 */}
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
                    navigation.navigate("RecordView" , { diaryUuid : diaryUuid , recordUuid: uuid })
                }}
            >
                {/* 제목 */}
                <View style={{ paddingLeft: 64 }}>
                    <Text_2 style={styles.listItemTitle}>{title}</Text_2>
                </View>
                {/* 본문 */}
                <View style={{ paddingLeft: 64 }}>
                    <Text_2 style={styles.listItemBody} numberOfLines={3}>
                        {/* html 태크 제거 */}
                        {body.replace(/(<([^>]+)>)/ig, "")}
                    </Text_2>
                </View>
            </TouchableOpacity>
        </View>
    )
}
