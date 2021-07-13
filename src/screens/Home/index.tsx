
import React, {ReactElement, useCallback, useState, useEffect, useRef} from 'react'
import { View, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import styles, { HomeContainer, ContentWarp, DiaryListWarp, IconWarp, ProfileWarp, ProfileIcon, NicknameWarp, NicknameContainer, DiaryTitle, DiaryList, RecentContentWarp, RecentContentList, DiaryListContainer, RecommandCreateDiary } from './home.style';
import {RecentContent} from './RecentContent';

import {Background, IconButton } from "@components";

import { observer } from 'mobx-react';
import { UserStore } from '@store';
import { SafeAreaView } from 'react-native-safe-area-context';
import {userApis, diaryApis} from '@apis';

import {Diary} from './Diary';
import { DiariesResType, DiaryResType } from '@type-definition/diary';
import { RecentRecodeType } from '@type-definition/user';
import { CreateDiary } from './CreateDiary';
import {CreateDiaryModal} from './CreateDiaryModal';



type HomeProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};



const Home = observer(({navigation}:HomeProps)=> {
    const [userLoading, setUserLoading] = useState(true);
    const [diaryLoading, setDiaryLoading] = useState(true);
    const {nickname } = UserStore;
    const [diaryList, setDiaryList] = useState<DiaryResType[]>([]);
    const [pageNum, setPageNum] = useState<any>();
    const pageInfo = useRef<any>();
    const [recentRecord, setRecentRecord] = useState<RecentRecodeType[]>();
    const [createDiaryOpen, setCreateDiaryOpen] = useState(false);
    
    const getUser = async () => {
        try {
            const user = await userApis.userMe();
            UserStore.login(user);
            setUserLoading(false);
        } catch (error) {
            
        }
    }

    const getDiaries = async () => {
        try {
            const data = await diaryApis.getDiaries();
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
                            <ProfileIcon></ProfileIcon>
                        </View>
                        <NicknameContainer>
                        <NicknameWarp>{nickname}</NicknameWarp>
                        </NicknameContainer>
                    </ProfileWarp>
                    {
                        diaryList.length?
                            <DiaryListWarp>
                                <RecentContentWarp>
                                    <DiaryTitle>최근 작성된 기록</DiaryTitle>
                                    <RecentContentList
                                        alwaysBounceVertical={true}
                                    >
                                        {
                                            recentRecord? recentRecord.map((recode:RecentRecodeType)=>      
                                                <RecentContent
                                                    title='test'
                                                    nickname='test'
                                                    diaryName='test'
                                                    backgroundColor='purple'
                                                />):
                                                <></>
                                            }
                                    </RecentContentList>
                                </RecentContentWarp>
                                <DiaryListContainer>
                                    <DiaryTitle>다이어리 목록</DiaryTitle>
                                    <DiaryList>
                                        {
                                            diaryList?
                                            diaryList.map((diary: DiaryResType)=>
                                                <Diary
                                                    diaryTitle={diary.title}
                                                    members={diary.members.length}
                                                    coverType={diary.icon.split(':')[0]}
                                                    coverId={diary.icon.split(':')[1]}
                                                />
                                            ): <></>
                                        }
                                    </DiaryList>
                                    <CreateDiary
                                        onClick={()=>{setCreateDiaryOpen(true)}}
                                    />
                                </DiaryListContainer>
                            </DiaryListWarp>
                            :
                            <RecommandCreateDiary>
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