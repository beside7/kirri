import styled from "styled-components/native";

export const Container = styled.View({
    position: "relative",
    backgroundColor: "rgba(0,0,0,0)"
});

export const Background = styled.SafeAreaView({
    backgroundColor: "rgba(23, 23, 28, 0.3)",
    height: "100%",
    position: "relative",
    top: 0
});

// export const Background = styled.SafeAreaView({
//     backgroundColor: 'rgba(23, 23, 28, 0.3)',
//     height: '100%',  w
//     borderWidth: 1
// });

export const ContentContainer = styled.SafeAreaView({
    paddingHorizontal: 34,
    backgroundColor: "#fff"
});

export const Content = styled.View({
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minHeight: 558,
    overflow: "hidden"
});

export const ModalTouchable = styled.View({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4
});

export const TouchableIcon = styled.View({
    backgroundColor: "#d1d1de",
    borderRadius: 3,
    width: 42,
    height: 6
});
