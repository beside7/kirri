import { DiaryResType } from "@type-definition/diary";
import { Dimensions } from "react-native";

export type Colors =
    | "#6173ff"
    | "#e49ffd"
    | "#4fbcd0"
    | "#b59aff"
    | "#fdae43"
    | "#1ad0ff";

const colorMap = {
    "01": "#6173ff" as Colors,
    "02": "#e49ffd" as Colors,
    "03": "#4fbcd0" as Colors,
    "04": "#b59aff" as Colors,
    "05": "#fdae43" as Colors,
    "06": "#1ad0ff" as Colors
};

type Keys = keyof typeof colorMap;

/**
 * 다이러리 이름을 색상으로 변경
 * @param diaryList
 * @param diaryTitle
 * @returns
 */
export const diaryNameToColor = (
    diaryList: DiaryResType[],
    diaryTitle: string
): Colors => {
    const find = diaryList.find(({ title }) => title === diaryTitle);
    return find
        ? colorMap[find.icon.split(":")[1] as Keys]
        : ("#6173ff" as Colors);
};

const DeviceWidth = Dimensions.get("window").width;
export const gridWidth = Math.floor(DeviceWidth / 2) - 32;
