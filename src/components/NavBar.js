import React from 'react';
import {
  Link,
  HashRouter as Router
} from 'react-router-dom';

class NavBar extends React.Component {

  render(){

    return(
      <div className="navBarDiv">
        <Router>
          <nav className="navBar">
            <Link to='/chart/agri'>Agricultural Land</Link> | &nbsp;
            <Link to='/chart/gdp'>Gross Domestic Product</Link> | &nbsp;
            <Link to='/chart/tnrr'>Natural Resources Rents</Link> | &nbsp;
            <Link to='/chart/rec'>Renewable Energy Consumption</Link>
          </nav>
        </Router>
      </div>
    ) // return
  } // render

} // navBar

export default NavBar
