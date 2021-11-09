import React from "react";
import { CreateDiaryContainer, CreateDiaryText } from "./home.style";
import { Image } from "react-native";

interface Props {
    onClick: (event: any) => void;
}

export const CreateDiary = ({ onClick }: Props) => {
    return (
        <CreateDiaryContainer
            onPress={event => {
                onClick(event);
            }}
        >
            <Image
                source={require("@assets/images/home_diary_create_nomral.png")}
            ></Image>
            <CreateDiaryText>다이어리 추가</CreateDiaryText>
        </CreateDiaryContainer>
    );
};
