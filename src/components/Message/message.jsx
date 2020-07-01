import React from 'react';
import moment from 'moment';
import { messaging } from '../../store/types/types';

const Message = ({ message, username }) => {
    return(
        <>
            <div>{message.type === messaging.MESSAGE_TYPE.SENT ? `${username}` : 'User'}</div>
            <div>{message.message}</div>
            <div>{moment(message.timestamp).format('LLLL')}</div>
        </>
    )
}

export default Message;