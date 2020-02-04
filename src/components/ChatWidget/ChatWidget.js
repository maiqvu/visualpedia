import React from 'react';
import ActionCable from 'action-cable-react-jwt';
// import Cable from 'actioncable';
import './ChatWidget.css';

class ChatWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: '',
      chatLogs: []
    };
  }

  updateCurrentChatMessage(event) {
    this.setState({ currentChatMessage: event.target.value });
  }

  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(this.state.currentChatMessage);
    this.setState({ currentChatMessage: '' });
  }

  handleChatInputKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSendEvent(event);
    }
  }

  createSocket() {
    const yourToken = localStorage.getItem('auth_token');   // get JWT token that is saved in local storage

    this.cable = ActionCable.createConsumer('ws://localhost:3000/cable', yourToken);

    // Subscribe to a channel for receiving data being broadcasted from server-side
    this.chats = this.cable.subscriptions.create(
      { channel: 'ChatChannel' },
      {
        connected: () => {},
        disconnected: () => {},
        received: (data) => {
          // console.log(data);
          let chatLogs = this.state.chatLogs;
          chatLogs.push( data );
          this.setState({ chatLogs: chatLogs });
        },
        create: function(chatContent) {
          this.perform('create', { content: chatContent });
        }
      }
    );
  }

  componentDidMount() {
    this.createSocket();
  }

  renderChatLog() {
    return this.state.chatLogs.map((el) => {
      return (
        <li key={`chat_${el.id}`}>
          <span className='chat-message'>{ el.content }</span>
          <span className='chat-created-at'>{ el.created_at }</span>
        </li>
      );
    });
  }

  componentWillUnmount(){
    // console.log('unmounting!');
    this.cable.subscriptions.remove(this.chats);
    this.cable.disconnect();
  }

  render() {
    return (
      <div className='App'>
        <div className='stage'>
          <h1>Chat</h1>
          <div className='chat-logs'>
            <ul className='chat-logs'>
              { this.renderChatLog() }
            </ul>
          </div>
          <input type='text' placeholder='Enter your message...' className='chat-input'
                value={ this.state.currentChatMessage }
                onChange={ (e) => this.updateCurrentChatMessage(e) }
                onKeyPress={ (e) => this.handleChatInputKeyPress(e) } />
          <button className='send' onClick={ (e) => this.handleSendEvent(e) }>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default ChatWidget;