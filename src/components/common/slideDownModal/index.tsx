import React, { ReactElement, useEffect, useImperativeHandle, useState, forwardRef, useRef} from 'react';
import {Modal, View, PanResponder, Animated, GestureResponderEvent, PanResponderGestureState, PanResponderInstance} from 'react-native';
import {Background, ContentContainer, ModalTouchable, TouchableIcon, Content, Container} from './SlideDownModal.style';
import {PanGestureHandler} from 'react-native-gesture-handler';

interface Props {
    children: ReactElement,
    onClosed?: () => void
}

export const SlideDownModal = forwardRef(({children, onClosed=()=>{}}: Props, ref) => {
    const [animatedTop, setAnimatedTop] = useState(new Animated.Value(0));

    const panGestureHandler = (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        Animated.timing(animatedTop, {
            toValue: gestureState.dy,
            duration: 30,
            useNativeDriver: false
          }).start();
    }

    const onPanResponderRelease = (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (gestureState.dy > 100) {
            onClosed();
            setOpen(false);
        }
        Animated.timing(animatedTop, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false
          }).start();
    }
    const [open, setOpen] = useState(false);
    const contentRef = useRef<any>();
    
    const [_panResponder, setPanResponder] = useState<PanResponderInstance>(PanResponder.create({
                onStartShouldSetPanResponder: (evt, gestureState) => true,
                onMoveShouldSetPanResponder: (event, gestureState) => true,
                onPanResponderMove: panGestureHandler,
                onPanResponderRelease: onPanResponderRelease
              }));

    useImperativeHandle(
        ref,
        () => ({
            open: () =>{
                setOpen(true);
       
            },
            close: () => {
                setOpen(false);
            }
        }),
    )
    
    return (
        <Modal
            visible={open}
            transparent={true}
            
        >
            <Container

            >
                <Background
                    {..._panResponder?.panHandlers}
                >
                </Background>
                <Animated.View
                    style={[
                        {overflow: 'hidden', position:'absolute', bottom:0, width: '100%'},
                        {
                          transform: [
                            {
                              translateY: animatedTop
                            },
                          ],
                        },
                      ]}
                >
                    <Content>
                        <ModalTouchable
                            {..._panResponder?.panHandlers}
                        >
                            <TouchableIcon></TouchableIcon>
                        </ModalTouchable>
                        {children}
                    </Content>
                    <ContentContainer>
                    </ContentContainer>
                </Animated.View>
            </Container>
         </Modal>
    )
})