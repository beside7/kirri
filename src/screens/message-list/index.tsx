import React, { useState, useRef, useEffect} from 'react'
import { Background, Header, Tabs, Dropdown, Popup } from "@components";
import AppNavigator from "./tab-navigator";
import { TouchableOpacity, Image, Text, FlatList } from 'react-native';
import { StackNavigatorParams, navigate } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import {Container, PickerWrap, AlarmListWarp, EmptyMessage, EmtyMsgImage, EmtyMsgText} from './messageList.style';
import { MessageDataType, MessageType, MessageResType, MessageReqType } from '@type-definition/message';
import { messageApis, diaryApis } from '@apis';
import { Message } from './Message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react';
import {UserStore} from '@store';
import { Snackbar } from 'react-native-paper';
import { CheerUpPopup } from './CheerUpPopup';

type CheerUpType = {
    body: string | undefined,
    from: string,
    diaryName: string,
    diaryId: string
};

type MessageListProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "MessageList">;
};

const MessageList= observer(({ navigation } : MessageListProps) => {
    const selectedMessageType = useRef<'all' | MessageType>('all');
    const pageInfo = useRef({totalPage: 1, size: 10, lastId: 0});
    const [messageList, setMessageList] = useState<MessageDataType[]>([]);
    const [refreshing, setRefresing] = useState(true);
    const {nickname} = UserStore;
    const targetDiary = useRef<string>('');
    const [acceptInvitationOpen, setAcceptInvitationOpen] = useState(false);
    const [cheeringDetail, setCheeringDetail] = useState<MessageDataType|undefined>(undefined);
    const [refuseInviteSnackVisible, setrefuseInviteSnackVisible] = useState(false);
    const [cheerUpMessageInfo, setCheerUpMessageInfo] = useState<CheerUpType>();

    const updateMessageStatus = (message:MessageDataType) => {
        getMessages();
    }

    const handleChangeSelectedMsgType = async (type: 'all'| MessageType) => {
        setRefresing(true);
        setMessageList([]);
        selectedMessageType.current = type;
    }

    const getMessages = async () => {
        try {
            let data:MessageResType;
            switch(selectedMessageType.current) {
                case 'all':
                    data = await messageApis.getAllMessages({size: pageInfo.current.size, lastId: pageInfo.current.lastId});
                    break;
                default :
                    data = await messageApis.getMessagesByType({type: selectedMessageType.current});                   
                    break;
            }
            if (data.elements.length){
                setMessageList([...data.elements, {
                    "body": "오늘 너의 기록에 반함",
                    "createdDate": "2021-10-02 09:08:25",
                    "diaryTitle": "테스트",
                    "diaryUuid": "bf9fa343-5351-41a2-8ec8-4e4fe41894fa",
                    "fromNickname": "Taeck2",
                    "id": 98,
                    "title": "초대 알림",
                    "type": "CHEERING",
                    "updatedDate": "2021-10-04 09:08:25",
                  },]);
            }
            setRefresing(false);
        } catch (error) {
            console.log(error);
        }
    
    }

    const setConfirmPopup = (uuid: string, type: MessageType|"REFUSE_INVITATION", message?: MessageDataType) => {
        targetDiary.current = uuid;
        switch(type) {
            case "INVITATION":
                setAcceptInvitationOpen(true);
                break;
            case "CHEERING":
                // setCheeringDetail(message);
                const {body, diaryUuid, fromNickname, diaryTitle} = message || {}; 
                setCheerUpMessageInfo({body, diaryId: diaryUuid || "", from: fromNickname || "", diaryName: diaryTitle || ""});
                break;
            case "REFUSE_INVITATION":
                setrefuseInviteSnackVisible(true);
                break;
                    
        }
    }

    const sendToDiary = async ()=>{
        const diary = await diaryApis.viewDiary(targetDiary.current);
        setAcceptInvitationOpen(false);
        // setCheeringDetail(undefined);
        setCheerUpMessageInfo(undefined);
        navigate("RecordInfo" , { diary })
    }

    useEffect(()=>{
        getMessages();
        // AsyncStorage.setItem('checkedAlarmTime', new Date)
    },[])
    
    return (
        <Background>
            <Header
                title="알림"
                leftIcon={require("@assets/icons/back.png")}
                onLeftClick={() => {
                    navigation.goBack()
                }}
            />
            <Container>
                
                <PickerWrap>
                    <Dropdown
                        items={[
                            {label: '전체', value:'all'},
                            {label: '응원', value:'CHEERING'},
                            {label: '초대', value:'INVITATION'}, 
                            // {label: '알림', value:'NOTIFICATION'},
                            // {label: '새기록', value:'NEW_RECORD'} 
                        ]}
                        value='all'
                        onChangeValue={(val)=>{handleChangeSelectedMsgType(val)}}
                    ></Dropdown>
                </PickerWrap>
                <AlarmListWarp>
                        <FlatList
                            data={messageList}
                            renderItem={({item})=> <Message {...item} to={nickname} setConfirmPopup={setConfirmPopup} updateMessageStatus={updateMessageStatus}/>}
                            keyExtractor={(item: MessageDataType)=> item.id.toString()}
                            // onEndReached={getMessages}
                            // onEndReachedThreshold={1}
                            onRefresh={()=>{
                                handleChangeSelectedMsgType(selectedMessageType.current);
                            }}
                            refreshing={refreshing}
                            ListEmptyComponent={
                                refreshing?<></>:
                                <EmptyMessage>
                                    <EmtyMsgImage source={require('@assets/images/alarm/notification_invite_empty.png')}/>
                                    <EmtyMsgText>받은 알림이 없어요!</EmtyMsgText>
                                </EmptyMessage>
                            }
                        />
                </AlarmListWarp>
            </Container>
            <Popup
                // width={}
                open={acceptInvitationOpen}
                content='다이어리 초대를 수락했어요'
                confirm='다이어리 보러가기'
                onConfirm={()=>{sendToDiary()}}
                cancel='닫기'
                onCancel={()=>{
                    setAcceptInvitationOpen(false);
                }}

            />
            <CheerUpPopup
                open={!!cheerUpMessageInfo}
                {...cheerUpMessageInfo}
                onClose={()=>{
                    setCheerUpMessageInfo(undefined);
                }}
            />
            <Snackbar
                style={{bottom: 20}}
                visible={refuseInviteSnackVisible}
                onDismiss={()=>{
                    setrefuseInviteSnackVisible(false);
                }}
                duration={3000}

            >
                다이어리 초대를 거절했어요.
            </Snackbar>
        </Background>
    )
})

export default MessageList;
