import React from 'react';
import axios from 'axios';
import Chart from './Chart';
import CheckBox from './CheckBox';
import SelectIndicator from './SelectIndicator'
import '../App.css'
import _ from 'lodash/collection';

class ChartInfo extends React.Component {
  state = {

    sortedResults: [],
    resultsToDisplay: [],
    infoToChart: [],
    countriesLabel: [],
    countriesToSearch: '',
    indicatorToDisplay: 'AG.LND.AGRI.ZS'
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

  getCountryAbbreviations = continent => {
    const countryAbbreviations = {
      northAmerica: 'us;ca;mx;cu;ni',  // US, Canada, Mexico, Cuba, Nicaragua
      southAmerica: 'ar;br;sr;ve;co',  // Argentina, Brazil, Suriname, Venezuela, Colombia
      africa: 'eg;za;ng;sd;cm',  // Egypt, South Africa, Nigeria, Sudan, Cameroon
      europe: 'at;de;es;fr;gb',  // Austria, Germany, Spain, France, Great Britain
      asia: 'id;in;kw;cn;ru',  // Indonesia, India, Kuwait, China, Russia
      oceania: 'au;nz;to;nr;fj'  // Australia, New Zealand, Tonga, Nauru, Fiji
    };
    return countryAbbreviations[continent];
  }

  performSearch = (indicator=this.state.indicatorToDisplay) => {

    const continent = this.props.match.params.continent;

    const INDICATOR = indicator;
    const TIME_RANGE = '2006:2015';
    const COUNTRIES = this.getCountryAbbreviations(continent); //'br;chl;arg;ecu;sur';
    const BASE_URL = `https://api.worldbank.org/v2/country/`;
    const SECOND_HALF = `/indicator/${INDICATOR}?date=${TIME_RANGE}&format=json`

    axios.get(`${BASE_URL}${COUNTRIES
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

  changeIndicator = (e) => {

    let value = e.target.value

    this.setState({indicatorToDisplay: value})
    console.log(value);
  } // changeIndicator

  componentDidMount(){

    // pass props in imediataly
    // pass in countrys to search and indicator
    this.performSearch()
  } // componentdidmount

  componentDidUpdate(prevProps, prevState){
    if (prevState.indicatorToDisplay !== this.state.indicatorToDisplay) {
      this.performSearch( this.state.indicatorToDisplay)
    } // if

  }

  render(){

    return(
      <div>
        <div className="displayGraphDiv">
          <div className="checkBox">
            <CheckBox countriesLabels={this.state.countriesLabel} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
          </div>
          <div className="indicator">
            <SelectIndicator
            countriesLabels={this.state.countriesLabel}
            handleChange={this.changeIndicator} />
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

export default ChartInfo
