import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import ChatView from '../components/Chat/chatView';
import { sendMessage, listenForIncomingMessage, listenConnectionChange, isTyping, notTyping } from '../store/actions/index'
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

  handleTyping = () => {
    this.props.isTyping(this.props.session.username);
  }

  noMoreTyping = () => {
    this.props.notTyping(null);
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
    if (event.target.value !== '') {
      this.handleTyping();
    } else {
      this.noMoreTyping()
    }
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
          typist={this.props.chat.typist}
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
          disabled={this.props.chat.connectionStatus}
          style={{width: "100%"}}
          >Send</button>
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
      listenConnectionChange: () => dispatch(listenConnectionChange()),
      isTyping: data => dispatch(isTyping(data)),
      notTyping: () => dispatch(notTyping())
    }
}

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(Chat));