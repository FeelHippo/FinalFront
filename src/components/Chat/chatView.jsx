import React from 'react';
import Message from '../Message/message';

const ChatView = ({ messages, connectionStatus, username }) => {
    return(
        <div>
            <div>
                {
                    messages[username] &&
                    <div>
                        {
                            messages[username].map(message =>
                                <Message
                                    key={message.id}
                                    message={message.message}
                                    disabled={connectionStatus}
                                    username={username}    
                                />
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ChatView;