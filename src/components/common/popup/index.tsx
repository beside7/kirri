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
import Text from "../text_1/text_1";
import { Props } from "./types";

export const Popup = ({
    open,
    width,
    height,
    headerIcon,
    title,
    content,
    discription,
    confirm,
    cancel,
    onCancel,
    onConfirm,
    handelOpen
}: Props) => {
    return (
        <Background visible={open} transparent={true}>
            <BackgroundArea>
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
