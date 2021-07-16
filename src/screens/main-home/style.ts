import styled from "styled-components/native"
/**
 * 상단메뉴
 */
export const TopMenu = styled.View`
    height: 87;
    align-items: flex-end;
    justify-content: flex-end;
`

/**
 * 아이콘 영역
 */
export const Icons = styled.View`
    flex-direction: row;
`

/**
 * 아이콘 이미지
 */
export const Icon = styled.Image`
    width: 24;
    height: 24;
    margin-right: 15;
`
/**
 * 유저 정보 영역
 */
export const UserInfo = styled.View`
    height: 147;
    padding-horizontal: 20;
    border-bottom-width: 8;
    border-color: #f4f4f8;
`
/**
 * 프로파일 이미지
 */
export const Profile = styled.Image`
    width: 70;
    height: 70;
    margin-bottom: 12;
`
/**
 * 유저네임 영역
 */
export const Title = styled.View`
    flex-direction: row;
`
/**
 * 유저네임 
 */
export const UserName = styled.Text`
    font-family: "SpoqaHanSansNeo-Medium";
    font-size: 24;
    color: #333333;
    margin-right: 6;
`
/**
 * 77 | Z |
 */
export const Kirri = styled.Text`
    font-family: "SpoqaHanSansNeo-Bold";
    font-size: 7;
    color: #e49ffd;
    line-height: 20;
`

/**
 * 리스트 영역
 */
export const ListContainer = styled.View`
    padding-left: 25;
    padding-top: 24;
`

/**
 * 최근 작성된 기록
 */
export const ListTitle = styled.Text`
    font-family: "SpoqaHanSansNeo-Regular";
    font-size: 14;
    color: #6f6f7e;
`

/**
 * 최근 작성된 리스트
 */
export const LatestList = styled.FlatList`
    margin-top: 8;
`


/**
 * 최근 작성된 리스트 아이템
 */
export const LatestItem = styled.View`
    width: 150;
    height: 80;
    padding-horizontal: 10;
    padding-vertical: 10;
    margin-right: 15;
    margin-left: 1;
    margin-bottom: 5;
    margin-top: 1;

    border-radius: 10;
    shadow-color: 'rgb(0, 0, 0)';
    shadow-offset: {
        width: 3,
        height: 5,
    };
    shadow-opacity: 0.5;
    shadow-radius: 10;
    elevation: 7;
    background-color: white;
`

export const LatestListItemNicName = styled.Text`
    font-size: 12;
    font-family: "SpoqaHanSansNeo-Regular";
    color: #6f6f7e;
`
export const LatestListItemTitle = styled.Text`
    font-size: 12;
    font-family: "SpoqaHanSansNeo-Medium";
    color: #17171c;
`
export const LatestListItemDiary = styled.Text`
    margin-top: 13;
    font-size: 12;
    font-family: "SpoqaHanSansNeo-Regular";
    color: #babacb;
`

export const DiaryList = styled.FlatList`
    margin-top: 8;
`

export const DiaryListItem = styled.View`
    width: 159;
    height: 158;

    margin-top: 9;
    margin-bottom: 9;
    margin-right: 17;
    margin-left: 1;

    border-radius: 10;
    shadow-color: 'rgb(0, 0, 0)';
    shadow-offset: {
        width: 3,
        height: 5,
    };
    shadow-opacity: 0.5;
    shadow-radius: 10;
    elevation: 7;
    background-color: white;
`

export const DiaryListItemHeader = styled.View``
export const DiaryListItemBody = styled.View`
    padding-top: 13;
    padding-horizontal: 14;
`

export const DiaryListItemTitle = styled.Text`
    font-size: 14;
`