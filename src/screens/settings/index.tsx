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
import { navigate, navigateGoBack } from '@config/navigator';
import { UpdateUserMeResType } from '@type-definition/user';
import {getProfileImage, ProfileImageTypes} from '@utils';

export const Settings = observer(()=> {
    const {nickname, profileImagePath} = UserStore;
    const [newNickname, setNewNickname] = useState('');
    const [duplicate, setDuplicate] = useState(false);
    const [leavKKiriPopupOpen, setLeavKKiriPopupOpen] = useState(false);

    /**
     * 알림설정 여부
     */
    const [pushNotification, setPushNotification] = useState(false);

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

    const updateUserInfo = async (payload: UpdateUserMeResType) =>{
        try{
            const data = await userApis.updateUserMe(payload);
            alert(data)
            payload.profileImagePath && (UserStore.changeProfileImg(payload.profileImagePath));
            payload.nickname && (UserStore.setNickname(payload.nickname));
        }catch(error){

        }
    }

    const logout = () => {
        AsyncStorage.removeItem('userKey', ()=>{
            navigate('Login', null);
        });
    }

    const handleSignout = async () => {
        try {
            await userApis.deleteUserMe();
            setLeavKKiriPopupOpen(false);
            logout();
        } catch (error) {
            
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
                        {/* <SelectProfileImage
                            selectedImage={profileImagePath[1]}
                            selecteChanged={(key)=>{
                                updateUserInfo({profileImagePath:'profile:'+key});
                            }}
                        ></SelectProfileImage>
                        <NicknameInputWarp>
                            <MakeNicknameTitle>한글, 영문, 숫자를 사용해 멋진 닉네임을 만들어주세요</MakeNicknameTitle>
                            <KirriTextInput
                                onChange={(text)=>{
                                    setNewNickname(text);
                                
                                }}
                                placeholder='멋진자몽'
                                text={nickname}
                                rightText='끼리'
                                onError={duplicate}
                                errorMessage='사용할 수 없는 닉네임이예요'
                            />
                        </NicknameInputWarp> */}
                        <ProfileImage source={getProfileImage(profileImagePath[1] as ProfileImageTypes)}/>
                        <NicknameWarp><NicknameText>{nickname}</NicknameText><EditProfile></EditProfile></NicknameWarp>
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
                            title='개인정보 처리 방침'

                        >
                            <SettingIcon source={require('@assets/images/settings/setting_next_normal.png')}/>
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