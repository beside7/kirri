import React, { useEffect, useState, useMemo } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
    Contanier,
    Title,
    ImageContainer,
    CheerupImage,
    From,
    Button,
    ButtonText
} from "./style";
import { Background, Header } from "@components";

import { diaryApis } from "@apis";
import { DiaryResType } from "@type-definition/diary";

import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type CheerupMessageProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "CheerupMessage">;
    route: RouteProp<StackNavigatorParams, "CheerupMessage">;
};

function getFromNickName(diary: DiaryResType | null, id: number) {
    const nickname = diary?.members.find(item => item.userId === id)?.nickname;
    return nickname ? nickname : null;
}

/**
 * 응원하기 자세히 보기
 * @param param0
 * @returns
 */
export default function CheerupMessage({
    navigation,
    route
}: CheerupMessageProps) {
    const [diary, setDiary] = useState<DiaryResType | null>(null);
    const [loading, setLoading] = useState(false);

    /**
     * title : 제목 , body : 본문 , data : 기타 데이터
     */
    const { title, body, data } = route.params;

    /**
     * 다이러리 정보 추출
     */
    const { fromUserId, toUserId, diaryUuid } = data;

    const getDiary = async (diaryUuid: string) => {
        setLoading(true);

        const res = await diaryApis.viewDiary(diaryUuid);
        setDiary(res);

        setLoading(false);
    };

    useEffect(() => {
        getDiary(diaryUuid);
    }, []);

    const fromUserNickName = useMemo(
        () => getFromNickName(diary, fromUserId),
        [diary, fromUserId]
    );

    return (
        <Background>
            <Header
                title="응원 메세지"
                leftIcon={
                    <TouchableOpacity
                        onPress={() => {
                            navigation.replace("Home");
                        }}
                    >
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require("@assets/icons/x.png")}
                        />
                    </TouchableOpacity>
                }
                // rightIcon={<Image style={{ width: 24, height: 24 }} source={require("@assets/icons/menu.png")} />}
            />
            <Contanier>
                <Title>{body}</Title>
                <ImageContainer>
                    <CheerupImage
                        source={require("@assets/images/diary/diary_cheerup_bgimg_01.png")}
                    />
                </ImageContainer>
                <From>
                    from. {fromUserNickName} [{diary?.title}]
                </From>
                <Button
                    onPress={() => {
                        navigation.navigate("RecordInput", { diary, prev: "list" });
                    }}
                >
                    <ButtonText>기록 작성하러 가기</ButtonText>
                </Button>
            </Contanier>
        </Background>
    );
}
