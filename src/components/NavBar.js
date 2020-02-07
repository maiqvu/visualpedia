import React from 'react';
import {HashRouter as Router, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './NavBar.scss';
import * as actionCreators from '../actions';
import * as PropTypes from 'prop-types';
import UserBadge from '../components/UserBadge';

class NavBar extends React.Component {
  handleLogout = () => {
    const {logout} = this.props;
    logout();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
  };

  componentDidMount() {
    const {loginSuccess} = this.props;
    const token = localStorage.getItem('auth_token');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (token && name && email) {
      loginSuccess({auth_token: token, name, email});
    }
  }

  render() {
    const {authResult} = this.props;

    return (
        <div className="navBarDiv">
          <Router>
            <nav className="navBar">
              <Link to='/'>Visualpedia</Link>
              <div className="user-menu">
                <UserBadge></UserBadge>
                {
                  authResult.auth_token &&
                  <>
                    <Link to='/quiz'>Take a Quiz!</Link>
                    <Link to='/vpsocial'>Visualpedia Social</Link>
                  </>
                }
                {
                  !authResult.auth_token &&
                  <>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Sign up</Link>
                  </>
                }
                {
                  authResult.auth_token &&
                  <button onClick={this.handleLogout}>Logout</button>
                }
              </div>
            </nav>
          </Router>
        </div>
    ); // return
  } // render

} // navBar

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  authResult: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authResult: state.auth,
});

export default connect(mapStateToProps, actionCreators)(NavBar);
