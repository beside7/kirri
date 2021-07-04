import { StyleSheet } from 'react-native';
import styled, {css} from 'styled-components/native'

export const TermsAndConStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 22.5,
        paddingVertical: 30
    },
    titleContainer: {
        display: 'flex',
        height: '16dp',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    closeIcon: {        
        width: '16dp',
    },
    titleWarp: {
        flex:1,
        flexGrow: 3,
        justifyContent: 'center',
        paddingRight: 16,
    },
    titleText: {
        textAlign:'center',
        fontSize: 18,
    }
});

export const VerticalStyle = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 13.5
})

export const TermsWarp = styled.View`
    ${VerticalStyle};
    marginHorizontal: 0;
    flexWrap: wrap;
`;

export const AgreeAllWarp = styled.View`
    ${VerticalStyle}
    margin-top: 66;
    border-width: 2;
    paddingHorizontal: 12;
`;

export const AgreeAllIcon = styled.TouchableOpacity({
    marginRight: 12,
    marginVertical: 8,
    width: 24,
    height: 24,
    borderWidth:2,
    borderRadius: 12
})

export const TermsText = styled.Text({
    fontSize:14,
    fontWeight: 'bold',
    flexGrow: 2,
})

export const TermsListWarp = styled.View`
    ${VerticalStyle};
    marginTop: 42;
    flexGrow: 1;
    alignItems: flex-start;

`;

export const TermsDetail = styled.Text({
    width: '100%',
    paddingLeft: 36,
    fontSize: 12,
    color: '#9e9e9e'
})

export const NextButtonWarp = styled.View({
    marginHorizontal: 13.5
})