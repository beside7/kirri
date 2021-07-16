import React ,{ ReactElement } from 'react'
import { View , Image, TouchableOpacity, GestureResponderEvent } from 'react-native'
import Text from "../text_2/text_2";
import styled from 'styled-components/native'

const HeaderContaner = styled.View`
    border-bottom-width: 1;
    border-color: #d1d1de;
`
const Empty = styled.View`
    height: 30
`
const Content = styled.View`
    height: 62;
    flex-direction: row
`
const Side = styled.View`
    width : 20% ;
    justify-content: center;
    align-items: center 
`

const Center = styled.View`
    width : 60% ;
    justify-content: center;
    align-items: center 
`

type HeaderProps = {
    title? : string
    leftIcon? : ReactElement | null
    rightIcon? : ReactElement | null
    onLeftIconClick?: (event: GestureResponderEvent) => void
    onRightIconClick?: (event: GestureResponderEvent) => void
}

export default function Header({ title, leftIcon, rightIcon, onLeftIconClick, onRightIconClick } : HeaderProps) {
    return (
        <HeaderContaner>
            <Empty />
            <Content>
                <Side>
                    <TouchableOpacity onPress={onLeftIconClick}>
                         { (leftIcon || leftIcon === null ) || <Image
                            style={{ width: 24, height: 24 }}
                            source={require("@assets/icons/back.png")} 
                        />}
                    </TouchableOpacity>
                </Side>
                <Center>
                    <Text bold="Medium">
                        {title}
                    </Text>
                </Center>
                <Side>
                    <TouchableOpacity onPress={onRightIconClick}>
                        { (rightIcon || rightIcon === null ) || <Image
                            style={{ width: 24, height: 24 }}
                            source={require("@assets/icons/menu.png")} 
                        />}
                    </TouchableOpacity>
                </Side>
            </Content>
        </HeaderContaner>
    )
}

Header.defaultProps = {
    leftIcon: <Image
        style={{ width: 24, height: 24 }}
        source={require("@assets/icons/back.png")} 
    />,
    rightIcon: <Image
        style={{ width: 24, height: 24 }}
        source={require("@assets/icons/menu.png")} 
    />
}