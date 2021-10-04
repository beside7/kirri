import React, { useState, useEffect } from 'react';
import {Modal, Image} from 'react-native';
import { SafeAreaView } from '../nickname/nickname.style';
import { Header, Button } from '@components';
import {ContentWrap, CheerUpText, CheerUpImageCover, FromText} from './CheerUpPopup.style';
import { navigate } from '@config/navigator';

const Image_01 = require('@assets/images/diary/diary_cheerup_bgimg_01.png');
const Image_02 = require('@assets/images/diary/diary_cheerup_bgimg_02.png');
const Image_03 = require('@assets/images/diary/diary_cheerup_bgimg_03.png');
const Image_04 = require('@assets/images/diary/diary_cheerup_bgimg_04.png');
const Image_05 = require('@assets/images/diary/diary_cheerup_bgimg_05.png');
const Image_06 = require('@assets/images/diary/diary_cheerup_bgimg_06.png');

interface Props {
    open: boolean,
    onClose: () => void,
    body: string | undefined,
    from: string | undefined,
    diaryName: string | undefined,
    diaryId: string | undefined
}

const CheerupImage = {
    "01": "꾸준함은 배신하지 않아",
    "02": "오늘 너의 기록에 반함",
    "03": "난 언제나 너의 편",
    "04": "아프지 말고, 아파지 말고",
    "05": "대충 살아도 괜찮아",
    "06": "넌 지금도 충분히 잘 하는 중"
}

const MessageTypes = {
    "01": <>꾸준함은{"\n"}배신하지 않아</>,
    "02": <>오늘{"\n"}너의 기록에 반함</>,
    "03": <>난 언제나{"\n"}너의 편</>,
    "04": <>아프지 말고,{"\n"}아프지 말고</>,
    "05": <>대충 살아도 괜찮아</>,
    "06": <>넌 지금도{"\n"}충분히 잘 하는 중</>
}

const ImageList = {
    "01": Image_01,
    "02": Image_02,
    "03": Image_03,
    "04": Image_04,
    "05": Image_05,
    "06": Image_06
}

type CheerType =keyof (typeof CheerupImage);

export const CheerUpPopup = ({open, onClose, body, from, diaryName, diaryId}:Props) => {
    const [cheerUpImg, setCheerUpImg] = useState<CheerType>("01");

    useEffect(() => {
        console.log("test")
        const index = Object.keys(CheerupImage).find((key)=> CheerupImage[key as CheerType] === body) || "01";
        setCheerUpImg(index as CheerType);
    }, [body]);
    useEffect(()=>{
        console.log(cheerUpImg);
        
    },[cheerUpImg])
    console.log("test")
    return (
        <Modal
            visible={open}
        >
            <SafeAreaView>
                <Header
                    title="응원 메세지"
                    leftIcon={require("@assets/icons/x.png")}
                    onLeftClick={()=>{
                        onClose();
                    }}
                />
                <ContentWrap>
                    <CheerUpText>
                        {
                            MessageTypes[cheerUpImg as CheerType]
                        }
                    </CheerUpText>
                    <CheerUpImageCover>
                        <Image
                            source={Image_02}
                            
                        />
                    </CheerUpImageCover>
                    <FromText>from.{from} [{diaryName}]</FromText>
                    <Button
                        type="medium"
                        onPress={()=>{
                            onClose();
                            navigate("RecordInput",{diaryUuid: diaryId});
                        }}
                    >
                        기록 작성하러 가기
                    </Button>
                </ContentWrap>
                
            </SafeAreaView>
        </Modal>
    );
}