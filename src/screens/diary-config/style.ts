import styled from "styled-components/native";

export const Container = styled.View({
    flex: 1,
    paddingTop: 24,
    paddingLeft: 34,
    paddingRight: 34,
})

export const TitleConteiner = styled.View({
})
export const Label =styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
})
export const Title = styled.Text({
    fontFamily: "SpoqaHanSansNeo-Medium",
    fontSize: 12,
    color: "#17171c"
})
export const Count = styled.Text({
    fontFamily: "SpoqaHanSansNeo-Medium",
    fontSize: 12,
    color: "#d1d1de",
})

export const Input = styled.TextInput({
    marginTop: 8,
    width: "100%",
    height: 40,
    borderWidth: 2,
    borderColor: "#d1d1de",
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 11,
    paddingBottom: 11,
    fontFamily: "SpoqaHanSansNeo-Medium",
    fontSize: 14,
    color: "#17171c"
})

export const CoverConteiner = styled.View({
    marginTop: 40,
})
export const BigCoverImageConteiner = styled.View({
    marginTop: 12,
    marginBottom: 30,
    alignItems: "center"
})
export const BigCoverImage = styled.Image({})

export const BigCoverColor = styled.View(( { color } : StyledProps): any => ({
    backgroundColor : color,
    width: 159,
    height: 47,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
}))

export const BigCoverImageLine = styled.View({
    width: 161,
    height: 70,
    borderWidth: 1,
    borderColor: "#babacb",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
})

export const CircleCoverImageConteiner = styled.View({
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
})

export const CircleCoverImage = styled.Image({
    marginRight: 7,
    marginLeft: 7
})

export const CircleCoverColor = styled.TouchableOpacity(( { color } : StyledProps): any => ({
    backgroundColor : color,
    width: 40,
    height: 40,
    borderRadius: 100,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 18
}))

export const SelectImage = styled.Image({
    width:30,
    height: 30,
    position: "absolute",
    top: 4,
    left: 10
})

export const SelectColor = styled.Image({
    width:30,
    height: 30,
    position: "absolute",
    top: 2,
    left: 2
})

type StyledProps = {
    color : string,
}

