import React from 'react'
import { View, Text } from 'react-native'
import { Background } from "@components";
import { 
    Container,
    OnboardingContainer,
    OnboardItem,
    OnboardingImage,
    OnboardingText
} from "./style";
import Swiper from 'react-native-web-swiper';

export default function Onboarding() {
    return (
        <Container>
            <OnboardingContainer>
                <Swiper>
                    <OnboardItem>
                        <OnboardingImage
                            source={require('@assets/images/onboarding_01.png')}
                        />
                        <OnboardingText>우리가 함께 만드는</OnboardingText>    
                        <OnboardingText>공유 일기</OnboardingText>    
                    </OnboardItem>
                    <OnboardItem>
                        <OnboardingImage
                            source={require('@assets/images/onboarding_02.png')}
                        />
                        <OnboardingText>작은 일상 부터</OnboardingText>  
                        <OnboardingText>소중한 순간 까지</OnboardingText>    
                    </OnboardItem>
                    <OnboardItem>
                        <OnboardingImage
                            source={require('@assets/images/onboarding_03.png')}
                        />
                        <OnboardingText>덕질한 친구들에게</OnboardingText>
                        <OnboardingText>보내는 응원의 한마디</OnboardingText>    
                    </OnboardItem>
                    <OnboardItem>
                        <OnboardingImage
                            source={require('@assets/images/onboarding_04.png')}
                        />
                        <OnboardingText>이제, 우리들 만의</OnboardingText>   
                        <OnboardingText>다이어리 기록을 만들어 보세요!</OnboardingText>    
                    </OnboardItem>
                </Swiper>
            </OnboardingContainer>  
        </Container>
    )
}
