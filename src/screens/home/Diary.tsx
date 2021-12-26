import React from "react";
import {
    DiaryContainer,
    DiaryCover,
    DiaryContent,
    DiaryDetailTitle,
    DiaryBottom,
    MembersText,
    DiaryBadge,
    CoverImage
} from "./home.style";
import {
    CoverColorTypes,
    CoverImageTypes,
    CoverColor,
    CoverImages
} from "@utils";
import { Shadow } from "react-native-shadow-2";
import { gridWidth } from "./types";

const badge = require("@assets/images/home/home_diary_badge.png");

interface Props {
    diaryTitle: string;
    members: number;
    coverType: string;
    coverId: string;
}

export const Diary = ({ diaryTitle, members, coverType, coverId }: Props) => {
    return (
        <Shadow
            radius={10}
            containerViewStyle={{
                marginBottom: 18,
                marginLeft: 2,
                marginRight: 2
            }}
            viewStyle={{
                padding: 0,
                backgroundColor: "#ffffffff"
            }}
            size={[gridWidth, gridWidth]}
            distance={5}
            startColor={"#0000002b"}
            finalColor={"#ffffffff"}
            getViewStyleRadius={true}
            offset={[1.5, 2.5]}
        >
            <DiaryContainer>
                <DiaryCover
                    backgroundColor={
                        coverType === "color"
                            ? CoverColor[coverId as CoverColorTypes]
                            : "#fff"
                    }
                >
                    {coverType === "image" ? (
                        <CoverImage
                            source={CoverImages[coverId as CoverImageTypes]}
                        />
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
        </Shadow>
    );
};
