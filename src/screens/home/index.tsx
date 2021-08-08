
import React, {ReactElement, useCallback, useState, useEffect, useRef, Fragment} from 'react'
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

import {IconButton} from "@components";

import { observer } from 'mobx-react';
import { UserStore } from '@store';
import {userApis, diaryApis} from '@apis';

import {Diary} from './Diary';
import { DiaryResType } from '@type-definition/diary';
import { RecentRecodeType } from '@type-definition/user';
import { CreateDiary } from './CreateDiary';
import {CreateDiaryModal} from './CreateDiaryModal';
import {navigate} from '@config/navigator';
import { autorun } from 'mobx';



type HomeProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};


const Profile =observer(() => {
    const {nickname, profileImage, profileImagePath } = UserStore;
    return (
        <ProfileWarp>
            <IconWarp>
                <IconButton
                    onPress={()=> {                                    
                        navigate("RecordInput", { diary : null })
                    }}
                    style={styles.iconSpace}
                    icon={require('@assets/images/home_writing_normal.png')}
                />
                <IconButton
                    onPress={() => {
                        navigate('MassageList', null);
                    }}
                    style={styles.iconSpace}
                    icon={require('@assets/images/home_notice_normal.png')}
                />
                <IconButton
                    onPress={() => {
                        navigate('Settings', null);
                    }}
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
    )
})


const Home = ()=> {
    const [userLoading, setUserLoading] = useState(true);
    const [diaryLoading, setDiaryLoading] = useState(true);
    const {nickname, profileImage, profileImagePath } = UserStore;
    const [diaryList, setDiaryList] = useState<DiaryResType[]>([]);
    const [pageNum, setPageNum] = useState<any>();
    const pageInfo = useRef<any>();
    const [recentRecord, setRecentRecord] = useState<RecentRecodeType[]>();
    const [createDiaryOpen, setCreateDiaryOpen] = useState(false);
    
    const getUser = async () => {
        if (nickname!=='') {
            setUserLoading(false);
            return;
        }
        try {
            UserStore.login();
            setUserLoading(false);
        } catch (error) {
            navigate('Login', null)
        }
    }

    const getDiaries = async () => {
        try {
            const data = await diaryApis.getDiaries();
            pageInfo.current = {totalPages: data.totalPages, totalCounts: data.totalCounts}; 
            setDiaryList(data.elements||[]);
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
        <Fragment>
            <HomeContainer>
                <ContentWarp>
                    <Profile></Profile>
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
                                    <DiaryList
                                        contentContainerStyle={
                                            {display: 'flex',
                                            flexDirection:'row',
                                            justifyContent: 'space-between',
                                            
                                            flexWrap: 'wrap',}}
                                    >  
                                        {
                                            diaryList?
                                            diaryList.map((diary: DiaryResType)=>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        navigate("RecordInfo" , { diary : diary })
                                                    }}
                                                    key={diary.uuid}
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
        </Fragment>
    )
}
export default Home;