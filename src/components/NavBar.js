import React from 'react';
import {
  Link,
  HashRouter as Router
} from 'react-router-dom';
import { connect } from 'react-redux';

import './NavBar.scss';
import * as actionCreators from '../actions';
import * as PropTypes from 'prop-types';

class NavBar extends React.Component {
  handleLogout = () => {
    const {logout} = this.props;
    logout();
  };

  render(){
    const {authResult} = this.props;

    return(
      <div className="navBarDiv">
        <Router>
          <nav className="navBar">
            <Link to='/chart/agri'>Agricultural Land</Link> | &nbsp;
            <Link to='/chart/gdp'>Gross Domestic Product</Link> | &nbsp;
            <Link to='/chart/tnrr'>Natural Resources Rents</Link> | &nbsp;
            <Link to='/chart/rec'>Renewable Energy Consumption</Link>
            {
              !authResult.auth_token &&
              <Link to='/login'>Login</Link>
            }
            {
              authResult.auth_token &&
              <button onClick={this.handleLogout}>Logout</button>
            }
          </nav>
        </Router>
      </div>
    ) // return
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
