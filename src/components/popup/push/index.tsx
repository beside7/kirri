import React, { ReactElement, useReducer, useContext, Fragment } from 'react';
import { MessageDataType } from '@type-definition/message';
import { Popup } from '@components';
import {MessageBody, MessageText, MessageFrom} from './push.style';

const MessageIcon = require('@assets/images/alarm/various_message.png');

const MessageDispatchContext = React.createContext<any>(null);

function reducer(state: MessageDataType[], action: any): MessageDataType[]{
    switch (action.type) {
        case 'ADD_MESSAGE_POPUP':
            return [action.payload, ...state];
        case 'REMOVE_MESSAGE_POPUP':
            return state.filter(msg => msg.id !== action.payload.id);
    }
    return [];
}


interface Props {
    children: ReactElement | ReactElement[]
}

const MessageContent = ({fromNickname, body}:MessageDataType) => {
    return(
        <MessageBody>
            <MessageText>{body}</MessageText>
            <MessageFrom>{fromNickname}</MessageFrom>
        </MessageBody>
    )
}

export const PushMessageProvider = ({children}: Props) => {
    const [state, dispatch] = useReducer(reducer, []);
    return(
        <MessageDispatchContext.Provider value={dispatch}>
            <Fragment>
                {children}
                {
                    state.map((message) => 
                        <Popup
                            headerIcon={MessageIcon}
                            title= '메시지 도착'
                            content={<MessageContent {...message}/>}
                            confirm='확인'
                            onConfirm={()=>{
                                dispatch({type: 'REMOVE_MESSAGE_POPUP', payload: {id: message.id}})
                            }}
                            open={true}
                        />)
                }
            </Fragment>
        </MessageDispatchContext.Provider>
    )
}

export function useMessagePopupDispatch() {
    const dispatch = useContext(MessageDispatchContext);
    if (!dispatch) {
      throw new Error('Cannot find MessageProvider');
    }
    return dispatch;
}