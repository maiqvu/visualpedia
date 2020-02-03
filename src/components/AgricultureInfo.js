import React from 'react';
import axios from 'axios';
import Chart from './Chart';
import CheckBox from './CheckBox';
import '../App.css'
import _ from 'lodash/collection';
const INDICATOR = 'AG.LND.AGRI.ZS';
const TIME_RANGE = '2006:2015';
const COUNTRIES = 'br;chl;arg;ecu;sur';
const BASE_URL = `https://api.worldbank.org/v2/country/`;
const SECOND_HALF = `/indicator/${INDICATOR}?date=${TIME_RANGE}&format=json`

class AgricultureInfo extends React.Component {
  state = {

    sortedResults: [],
    resultsToDisplay: [],
    infoToChart: [],
    countriesLabel: [],
    countriesToSearch: ''
  }

  splitData = (arrayToGroup) => {
    // lodash group by array, constant, what should be returned
    const rawData = _.groupBy(arrayToGroup, countryEach => countryEach.country.value)
    // create list to get name of all countries from api call
    let countryEach = []
    // loop through data get key values
    for (let key in rawData){
    // push keys into countryEach
      countryEach.push(key)
    }
    // set countries each to eqaul counties searched for
    this.setState({countriesLabel: countryEach})
    // search sorted results to rawData
    this.setState({sortedResults: rawData})

  } // spilt data

  performSearch = (countries) => {
    axios.get(`${BASE_URL}${countries
    }${SECOND_HALF}`)
    .then(res => {
      // take base url and call sortData() with data argument

      this.splitData(res.data[1]
      )
    })
    .catch( err => {
      console.warn(err)
    })
  } // performSearch

  handleSubmit = (e) => {
    // prevent reload
    e.preventDefault();
    //
    let listToUpdateState = {};
    let listToCompareObject = this.state.sortedResults
    let listToCompareName = this.state.resultsToDisplay

    listToCompareName.forEach(c => {
      listToUpdateState[c] = listToCompareObject[c]
    })

    this.setState({infoToChart: listToUpdateState})

  }

  handleChange = (e) => {
    // get state save as preSelection
    let preSelection = this.state.resultsToDisplay;
    // target event
    const target = e.target;
    // get value of event
    const value = target.value;
    // if state has value
   if (preSelection.includes(value)) {
     // remove value from preSelection
     const toDisplay = preSelection.filter(e => e !== value)
     // update sates to include only 'ticked' items
     this.setState({resultsToDisplay: toDisplay})

   } else {
     // add new county to rest of state save as joined
     const joined = this.state.resultsToDisplay.concat(value);
     // update state with new value
     this.setState({ resultsToDisplay: joined });
   } // if

  } // handleChange

  componentDidMount(){
    this.setState({countriesToSearch: 'br;chl;arg;ecu;sur'})
    // pass props in imediataly
    // pass in countrys to search and indicator
    this.performSearch('br;mex;arg;ecu;sur')
  } // componentdidmount

  render(){

    return(
      <div>
        <div className="displayGraphDiv">
          <div className="checkBox">
            <CheckBox countriesLabels={this.state.countriesLabel} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
          </div>
          {
            this.state.infoToChart.length !== 0
            ?
            <div className="chartDisplay">
              <h1>Agricultural Land in % of area</h1>
              <Chart dataRange={this.state.infoToChart} />
            </div>
            :
            <h1>Select some Countries so display</h1>
          }
        </div>
      </div>
    ) // render
  } // render
} //ChartCO2

export default AgricultureInfo
