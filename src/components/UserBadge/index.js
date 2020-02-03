import React from 'react';
import {connect} from 'react-redux';

function UserBadge(props) {
  const {authResult} = props;
  return (
      <span>
        {authResult.name && `Welcome, ${authResult.name}!`}
      </span>
  );
}

const mapStateToProps = (state) => ({
  authResult: state.auth,
});

export default connect(mapStateToProps, null)(UserBadge);