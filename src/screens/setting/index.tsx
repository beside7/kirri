import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import {
    Container, 
    ProfileContainer, 
    ProfileImage,
    SelectProfileContainer,
    SelectProfileImage
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
                </ProfileContainer>
            </Container>
        </Background>
    )
}
