import React, {ReactElement, useCallback, useState, useEffect} from 'react'
import { View, Button, AsyncStorage } from 'react-native'

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import styles, { HomeContainer, ContentWarp, DiaryListWarp, IconWarp, ProfileWarp, ProfileIcon, NicknameWarp, NicknameContainer, DiaryTitle, DiaryList, RecentContentWarp, RecentContentList } from './home.style';
import {RecentContent} from './RecentContent';

import {Text, Background, IconButton } from "@components";

import {observer} from 'mobx-react';
import { UserStore } from '@store';
import { SafeAreaView } from 'react-native-safe-area-context';
import {userApis} from '@apis';


type HomeProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};



const Home = observer(({navigation}:HomeProps)=> {
    const [userLoading, setUserLoading] = useState(false);
    const {nickname } = UserStore;
    
    const getUser = async () => {
        try {
            const user = await userApis.userMe();
            UserStore.login(user);
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getUser();
    }, []);
    if (userLoading){
        return <></>;
    }
    return (
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
                
                <DiaryListWarp>
                    <RecentContentWarp>
                        <DiaryTitle>최근 작성된 기록</DiaryTitle>
                        <RecentContentList
                            alwaysBounceVertical={true}
                        >
                            <RecentContent
                                title='test'
                                nickname='test'
                                diaryName='test'
                                backgroundColor='purple'
                            ></RecentContent>
                        </RecentContentList>
                    </RecentContentWarp>
                    <DiaryList>
                        <DiaryTitle>다이어리 목록</DiaryTitle>
                    </DiaryList>
                    <View style={{height: 85}}></View>
                </DiaryListWarp>
            </ContentWarp>
            
        </HomeContainer>
    )
})

export default Home;