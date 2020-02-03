import React from 'react';
import {
  Route,
  Link,
  HashRouter as Router
} from 'react-router-dom';
import NavBar from './NavBar'
import AgricultureInfo from './AgricultureInfo'
import ChartGdp from './ChartGDP';
import RecInfo from './RecInfo';
import TNRRChart from './ChartTNRR';
import ContinentMap from './ContinentMap/ContinentMap.js';

class LandingPage extends React.Component {

  render(){

    return(
      <div className='LandingPage'>
        <div className="navBar">
          <NavBar />
        </div>
        <Router>

          <Route exact path='/chart/agri' component={AgricultureInfo} />
          <Route exact path='/chart/gdp' component={ChartGdp} />
          <Route exact path='/chart/rec' component={RecInfo} />
          <Route exact path='/chart/tnrr' component={TNRRChart} />


        </Router>
        <ContinentMap />
      </div>
    ) // return

  } //render

} // LandingPage

export default LandingPage
