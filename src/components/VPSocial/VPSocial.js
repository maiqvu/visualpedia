import React from 'react';
import ActionCableProvider from 'react-actioncable-provider';
import { API_WS_ROOT } from '../../constants';
import ConversationsList from './ConversationsList';

class VPSocial extends React.Component {
  render() {
    return (
      <ActionCableProvider url={ API_WS_ROOT }>
        <ConversationsList />
      </ActionCableProvider>
    );
  }
}

export default VPSocial;