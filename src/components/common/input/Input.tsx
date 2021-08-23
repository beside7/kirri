import React, { ReactElement, useState, useEffect } from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface StyleProps {
    width?: string | number,
    height?: string | number,
    onFocus?: boolean,
    onError?: boolean,
    errorMessage?:string
}

const InputContainer = styled.View((props: StyleProps) => ({
    borderWidth:2,
    borderRadius: 4,
    borderColor: props.onError?'#eb5858': props.onFocus?'#17171c':'#d1d1de',
}));

const InputWarp = styled.View({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 40,
    alignItems:'center'
});

const RightTextWarp = styled.Text({
    color:'#6f6f7e'
});

const ErrorMsg = styled.Text({
    color: '#eb5858',
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'SpoqaHanSansNeo-Regular'
})

const StyledTextInput = styled.TextInput({
    borderWidth: 0,
    flexGrow:1,
    flexBasis:1,
    marginHorizontal: 8,
    fontFamily: 'SpoqaHanSansNeo-Regular'
})

const Non = styled.View({
    display: 'none'
})

type Props = {
    width?: string | number,
    height?: string | number,
    onError?: boolean,
    rightText?: string,
    icon?:ReactElement,
    text: string,
    onChange: (e?:any) => void,
    errorMessage?: string,
    diabled?: boolean,
    placeholder?: string,
    maxLength?: number,
    onBlur?: ()=>void
};
export const KirriTextInput = ({width, height, onError, rightText, icon, text, onChange, errorMessage, diabled, placeholder, maxLength, onBlur=()=>{}}:Props) => {
    const [onFocus, setOnFocus] = useState(false);
    const [val, setVal] = useState(text);
    useEffect(()=>{
        onChange(val);
    },[val]);
    return (
        <>
            <InputContainer
                onFocus = {onFocus}
                onError={onError}
            >
                <InputWarp>
                    {icon?icon:<Non></Non>}
                    <StyledTextInput
                        onChangeText={(text:string)=> setVal(text)}
                        onFocus={()=> {setOnFocus(true)}}
                        onBlur={()=> {setOnFocus(false); onBlur();}}
                        editable={diabled===true?false:true}
                        placeholder={placeholder}
                        defaultValue={val}
                        maxLength={maxLength?maxLength:3000}
                        // keyboardType='decimal-pad'
                        
                    />
                    {val?<TouchableOpacity onPress={()=>{setVal('')}}><Image source={require('@assets/images/search_bar_cancel_normal.png')}/></TouchableOpacity>: <Non></Non>}
                    {rightText?<RightTextWarp>{rightText}</RightTextWarp>:<Non></Non>}
                </InputWarp>
            </InputContainer>
            {onError && errorMessage? <ErrorMsg>{errorMessage}</ErrorMsg>: <Non></Non>}
        </>
    )
}

