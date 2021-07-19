import React from 'react'
import { View, Text } from 'react-native'

import { Container, ProfileContainer, } from "./style";

import { Background, Header,  } from "@components";

export default function Setting() {
    return (
        <Background>
            <Header 
                title="설정"
                rightIcon={null}
            />
            <Container>
                <ProfileContainer>

                </ProfileContainer>
            </Container>
        </Background>
    )
}
