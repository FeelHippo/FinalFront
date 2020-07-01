import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import ChatView from '../components/Chat/chatView';
import { sendMessage, listenForIncomingMessage, listenConnectionChange } from '../store/actions/index'
import { connect } from 'react-redux';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.onSendMessageHandler = this.onSendMessageHandler.bind(this);
    this.onClearComposer = this.onClearComposer.bind(this);
    this.onChangeMessageHandler = this.onChangeMessageHandler.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.props.listenConnectionChange();
    this.props.listenForIncomingMessage();

    if(this.key) {
      this.props.closeSnackbar(this.key);
    }
  }

  sendMessage = message => {
    const {session: { username }} = this.props;
    this.props.sendMessage({
      message,
      username,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chat.connectionStatus !== this.props.chat.connectionStatus) {
      if (this.props.chat.connectionStatus) {
        this.key = this.props.enqueueSnackbar('Connection established');
      } else {
        this.key = this.props.enqueueSnackbar('Connection lost. Reconnecting');
      }
    }
  }

  onClearComposer = () => {
    this.setState({ message: '' });
  }

  onChangeMessageHandler(event) {
    this.setState({ message: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.onSendMessageHandler();
    }
  }

  onSendMessageHandler() {
    const { message } = this.state;
    if (this.props.chat.connectionStatus || !message) {
      return
    }
    this.sendMessage(message);
    this.onClearComposer();
  }

  render() {
    const { message } = this.state;
    return(
      <>
        <ChatView
          messages={this.props.chat.messages}
          connectionStatus={this.props.chat.connectionStatus}
          username={this.props.session.username}
        />
        <input 
          type="text"
          value={message}
          placeholder="type your message..."
          onChange={this.onChangeMessageHandler} 
          onKeyPress={this.handleKeyPress}
        />
        <button 
          onClick={this.onSendMessageHandler}
          disabled={this.props.chat.connectionStatus}>Send</button>
      </>
    )
  }

}

const mapStateToProps = state => {
  return {
    chat: state.chat,
    session: state.session,
  }
}

const mapDispatchToProps = dispatch => {  
    return {
      sendMessage: message => dispatch(sendMessage(message)),
      listenForIncomingMessage: () => dispatch(listenForIncomingMessage()),
      listenConnectionChange: () => dispatch(listenConnectionChange())
    }
}

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(Chat));