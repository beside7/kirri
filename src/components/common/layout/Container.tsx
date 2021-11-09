import React, { ReactElement } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";

const StyledContainer = styled.View({
    flex: 1,
    paddingHorizontal: 23,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff"
});

const StyledSafeAreaView = styled.SafeAreaView({
    flex: 1
});

interface Props {
    children?: ReactElement | ReactElement[];
}

export const Container = ({ children }: Props): ReactElement => {
    return (
        <StyledSafeAreaView>
            <StyledContainer>{children}</StyledContainer>
        </StyledSafeAreaView>
    );
};
