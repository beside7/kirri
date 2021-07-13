import React, { ReactElement } from 'react';
import { Container } from '@components';
import { ContentWarp, LogoWarp } from './joinProcess.style';
import {Text, Modal} from 'react-native';

interface Props {
    open: boolean
}

export const JoinProcessing = ({open}: Props):ReactElement => {
    return (
        <Modal
            visible={open}
        >
            <Container>
                <ContentWarp>
                    <LogoWarp>77ㅣZㅣ</LogoWarp>
                    <Text>잠시만 기다려 주세요 :)</Text>
                </ContentWarp>
            </Container>
        </Modal>
    )
}