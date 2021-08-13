import React, { useState, Fragment, useEffect } from 'react';
import {View, StatusBar} from 'react-native';
import { Header, KirriTextInput, Switch, Popup } from '@components';
import {
    SafeAreaViewTop,
    SafeAreaViewBottom,
    ContentContainer,
    MakeNicknameTitle,
    NicknameInputWarp,
    Content,
    Profile,
    SettingIcon,
    VersionText,
    LeaveKKiriTitle,
    LeaveKKiriWarp,
    LeaveKirriPopupContent,
    SignoutImage,
    SignoutText,
    ProfileImage,
    NicknameWarp,
    EditProfile,
    NicknameText
} from './setting.style';
import { SelectProfileImage } from '../nickname/SelectProfileImg';
import { observer } from 'mobx-react';
import { UserStore } from '@store';
import {debounce} from 'lodash';
import { userApis } from '@apis';
import { SettingContent } from './SettingContent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate, navigateGoBack, navigateWithoutRefresh } from '@config/navigator';
import { UpdateUserMeResType } from '@type-definition/user';
import {getProfileImage, ProfileImageTypes} from '@utils';

export const Settings = observer(()=> {
    const {nickname, profileImage, pushStatus} = UserStore;
    const [newNickname, setNewNickname] = useState('');
    const [duplicate, setDuplicate] = useState(false);
    const [leavKKiriPopupOpen, setLeavKKiriPopupOpen] = useState(false);
    
    /**
     * 알림설정 여부
     */
    const [pushNotification, setPushNotification] = useState(pushStatus);

    const checkDuple = debounce(() => {
        try {
            userApis.checkNicknameDupl(nickname).then((result: any)=>{
                if (result.exists) {
                    setDuplicate(true);
                    
                }else {
                    setDuplicate(false);
                }
                
            })
            
        } catch (error) {
            
        }
    }, 1000);

    /**
     * 알림설정 토글시 이벤트
     * @param payload 
     */
    const handleChangeAlarmState = async (value : boolean) =>{
        try{
            setPushNotification(value);
            AsyncStorage.setItem('pushNotification', JSON.stringify(value));
            userApis.updatePush({
                CHEERING: value,
                NEW_RECORD: value,
                NOTIFICATION: value,
                INVITATION: value
            }).catch((err) => {
                console.log(err.response);
            })
        }catch(error){
            console.log("device",error);
        }
    }


    const logout = () => {
        UserStore.logout();
        AsyncStorage.removeItem('userKey', ()=>{
            navigate('Login', null);
        });
    }

    const handleSignout = async () => {
        try {
            const result = await userApis.deleteUserMe();
            console.log(result);
            UserStore.logout();
            setLeavKKiriPopupOpen(false);
            logout();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('pushNotification', (err, value) => {
            setPushNotification(value ? JSON.parse(value) as boolean : false);
        });
    }, []);

    return (
        <Fragment>
            {/* <SafeAreaViewTop>
                
            </SafeAreaViewTop> */}
            {/* <StatusBar barStyle="light-content" /> */}
            <SafeAreaViewBottom>
                <Header
                    leftIcon={require('@assets/icons/back.png')}
                    onLeftClick={()=>{navigateGoBack()}}
                    title='설정'
                ></Header>
                <ContentContainer>
                    <Profile>
                        <ProfileImage source={profileImage}/>
                        <NicknameWarp><NicknameText>{nickname}</NicknameText><EditProfile onPress={()=>{navigate('EditPersonalInfo', null)}}></EditProfile></NicknameWarp>
                    </Profile>
                    <Content>
                                
                        <SettingContent
                            icon={require('@assets/images/settings/setting_notice_setting.png')}
                            title='알림 설정'

                        >
                            <Switch
                                value={pushNotification}
                                onValueChange={handleChangeAlarmState}
                            ></Switch>
                        </SettingContent>
                        <SettingContent
                            icon={require('@assets/images/settings/setting_personal_info.png')}
                            title='공지 사항'
                        >
                            <TouchableOpacity
                                onPress={
                                    ()=>{
                                        navigateWithoutRefresh('TermsWebview', {type: 'SERVICE', title: '이용 약관'});
                                    }
                                }
                            >
                                <SettingIcon source={require('@assets/images/settings/setting_next_normal.png')}/></TouchableOpacity>
                        </SettingContent>
                        <SettingContent
                            icon={require('@assets/images/settings/setting_personal_info.png')}
                            title='이용 약관'
                        >
                            <TouchableOpacity
                                onPress={
                                    ()=>{
                                        navigateWithoutRefresh('TermsWebview', {type: 'SERVICE', title: '이용 약관'});
                                    }
                                }
                            >
                                <SettingIcon source={require('@assets/images/settings/setting_next_normal.png')}/></TouchableOpacity>
                        </SettingContent>
                        <SettingContent
                            icon={require('@assets/images/settings/setting_personal_info.png')}
                            title='개인정보 처리 방침'
                        >
                            <TouchableOpacity
                                onPress={
                                    ()=>{
                                        navigateWithoutRefresh('TermsWebview', {type: 'PRIVACY', title: '개인정보 처리 방침'});
                                    }
                                }
                            >
                                <SettingIcon source={require('@assets/images/settings/setting_next_normal.png')}/></TouchableOpacity>
                        </SettingContent>
                        <SettingContent
                            icon={require('@assets/images/settings/setting_version.png')}
                            title='버전정보'

                        >
                            <VersionText>V1.0.0</VersionText>
                        </SettingContent>
                        <SettingContent
                            icon={require('@assets/images/settings/setting_logout.png')}
                            title='로그아웃'
                        >
                            <TouchableOpacity
                                onPress={()=>{logout()}}
                            ><SettingIcon source={require('@assets/images/settings/setting_next_normal.png')}/></TouchableOpacity>
                        </SettingContent>

                    </Content>
                    <LeaveKKiriWarp
                        onPress={()=>{setLeavKKiriPopupOpen(true)}}
                    ><LeaveKKiriTitle>아쉽지만 탈퇴 할래요.</LeaveKKiriTitle></LeaveKKiriWarp>
                </ContentContainer>
                
            </SafeAreaViewBottom>
            <Popup
                open={leavKKiriPopupOpen}
                cancel='맞아요'
                confirm='싫어요'
                onConfirm={()=>{setLeavKKiriPopupOpen(false)}}
                onCancel={handleSignout}
                width={300}
                handelOpen={(key: boolean)=>{}}
                content={
                    <LeaveKirriPopupContent>
                        <SignoutImage source={require('@assets/images/settings/popup_setting_account_delete_bgimg.png')}></SignoutImage>
                        <SignoutText>정말 탈퇴하는거에요?</SignoutText>
                    </LeaveKirriPopupContent>
                }
            />
        </Fragment>
    )
})