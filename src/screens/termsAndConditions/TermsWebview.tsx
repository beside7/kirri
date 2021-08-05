import React, {useEffect, useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@components';
import { navigateGoBack } from '@config/navigator';
import {WebviewContainer} from './termsWebview.style';
import { WebView } from 'react-native-webview';
import { SERVER_URL, userApis } from '@apis';
import {TermsResType} from '@type-definition/user'

export const TermsWebview = () => {
    const [termList, setTermList] = useState<TermsResType[]>([]);
    const getTermList = async () => {
        try {
            const data = await userApis.getTerms();
            setTermList(data?data:[]);
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getTermList();
    },[])
    return (
        <SafeAreaView
            style={{backgroundColor: '#fff', height: '100%'}}
        >
            <Header
                title='개인정보 처리 방침'
                leftIcon={require('@assets/images/common/various_back_normal.png')}
                onLeftClick={()=>{navigateGoBack()}}
            />
                
            <WebviewContainer>
                {
                    (termList).map((term)=>
                        <WebView
                            
                            key={term.id}
                            source={{uri: term.url}}
                            scalesPageToFit={true}
                            style={{
                                flex: 1,
                                resizeMode: 'cover',
                                width:'100%',
                                
                            }}
                        />
                    )
                }
                
            </WebviewContainer>
        </SafeAreaView>
    )
}