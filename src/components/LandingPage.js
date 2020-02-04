import React from 'react';
import {
  Route,
  Link,
  HashRouter as Router, Redirect,
} from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from './NavBar'
import AgricultureInfo from './AgricultureInfo'
import GDPInfo from './GDPInfo';
import RecInfo from './RecInfo';
import TNRRInfo from './TNRRInfo';
import ContinentMap from './ContinentMap/ContinentMap.js';
import Login from './Login';
import Quiz from '../components/Quiz';
import PrivateRoute from './PrivateRoute';
import ChartInfo from './ChartInfo';
import ChatWidget from './ChatWidget/ChatWidget.js';

class LandingPage extends React.Component {
  checkLogin = () => this.props.authResult.auth_token;

  render(){


    return(
      <div className='LandingPage'>
        <div className="navBar">
          <NavBar />
        </div>
        <Router>
          <Route exact path='/' component={ContinentMap} />
          <Route exact path='/chart/agri' component={AgricultureInfo} />
          <Route exact path='/chart/gdp' component={GDPInfo} />
          <Route exact path='/chart/rec' component={RecInfo} />
          <Route exact path='/chart/tnrr' component={TNRRInfo} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/:continent/charts' component={ChartInfo} />
          <Route exact path='/chat' component={ChatWidget} />
          <PrivateRoute exact path='/quiz' component={Quiz} handleAuthCheck={this.checkLogin}/>
        </Router>

      </div>
    ) // return

  } //render

} // LandingPage

const mapStateToProps = (state) => ({
  authResult: state.auth,
});

export default connect(mapStateToProps, null)(LandingPage);
