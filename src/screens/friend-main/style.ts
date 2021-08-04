import styled from "styled-components/native";

export const TextInput = styled.TextInput`
    border-color: #d1d1de;
    border-width: 1;
    border-radius: 5;
    height: 40;
    padding-top: 11;
    padding-bottom: 11;
    padding-left: 12;
    padding-right: 12;
`

export const Icon = styled.Image({
    width: 24,
    height: 24,
})

export const Button = styled.TouchableOpacity`
    position: absolute;
    top: 8;
    right: 8;
`

/**
 * 친구내보내기 부분
 */

export const EmptyContainer = styled.View({
    paddingTop: 65,
    alignItems: "center"
})

export const EmptyText = styled.Text({
    fontFamily: "SpoqaHanSansNeo-Regular",
    fontSize: 14,
    color: "#17171c",
    marginTop: 24
})

export const ExportFriendContainer = styled.View({
    flex: 1, 
    paddingHorizontal: 34, 
    paddingVertical: 21
})

export const ExportFriendListItemContainer = styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60
})

export const ExportFriendThumbnailImage = styled.Image({
    width: 40,
    height: 40,
    borderRadius: 40
})

export const ExportFriendListItemCenter = styled.View({
    width: "55%", alignItems: "flex-start" 
})

export const ExportFriendNickName = styled.Text({
    fontSize: 14, color: "#000000",
    fontFamily: "SpoqaHanSansNeo-Regular"
})

export const ExportFriendListItemRight = styled.View({
    width: "25%", alignItems: "flex-end", justifyContent: "center"
})