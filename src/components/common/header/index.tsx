import React ,{ ReactElement } from 'react'
import { View , Image, TouchableOpacity, GestureResponderEvent } from 'react-native'
import Text from "../text_2/text_2";
import { 
    HeaderContaner,
    Empty,
    Content,
    Side,
    Center,
} from "./style";
import { Button, Menu, Divider } from 'react-native-paper';



type HeaderProps = {
    title? : string
    leftIcon? : ReactElement | null
    rightIcon? : ReactElement | null
    onLeftIconClick?: (event: GestureResponderEvent) => void
    onRightIconClick?: (event: GestureResponderEvent) => void
}

export default function Header({ title, leftIcon, rightIcon, onLeftIconClick, onRightIconClick } : HeaderProps) {
      const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
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
                    {(rightIcon === undefined) ? 
                        <>
                            <Menu
                                visible={visible}
                                onDismiss={closeMenu}
                                anchor={
                                    <TouchableOpacity onPress={openMenu}>
                                        <Image
                                            style={{ width: 24, height: 24 }}
                                            source={require("@assets/icons/menu.png")} 
                                        />
                                    </TouchableOpacity>
                                }
                            >
                                <Menu.Item onPress={() => {}} title="우리끼리 응원하기" />
                                <Menu.Item onPress={() => {}} title="친구 관리" />
                                <Menu.Item onPress={() => {}} title="다이어리 수정" />
                                <Menu.Item onPress={() => {}} title="다이어리 삭제" />
                            </Menu>
                        </>
                        : (rightIcon === null) ? null
                        : rightIcon
                    }
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
}