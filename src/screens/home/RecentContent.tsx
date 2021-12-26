import React from "react";
import {
    RecentContentContainer,
    RecentContentTitle,
    RecentContentWriter,
    RecentDiaryTitle,
    RecentDiaryTitleWarp,
    RecentDiaryColor
} from "./home.style";
import { Shadow } from "react-native-shadow-2";
import { Colors } from "./types";

interface Props {
    nickname: string;
    title: string;
    diaryName: string;
    backgroundColor: Colors;
}

export const RecentContent = ({
    nickname,
    title,
    diaryName,
    backgroundColor
}: Props) => {
    return (
        <Shadow
            size={[140, 85]}
            radius={10}
            containerViewStyle={{
                marginTop: 2,
                marginLeft: 2,
                marginRight: 12
            }}
            startColor={"#00000020"}
            finalColor={"#2b000000"}
            getViewStyleRadius={true}
            viewStyle={{
                backgroundColor: "#ffffffff"
            }}
            distance={5}
            offset={[1.5, 2.5]}
        >
            <RecentContentContainer>
                <RecentContentWriter>{nickname}</RecentContentWriter>
                <RecentContentTitle>{title}</RecentContentTitle>
                <RecentDiaryTitleWarp>
                    <RecentDiaryColor background={backgroundColor} />
                    <RecentDiaryTitle>{diaryName}</RecentDiaryTitle>
                </RecentDiaryTitleWarp>
            </RecentContentContainer>
        </Shadow>
    );
};
