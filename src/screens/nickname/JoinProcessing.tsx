import React, { ReactElement } from "react";
import { Container } from "@components";
import { ContentWarp, LogoWarp } from "./joinProcess.style";
import { Image, Modal, View } from "react-native";
import { Video } from 'expo-av';


interface Props {
    open: boolean;
}

export const JoinProcessing = ({ open }: Props): ReactElement => {
    return (
        <Modal visible={open}>
            <Container>
                <ContentWarp>
                    <LogoWarp>우리들의 이야기</LogoWarp>
                    <View
                        style={{ 
                            width: 150, 
                            height: 150, 
                            overflow: "hidden",
                            marginTop: 10
                        }}
                    >
                        <Video
                            source={require("@assets/videos/splash_video.mp4")}
                            resizeMode="contain"
                            style={{ 
                                width: 500, 
                                height: 500,
                                top: -165,
                                left: -180,
                                position: "absolute",
                            }}
                            shouldPlay
                            isLooping
                        />
                    </View>
                    <Image 
                        source={require("@assets/images/splash_logo.png")}
                        style={{
                            marginTop: 20,
                            width: 90,
                            height: 40
                        }}
                    />
                </ContentWarp>
            </Container>
        </Modal>
    );
};
