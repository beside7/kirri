import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Switch } from 'react-native-paper';

import {
    Container, 
    ProfileContainer, 
    ProfileImage,
    SelectProfileContainer,
    SelectProfileImage,
    Description,
    TextInput,
    Placeholder,
    SettingContainer,
    SettingColumn,
    SettingColumnTitle,
    SwitchContainer,
    Icon,
    WithdrawalContainer,
    WithdrawalText
} from "./style";

import { Background, Header,  } from "@components";

export default function Setting() {

    const [profileIcon, setProfileIcon] = useState("01")

    return (
        <Background>
            <Header 
                title="설정"
                rightIcon={null}
            />
            <Container>
                <ProfileContainer>
                    <ProfileImage 
                        source={require("@assets/images/profile/home_profile_04.png")}
                    />
                    <SelectProfileContainer>
                        <TouchableOpacity>
                            <SelectProfileImage 
                                source={require("@assets/images/profile/home_profile_01.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <SelectProfileImage 
                                source={require("@assets/images/profile/home_profile_02.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <SelectProfileImage 
                                source={require("@assets/images/profile/home_profile_03.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <SelectProfileImage 
                                source={require("@assets/images/profile/home_profile_04.png")}
                            />
                        </TouchableOpacity>
                    </SelectProfileContainer>
                    <Description>
                        한글, 영문, 숫자를 사용해 멋진 닉네임을 만들어주세요!
                    </Description>
                    <View>
                        <TextInput />
                        <Placeholder>끼리</Placeholder>
                    </View>
                </ProfileContainer>
                <SettingContainer>
                    <SettingColumn>
                        <SwitchContainer>
                            <Icon 
                            source={require("@assets/images/setting_notice_setting.png")}
                            />
                        </SwitchContainer>
                        <SettingColumnTitle>알림 설정</SettingColumnTitle>
                        <SwitchContainer style={{ alignItems : 'flex-end'}}>
                            <Switch />
                        </SwitchContainer>
                    </SettingColumn>
                </SettingContainer>
                <SettingContainer>
                    <SettingColumn>
                        <SwitchContainer>
                            <Icon 
                            source={require("@assets/images/setting_personal_info.png")}
                            />
                        </SwitchContainer>
                        <SettingColumnTitle>개인정보 처리 방침</SettingColumnTitle>
                        <SwitchContainer style={{ alignItems : 'flex-end', paddingHorizontal:10 }}>
                            <Icon 
                                source={require("@assets/images/setting_next_normal.png")}
                            />
                        </SwitchContainer>
                    </SettingColumn>
                </SettingContainer>
                <SettingContainer>
                    <SettingColumn>
                        <SwitchContainer>
                            <Icon 
                            source={require("@assets/images/setting_version.png")}
                            />
                        </SwitchContainer>
                        <SettingColumnTitle>버전정보</SettingColumnTitle>
                        <SwitchContainer style={{ alignItems : 'flex-end', paddingHorizontal:1 }}>
                            <Text>V1.0.5</Text>
                        </SwitchContainer>
                    </SettingColumn>
                </SettingContainer>
                <SettingContainer>
                    <SettingColumn>
                        <SwitchContainer>
                            <Icon 
                            source={require("@assets/images/setting_logout.png")}
                            />
                        </SwitchContainer>
                        <SettingColumnTitle>로그아웃</SettingColumnTitle>
                        <SwitchContainer style={{ alignItems : 'flex-end', paddingHorizontal:10 }}>
                            <Icon 
                                source={require("@assets/images/setting_next_normal.png")}
                            />
                        </SwitchContainer>
                    </SettingColumn>
                </SettingContainer>
                <WithdrawalContainer>
                    <WithdrawalText>
                        아쉽지만 탈퇴 할래요.
                    </WithdrawalText>
                </WithdrawalContainer>
            </Container>
        </Background>
    )
}
