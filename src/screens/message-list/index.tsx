import React, { useState, useRef, useEffect} from 'react'
import { Background, Header, Tabs, Dropdown, Popup } from "@components";
import AppNavigator from "./tab-navigator";
import { TouchableOpacity, Image, Text, FlatList } from 'react-native';
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import {Container, PickerWrap, AlarmListWarp, EmptyMessage, EmtyMsgImage, EmtyMsgText} from './messageList.style';
import { MessageDataType, MessageType, MessageResType, MessageReqType } from '@type-definition/message';
import { messageApis } from '@apis';
import { Message } from './Message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react';
import {UserStore} from '@store';


type MessageListProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "MassageList">;
}

const MessageList= observer(({ navigation } : MessageListProps) => {
    const selectedMessageType = useRef<'all' | MessageType>('all');
    const pageInfo = useRef({totalPage: 1, size: 10, lastId: 0});
    const [messageList, setMessageList] = useState<MessageDataType[]>([]);
    const [refreshing, setRefresing] = useState(true);
    const {nickname} = UserStore;
    const targetDiary = useRef<string>();
    const [acceptInvitationOpen, setAcceptInvitationOpen] = useState(false);
    const [cheeringDetailOpen, setcheeringDetailOpenOpen] = useState(false);
    

    const updateMessageStatus = (message:MessageDataType) => {
        setMessageList(messageList?.map(msg=> msg.id === message.id?message:msg));
    }

    const handleChangeSelectedMsgType = async (type: 'all'| MessageType) => {
        setRefresing(true);
        setMessageList([]);
        selectedMessageType.current = type;
        getMessages();
    }
    // const setMessages = (addMessageList: MessageDataType[]) => {
    //     let messages: MessageDataType[] = [];
    //     if (messageList) {
    //         messages = [...messageList];
    //     }
        
    //     setMessageList(messages.concat(addMessageList));
    //     setRefresing(false);
    // }
    const getMessages = async () => {
        try {
            let data:MessageResType;
            switch(selectedMessageType.current) {
                case 'all':
                    data = await messageApis.getAllMessages({size: pageInfo.current.size, lastId: pageInfo.current.lastId});
                    console.log(data);
                    break;
                default :
                    data = await messageApis.getMessagesByType({type: selectedMessageType.current});                   
                    break;
            }
            
            if (data.elements.length){
                setMessageList(data.elements);
            }
            setRefresing(false);
        } catch (error) {
            console.log(error);
        }
    
    }

    const setConfirmPopup = (uuid: string, type: MessageType) => {
        targetDiary.current = uuid;
        switch(type) {
            case "INVITATION":
                setAcceptInvitationOpen(true);
                break;
            case "CHEERING":
                break;
        }
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
                onConfirm={()=>{}}
                cancel='닫기'
                onCancel={()=>{
                    setAcceptInvitationOpen(false);
                }}

            />
        </Background>
    )
})

export default MessageList;
