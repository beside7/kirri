import styled from 'styled-components/native';

export const Container = styled.View({
    flexBasis:1,
    flexGrow: 1,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection:'column'
})

export const PickerWrap = styled.View({
    width: 100,
    overflow: 'visible',
    marginVertical: 24,
    zIndex: 10
})

export const AlarmListWarp = styled.View({
    flexBasis: 1,
    flexGrow: 1,
})

export const EmptyMessage = styled.View({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 100
})

export const EmtyMsgImage = styled.Image({
    width: 125,
    height: 125,
    resizeMode : 'contain'
})

export const EmtyMsgText = styled.Text((props: {theme: any})=>({
    marginTop:24,
    fontSize: 14,
    color: props.theme['110']
}))