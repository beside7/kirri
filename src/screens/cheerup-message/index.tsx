import React from 'react'
import { View, Text, Image } from 'react-native'
import { 
    Contanier,
    Title,
    ImageContainer,
    CheerupImage,
    From,
    Button,
    ButtonText
} from "./style";
import { Background, Header } from '@components'

export default function CheerupMessage() {
    return (
        <Background>
            <Header 
                title="응원 메세지"
                leftIcon={<Image style={{ width: 24, height: 24 }} source={require("@assets/icons/x.png")} />}
                rightIcon={null}
            />
            <Contanier>
                <Title>
                    꾸준함은
                    배신하지 않아
                </Title>
                <ImageContainer>
                    <CheerupImage 
                        source={require("@assets/images/diary_cheerup_bgimg_01.png")}
                    />
                </ImageContainer>
                <From>
                    from. 최애옹 [처음 우리들의 끼리 다이어리!!]
                </From>
                <Button>
                    <ButtonText>기록 작성하러 가기</ButtonText>
                </Button>
            </Contanier>
        </Background>
    )
}
