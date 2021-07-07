import React from 'react';
import {DiaryContainer, DiaryCover} from './home.style';

interface Props{
    diaryTitle: string,

}

export const Diary = () => {
    return (
        <DiaryContainer>
            <DiaryCover
                backgroundColor='purple'
            ></DiaryCover>
        </DiaryContainer>
    )
}