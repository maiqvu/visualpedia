import React from 'react';
import axios from 'axios';
import AgricultureChart from './AgricultureChart'
import CheckBox from './CheckBox'
import _ from 'lodash/collection';
const INDICATOR = 'AG.LND.AGRI.ZS'
const TIME_RANGE = '2006:2015'
const COUNTRIES = 'br;sur;jpn;arg;deu'
const BASE_URL = `http://api.worldbank.org/v2/country/`
const SECOND_HALF = `/indicator/${INDICATOR}?date=${TIME_RANGE}&format=json`

class AgricultureInfo extends React.Component {
  state = {

    countries: [],
    sortedResults: []
  }

  splitData = (arrayToGroup) => {
    // lodash group by array, constant, what should be returned
    const rawData = _.groupBy(arrayToGroup, countryEach => countryEach.country.value)
    // data now array of objects with country name as key
    this.setState({sortedResults: rawData})
  } // spilt data

  sortData = (res) => {
    // set allresults to = api results
    const response = res[1];
    this.splitData(response)

  } // sort data

  performSearch = (countries) => {
    axios.get(`${BASE_URL}${countries}${SECOND_HALF}`)
    .then(res => {
      // take base url and call sortData() with data argument
      console.log(res);
      this.splitData(res.data[1])
    })
    .catch( err => {
      console.warn(err)
    })
  } // performSearch

  handleSubmit = (e) => {
    // prevent reload
    e.preventDefault();
    //join search items
    let searchString = this.state.countries.join(';')
    // search for countries to use
    this.performSearch(searchString )
  }

  handleChange = (e) => {

       const target = e.target;

       const value = target.value;
       var joined = this.state.countries.concat(value);
       this.setState({ countries: joined })
       console.log(this.state.countries);
        const name = target.name;
        // not working replacing each time not 'pushing' end
        // need to fix
        // this.setState({toDisplay: {...this.state.toDisplay, countries}})

   } // handleChange

  // componentDidMount(){
  //   this.performSearch()
  // } // componentdidmount
  render(){

    return(
      <div>
        <CheckBox arg={this.state.arg} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        {
          this.state.sortedResults.length !== 0
          ?
          <div className="agricultureChart">
            <h1>Agricultural Land in % of area</h1>
            <AgricultureChart dataRange={this.state.sortedResults}/>
          </div>
          :
          <h1>Loading ..</h1>
        }
      </div>
    ) // render
  } // render
} //ChartCO2

export default AgricultureInfo
