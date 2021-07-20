import React from 'react';
import {DiaryContainer, DiaryCover, DiaryContent, DiaryDetailTitle, DiaryBottom, MembersText} from './home.style';
import { CoverColorTypes, CoverImageTypes, CoverColor, CoverImages } from '@utils';
import {Image} from 'react-native';

interface Props{
    diaryTitle: string,
    members: number,
    coverType: string,
    coverId: string
}

export const Diary = ({diaryTitle, members, coverType, coverId}: Props) => {
    return (
        <DiaryContainer>
            <DiaryCover
                backgroundColor={coverType==='color'?CoverColor[coverId as CoverColorTypes]:'#fff'}
            >
                {
                    coverType==='image'?<Image source={CoverImages[coverId as CoverImageTypes]}/>:<></>
                }
            </DiaryCover>
            <DiaryContent>
                <DiaryDetailTitle>{diaryTitle}</DiaryDetailTitle>
                <DiaryBottom><MembersText>+{members}</MembersText></DiaryBottom>
            </DiaryContent>
        </DiaryContainer>
    )
}