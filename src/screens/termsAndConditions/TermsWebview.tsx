import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@components";
import { navigateGoBack } from "@config/navigator";
import { WebviewContainer } from "./termsWebview.style";
import { WebView } from "react-native-webview";
import { userApis } from "@apis";
import { TermsResType } from "@type-definition/user";
import { StackNavigatorParams } from "@config/navigator";
import { RouteProp } from "@react-navigation/native";

interface Props {
    route: RouteProp<StackNavigatorParams, "TermsWebview">;
}

export const TermsWebview = ({ route }: Props) => {
    const [termList, setTermList] = useState<TermsResType[]>([]);
    const [term, setTerm] = useState<TermsResType>();
    const [type, setType] = useState<string | undefined>(route.params.type);
    const [title, setTitle] = useState<string>(route.params.title);
    const [url, setUrl] = useState<string | undefined>(route.params.url);

    const getTermList = async () => {
        try {
            const data = await userApis.getTerms();
            setTermList(data ? data : []);
            return data;
        } catch (error) {
            return [];
        }
        return [];
    };

    const setWebview = async () => {
        let terms: TermsResType[] | undefined = termList;
        if (!termList.length) {
            terms = await getTermList();
        }
        setTerm(terms?.find(data => data.type === type));
    };
    useEffect(() => {
        if (url) {
            setWebview();
        }
    }, [type, url]);

    return (
        <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
            <Header
                title={title}
                leftIcon={require("@assets/images/common/various_back_normal.png")}
                onLeftClick={() => {
                    navigateGoBack();
                }}
            />

            <WebviewContainer>
                {url ? (
                    <WebView
                        source={{ uri: url }}
                        scalesPageToFit={true}
                        style={{
                            flex: 1,
                            resizeMode: "cover",
                            width: "100%"
                        }}
                    />
                ) : (
                    <></>
                )}
                {term ? (
                    <WebView
                        source={{ uri: term.url }}
                        scalesPageToFit={true}
                        style={{
                            flex: 1,
                            resizeMode: "cover",
                            width: "100%"
                        }}
                    />
                ) : (
                    <></>
                )}
            </WebviewContainer>
        </SafeAreaView>
    );
};
