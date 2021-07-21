import React, { ReactElement, useEffect, useImperativeHandle, useState, forwardRef} from 'react';
import {Modal, View, TouchableOpacity,Text} from 'react-native';
import {Background, ContentContainer, ModalTouchable, TouchableIcon} from './SlideDownModal.style';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    children: ReactElement,
}

export const SlideDownModal = forwardRef(({children}: Props, ref) => {
    const [open, setOpen] = useState(false);
    useImperativeHandle(
        ref,
        () => ({
            open: () =>{
                setOpen(true);
            }
        }),
    )
    return (
        <Modal
            visible={open}
        >
            <Background>
                <View style={{width: "100%",flexBasis:1, flexGrow:1, flexShrink: 1}}>
                    <TouchableOpacity
                        style={{width: "100%", height: '100%'}}
                        onPress={()=>{setOpen(false)}}
                    ></TouchableOpacity>
                </View>
                <ContentContainer>
                        <ModalTouchable>
                            <TouchableIcon></TouchableIcon>
                        </ModalTouchable>
                        <ScrollView>{children}</ScrollView>
                    </ContentContainer>
            </Background>

        </Modal>
    )
})