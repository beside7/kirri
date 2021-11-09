import styled from "styled-components/native";

export const MessageBody = styled.View({
    width: "100%"
});

export const MessageText = styled.Text((props: { theme: any }) => ({
    fontSize: 16,
    color: props.theme["110"],
    fontFamily: "SpoqaHanSansNeo-Regular"
}));

export const MessageFrom = styled.Text((props: { theme: any }) => ({
    fontSize: 12,
    color: props.theme["104"],
    marginTop: 12,
    fontFamily: "SpoqaHanSansNeo-Regular"
}));
