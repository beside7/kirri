import styled from "styled-components/native";

export const ContentWrap = styled.View({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1

});

export const CheerUpText = styled.Text({
    width: 180,
    fontSize: 24,
    fontFamily: 'SpoqaHanSansNeo-Bold',
    color: "#333333",
    textAlign:"center"
});

export const CheerUpImageCover = styled.View((props:{theme:any})=>({
    width: 193,
    height: 193,
    borderColor: props.theme["102"],
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 40,
    marginBottom: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}))

export const FromText = styled.Text((props:{theme:any})=>({
    borderColor: props.theme["102"],
    fontSize: 12,
    maxWidth: "100%",
    marginBottom: 60

}))