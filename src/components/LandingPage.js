import React from 'react';
import {
  Route,
  Link,
  HashRouter as Router
} from 'react-router-dom';
import NavBar from './NavBar'
import AgricultureInfo from './AgricultureInfo'
import GDPInfo from './GDPInfo';
import RecInfo from './RecInfo';
import TNRRInfo from './TNRRInfo';
import ContinentMap from './ContinentMap/ContinentMap.js';
import Login from './Login/Login';

class LandingPage extends React.Component {

  render(){

    return(
      <div className='LandingPage'>
        <div className="navBar">
          <NavBar />
        </div>
        <Router>

          <Route exact path='/chart/agri' component={AgricultureInfo} />
          <Route exact path='/chart/gdp' component={RecInfo} />
          <Route exact path='/chart/rec' component={RecInfo} />
          <Route exact path='/chart/tnrr' component={TNRRInfo} />
          <Route exact path='/login' component={Login} />


        </Router>
        <ContinentMap />
      </div>
    ) // return

  } //render

} // LandingPage

export default LandingPage
