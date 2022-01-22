import React from "react";
import {
    RecentContentContainer,
    RecentContentTitle,
    RecentContentWriter,
    RecentDiaryTitle,
    RecentDiaryTitleWarp,
    RecentDiaryColor,
    RecentContentTitleWarp
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
                <RecentContentTitleWarp>
                    <RecentContentTitle numberOfLines={2}>
                        {title}
                    </RecentContentTitle>
                </RecentContentTitleWarp>
                <RecentDiaryTitleWarp>
                    <RecentDiaryColor background={backgroundColor} />
                    <RecentDiaryTitle numberOfLines={1}>
                        {diaryName}
                    </RecentDiaryTitle>
                </RecentDiaryTitleWarp>
            </RecentContentContainer>
        </Shadow>
    );
};
