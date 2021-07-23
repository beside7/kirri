
import React, {ReactElement, useCallback, useState, useEffect, useRef} from 'react'
import { View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import styles, {
    HomeContainer,
    ContentWarp,
    DiaryListWarp,
    IconWarp,
    ProfileWarp,
    ProfileImageWarp,
    NicknameWarp,
    NicknameContainer,
    DiaryTitle,
    DiaryList,
    RecentContentWarp,
    RecentContentList,
    DiaryListContainer,
    RecommandCreateDiary,
    ProfileImage,
    DiaryEmptyImageWarp,
    DiaryEmptyImage,
    LogoType,
    DiaryContainer,
    DiaryListBottom,
    DiaryListBottomImage,
    DiaryListBottomMention
} from './home.style';
import {RecentContent} from './RecentContent';

import {Background, Button, IconButton } from "@components";

import { observer } from 'mobx-react';
import { UserStore } from '@store';
import { SafeAreaView } from 'react-native-safe-area-context';
import {userApis, diaryApis} from '@apis';

import {Diary} from './Diary';
import { DiaryResType } from '@type-definition/diary';
import { RecentRecodeType } from '@type-definition/user';
import { CreateDiary } from './CreateDiary';
import {CreateDiaryModal} from './CreateDiaryModal';
import {navigate} from '@config/navigator';



type HomeProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};



const Home = observer(({navigation}:HomeProps)=> {
    const [userLoading, setUserLoading] = useState(true);
    const [diaryLoading, setDiaryLoading] = useState(true);
    const {nickname, profileImage } = UserStore;
    const [diaryList, setDiaryList] = useState<DiaryResType[]>([]);
    const [pageNum, setPageNum] = useState<any>();
    const pageInfo = useRef<any>();
    const [recentRecord, setRecentRecord] = useState<RecentRecodeType[]>();
    const [createDiaryOpen, setCreateDiaryOpen] = useState(false);
    
    const getUser = async () => {
        if (nickname) {
            setUserLoading(false);
            return;
        }
        try {
            const user = await userApis.userMe();
            UserStore.login(user);
            setUserLoading(false);
        } catch (error) {
            navigate('Login', null)
        }
    }

    const getDiaries = async () => {
        try {
            const data = await diaryApis.getDiaries();
            console.log(data);
            
            pageInfo.current = {totalPages: data.totalPages, totalCounts: data.totalCounts};            
            setDiaryList(data.element||[]);
            setDiaryLoading(false);
        } catch (error) {
            
        }
    }

    const getRecentRecord = async () => {
        try {
            const data = await userApis.recentRecords();
            setRecentRecord(data.elements);
        } catch (error) {
            
        }
    }


    useEffect(()=>{
        getUser();
        getDiaries();
        getRecentRecord();
    }, []);

    if (userLoading || diaryLoading){
        return <></>;
    }

    return (
        <>
            <HomeContainer>
                <ContentWarp>
                    <ProfileWarp>
                        <IconWarp>
                            <IconButton
                                style={styles.iconSpace}
                                icon={require('@assets/images/home_writing_normal.png')}
                            />
                            <IconButton
                                style={styles.iconSpace}
                                icon={require('@assets/images/home_notice_normal.png')}
                            />
                            <IconButton
                                icon={require('@assets/images/home_setting_normal.png')}
                            />
                        </IconWarp>
                        <View>
                            <ProfileImageWarp>
                                <ProfileImage source={profileImage}></ProfileImage>
                            </ProfileImageWarp>
                        </View>
                        <NicknameContainer>
                        <NicknameWarp>{nickname}</NicknameWarp><View><LogoType source={require('@assets/images/home/home_logotype.png')}/></View>
                        </NicknameContainer>
                    </ProfileWarp>
                    {
                        diaryList.length?
                            <DiaryListWarp>
                                {
                                    recentRecord?
                                        <RecentContentWarp>
                                            <DiaryTitle>최근 작성된 기록</DiaryTitle>
                                            <RecentContentList
                                                horizontal={true}
                                                alwaysBounceVertical={true}
                                            >
                                                {
                                                    recentRecord? recentRecord.map((recode:RecentRecodeType, index)=>      
                                                        <RecentContent
                                                            title={recode.recordTitle}
                                                            nickname={recode.recordCreatedBy}
                                                            diaryName={recode.diaryTitle}
                                                            backgroundColor='purple'
                                                            key={'recent_recode_'+index}
                                                        />):
                                                        <></>
                                                    }
                                            </RecentContentList>
                                        </RecentContentWarp>:<></>
                                }
                                
                                <DiaryListContainer>
                                    <DiaryTitle>다이어리 목록</DiaryTitle>
                                    <DiaryList>
                                        {
                                            diaryList?
                                            diaryList.map((diary: DiaryResType)=>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        navigation.navigate("RecordInfo" , { diary : diary })
                                                    }}
                                                >
                                                    <Diary
                                                        diaryTitle={diary.title}
                                                        members={diary.members.length}
                                                        coverType={diary.icon.split(':')[0]}
                                                        coverId={diary.icon.split(':')[1]}
                                                    />
                                                </TouchableOpacity>
                                            ): <></>
                                        }
                                        <DiaryContainer>
                                            <CreateDiary
                                                onClick={()=>{setCreateDiaryOpen(true)}}
                                            />
                                        </DiaryContainer>
                                    </DiaryList>
                                    
                                </DiaryListContainer>
                                <DiaryListBottom>
                                    <DiaryListBottomMention>오늘의 너를 기억할게 :D</DiaryListBottomMention>
                                    <DiaryListBottomImage source={require('@assets/images/home/home_bottom_illust.png')}/>
                                </DiaryListBottom>
                            </DiaryListWarp>
                            :
                            <RecommandCreateDiary>
                                <DiaryEmptyImageWarp>
                                    <DiaryEmptyImage source={require('@assets/images/home/home_diary_add_empty.png')}></DiaryEmptyImage>
                                </DiaryEmptyImageWarp>
                                <CreateDiary
                                    onClick={()=>{setCreateDiaryOpen(true)}}
                                />
                            </RecommandCreateDiary>
                    }
                    
                </ContentWarp>
            </HomeContainer>
            <CreateDiaryModal
                open={createDiaryOpen}
                reloadDiary={getDiaries}
                close={()=>{setCreateDiaryOpen(false)}}
            ></CreateDiaryModal>
        </>
    )
})
export default Home;