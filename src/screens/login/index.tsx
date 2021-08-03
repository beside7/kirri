import React, {ReactElement, useState, useCallback, useRef, useEffect} from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'

import styles from './login.style'

import { Background } from "@components";
import {LoginWebview} from '@components';
import { SERVER_URL, userApis } from '@apis';
import {navigate} from '@config/navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import { updateExpoToken } from "@utils";


type LoginProps = {
};

export default function Login({ }: LoginProps): ReactElement {
    const [kakaoLoginOpen, setKakaoLoginOpen] = useState(false);
    const [appleLoginOpen, setAppleLoginOpen] = useState(false);
    const result = React.useRef<any>({});
    const onBoardCnt = useRef(4);
    const [onBoardIndex, setOnBoardIndex] = useState(0);
    const [showLoginImage, setShowLoginImage] = useState(false);


    const onComplete = async (event: any) => {
        result.current = JSON.parse(event.nativeEvent.data);
        let success = result.current.accessToken;
        setKakaoLoginOpen(false);
        setAppleLoginOpen(false);
        AsyncStorage.setItem('userKey', 'Bearer '+success , () => {
            updateExpoToken().then(res => {
                if(res){
                    userApis.updatePush({
                        CHEERING: true,
                        NEW_RECORD: true,
                        NOTIFICATION: true,
                        INVITATION: true
                    })
                }
            })
        });
        if (success && (result.current.status === 'REQUIRED_SIGN_UP')){
            navigate('Nickname', result.current);
        } else {
            navigate('Home', null);
        }
    }

    const renderItems = ({item, index}: {item:any, index:number}) => {
        return (<View style={styles.swiperContent}>
            <Image style={styles.swiperImage} source={item.image}></Image>
            <Text style={styles.swiperText}>{item.title[0]}</Text>
            <Text style={styles.swiperText}>{item.title[1]}</Text>
        </View>)

    }

    useEffect(()=>{
        setShowLoginImage(true);
    }, [onBoardIndex])
    
    return (
        <Background>
            <LoginWebview
                source={`${SERVER_URL}/kakao-sign-in`}
                closeSocialModal={kakaoLoginOpen}
                onComplete={onComplete}
            />
            <LoginWebview
                source={`${SERVER_URL}/apple-sign-in`}
                closeSocialModal={appleLoginOpen}
                onComplete={onComplete}
            />
            <View style={styles.content}>
                <View
                    style={styles.swiperContainer}
                >
                    <View style={styles.swiperWarp}>
                        <Carousel
                            data={
                                [
                                    {image: require('@assets/images/login/onboarding_01.png'),
                                    title: ['우리가 함께 만드는', '공유 일기']},
                                    {image: require('@assets/images/login/onboarding_02.png'),
                                    title: ['작은 일상 부터', '소중한 순간 까지']},
                                    {image: require('@assets/images/login/onboarding_03.png'),
                                    title: ['덕질한 친구들에게', '보내는 응원의 한마디']},
                                    {image: require('@assets/images/login/onboarding_04.png'),
                                    title: ['이제, 우리들 만의', '다이어리 기록을 만들어 보세요!']}
                                
                                ]
                            }
                            renderItem={renderItems}
                            sliderWidth={315}
                            itemWidth={315}
                            onSnapToItem={(index)=>{setOnBoardIndex(index)}}
                        >

                        </Carousel>
                    </View>
                    <View style={styles.swiperIndexWarp}>
                        {
                            (new Array(onBoardCnt.current)).fill(0).map((val, index)=>index===onBoardIndex?<View style={styles.swiperIndexActive} key={'onboardindex_'+index}></View>:<View  key={'onboardindex_'+index} style={styles.swiperIndex}></View>)
                        }
                    </View>
                </View>
                {(showLoginImage?<><TouchableOpacity
                    style={styles.kakaoButton}
                    onPress={(e: any)=> {
                        setKakaoLoginOpen(true);    
                    }}
                >
                    <Image style={styles.buttonImage} source={require('@assets/images/login/kakao.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.appleButton}
                    onPress={(e: any)=> {
                        setAppleLoginOpen(true);    
                    }}
                >
                    <Image  style={styles.buttonImage} source={require('@assets/images/login/apple.png')}/>
                </TouchableOpacity></>:<></>)}
                {/* <Text style={styles.message}>아직 끼리에 가입하지 않으셨나요?</Text> */}
            </View>
        </Background>
    )
}
