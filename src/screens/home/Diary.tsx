import React from "react";
import {
    DiaryContainer,
    DiaryCover,
    DiaryContent,
    DiaryDetailTitle,
    DiaryBottom,
    MembersText,
    DiaryBadge
} from "./home.style";
import {
    CoverColorTypes,
    CoverImageTypes,
    CoverColor,
    CoverImages
} from "@utils";
import { Image } from "react-native";

const badge = require("@assets/images/home/home_diary_badge.png");

interface Props {
    diaryTitle: string;
    members: number;
    coverType: string;
    coverId: string;
}

export const Diary = ({ diaryTitle, members, coverType, coverId }: Props) => {
    return (
        <DiaryContainer>
            <DiaryCover
                backgroundColor={
                    coverType === "color"
                        ? CoverColor[coverId as CoverColorTypes]
                        : "#fff"
                }
            >
                {coverType === "image" ? (
                    <Image source={CoverImages[coverId as CoverImageTypes]} />
                ) : (
                    <></>
                )}
            </DiaryCover>
            <DiaryContent>
                <DiaryDetailTitle>{diaryTitle}</DiaryDetailTitle>
                <DiaryBottom>
                    <DiaryBadge source={badge} />
                    <MembersText>+{members}</MembersText>
                </DiaryBottom>
            </DiaryContent>
        </DiaryContainer>
    );
};
