import React from 'react';
import {
  Widget, 
  addResponseMessage, 
  handleNewUserMessage
} from 'react-chat-widget';
import Cable from 'actioncable';
import LoginModal from '../common/LoginModal';
import { connect } from 'react-redux';

class ChatWidget extends React.Component {
  constructor( props ) {
    super( props );
  }

  componentWillMount() {
    this.createSocket();
    this.setState( {currentMessage: ''} );
  }

  handleNewUserMessage = ( newMessage ) => {
    this.chats.create( newMessage );   // send new message to the backend API
    this.state.currentMessage = newMessage;   // update state of current chat box
  }

  componentDidMount() {
    addResponseMessage("Welcome to Visualpedia awesome chatbox!");
    let userId = sessionStorage.getItem('userId');
  }

  getResponseMessage( message ) {
    //Make sure not to display own message in chat logs
    if (this.state.currentMessage === message) {
      //Reset the current message to null and return empty string
      this.state.currentMessage = '';
      return '';
    } else {
      //If it's not an own message, add to the chat log
      addResponseMessage( message );
      //Reset the current message to null
      this.state.currentMessage = '';
    }
  }

  createSocket() {
    let cable = Cable.createConsumer('http://localhost:3000/'+ 'cable');
    let userId = this.props.loggedIn.userId;

    //Create chat function
    this.chats = cable.subscriptions.create({ channel: 'ChatChannel' }, {
      connected: () => {},
      received: (data) => {
        this.getResponseMessage(data.content);
      },
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent,
          userId: userId
        });
      }
    });
  }

  render() {
    return (
      <Widget handleNewUserMessage={ this.handleNewUserMessage } title="Chat box" />
    );
  }
}

export default ChatWidget;