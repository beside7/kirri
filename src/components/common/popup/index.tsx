import React from "react";
import {
    Background,
    BackgroundArea,
    Container,
    StyledHeaderIcon,
    HeaderWarp,
    Title,
    IconWithTitle,
    Content,
    ButtonContainer,
    PopupButton,
    ButtonText,
    ContentText,
    CancelButtonText
} from "./popup.style";
import { Props } from "./types";
import { Shadow } from "react-native-shadow-2";

export const Popup = ({
    open,
    width,
    height,
    headerIcon,
    title,
    content,
    confirm,
    cancel,
    onCancel,
    onConfirm,
    handelOpen
}: Props) => {
    return (
        <Background visible={open} transparent={true}>
            <BackgroundArea>
                <Shadow radius={10}>
                    <Container width={width} height={height}>
                        <HeaderWarp>
                            {headerIcon ? (
                                <>
                                    <StyledHeaderIcon
                                        source={headerIcon}
                                    ></StyledHeaderIcon>
                                    <IconWithTitle>{title}</IconWithTitle>
                                </>
                            ) : title ? (
                                <Title>{title}</Title>
                            ) : (
                                <></>
                            )}
                        </HeaderWarp>
                        <Content>
                            {typeof content === "string" ? (
                                <ContentText>{content}</ContentText>
                            ) : (
                                <>{content}</>
                            )}
                        </Content>
                        <ButtonContainer>
                            {cancel ? (
                                <PopupButton
                                    attr="cancel"
                                    border={true}
                                    onPress={async () => {
                                        await onCancel();
                                        handelOpen(false);
                                    }}
                                >
                                    <CancelButtonText>{cancel}</CancelButtonText>
                                </PopupButton>
                            ) : (
                                <></>
                            )}
                            <PopupButton
                                attr="confirm"
                                border={!!cancel}
                                onPress={async () => {
                                    await onConfirm();
                                    handelOpen(false);
                                }}
                            >
                                <ButtonText>{confirm}</ButtonText>
                            </PopupButton>
                        </ButtonContainer>
                    </Container>
                </Shadow>
                
            </BackgroundArea>
        </Background>
    );
};

Popup.defaultProps = {
    onConfirm: () => {},
    confirm: "확인",
    width: "",
    onCancel: () => {},
    handelOpen: () => {}
};
