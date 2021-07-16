import styled from 'styled-components/native';

export const Background = styled.View({
    backgroundColor: 'rgba(23, 23, 28, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
});


export const ContentContainer = styled.View({
    height: 558,
    backgroundColor: '#fff',
    paddingHorizontal: 34,
    paddingBottom: 38,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
});


export const ModalTouchable = styled.View({
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    paddingVertical: 4
});

export const TouchableIcon = styled.View({
    backgroundColor: '#d1d1de',
    borderRadius: 3,
    width:42,
    height: 6
});
