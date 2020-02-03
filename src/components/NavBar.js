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
  };

  render() {
    const {authResult} = this.props;

    return (
        <div className="navBarDiv">
          <Router>
            <nav className="navBar">
              <Link to='/chart/agri'>Agricultural Land</Link>|
              <Link to='/chart/gdp'>Gross Domestic Product</Link>|
              <Link to='/chart/tnrr'>Natural Resources Rents</Link>|
              <Link to='/chart/rec'>Renewable Energy Consumption</Link>
              <div className="user-menu">
                <UserBadge></UserBadge>
                {
                  authResult.auth_token &&
                  <Link to='/'>Take a Quiz!</Link>
                }
                {
                  !authResult.auth_token &&
                  <Link to='/login'>Login</Link>
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
