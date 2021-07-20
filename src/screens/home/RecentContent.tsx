import React from 'react';
import {RecentContentContainer, RecentContentTitle, RecentContentWriter, RecentDiaryTitle, RecentDiaryTitleWarp, RecentDiaryColor} from './home.style';


interface Props {
    nickname: string,
    title: string,
    diaryName: string,
    backgroundColor: string
}

export const RecentContent = ({nickname, title, diaryName, backgroundColor}:Props) => {
    return (
        <RecentContentContainer>
            <RecentContentWriter>{nickname}</RecentContentWriter>
            <RecentContentTitle>{title}</RecentContentTitle>
            <RecentDiaryTitleWarp>
                <RecentDiaryColor background={backgroundColor}/>
                <RecentDiaryTitle>{diaryName}</RecentDiaryTitle>
            </RecentDiaryTitleWarp>
        </RecentContentContainer>
    )
}