import React from 'react';
import Message from '../Message/message';

const ChatView = ({ messages, connectionStatus, username, typist }) => {
    return(
        <div>
            <div>
                {
                    messages &&
                    <div>
                        {
                            typist ? <h3>{typist} is Typing...</h3> : null
                        }
                        {
                            messages.map(message =>
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