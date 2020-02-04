import React from 'react';
import {
  Route,
  Link,
  HashRouter as Router, Redirect,
} from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from './NavBar'
import ContinentMap from './ContinentMap/ContinentMap.js';
import Login from './Login';
import Quiz from '../components/Quiz';
import PrivateRoute from './PrivateRoute';
import ChartInfo from './ChartInfo';
import ChatWidget from './ChatWidget/ChatWidget.js';
import NewsFeed from './NewsFeed'

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
          <Route exact path='/login' component={Login} />
          <Route exact path='/:continent/charts' component={ChartInfo} />
          <Route exact path='/chat' component={ChatWidget} />
          <PrivateRoute exact path='/quiz' component={Quiz} handleAuthCheck={this.checkLogin}/>
          <NewsFeed exact path="/newsfeed" component={NewsFeed} />
        </Router>

      </div>
    ) // return

  } //render

} // LandingPage

const mapStateToProps = (state) => ({
  authResult: state.auth,
});

export default connect(mapStateToProps, null)(LandingPage);
