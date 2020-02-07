import React from 'react';
import axios from 'axios';
import Chart from './Chart';
import CheckBox from './CheckBox';
import SelectIndicator from './SelectIndicator'
import NewsFeed from './NewsFeed'
import SelectChart from './SelectChart';
import '../App.css'
import _ from 'lodash/collection';
const BASE_URL = `https://api.worldbank.org/v2/country/`;
const INDICATOR_BASE_URL = 'https://visualpedia-backend.herokuapp.com/indicators/';
const host = (env) => env === 'production'
    ? 'https://visualpedia-backend.herokuapp.com/indicators/'
    : 'http://localhost:3000/indicators/';

const COUNTRY_ABBREVIATIONS = {
  northAmerica: 'us;ca;mx;cu;ni',  // US, Canada, Mexico, Cuba, Nicaragua
  southAmerica: 'ar;br;sr;ve;co',  // Argentina, Brazil, Suriname, Venezuela, Colombia
  africa: 'eg;za;ng;sd;cm',  // Egypt, South Africa, Nigeria, Sudan, Cameroon
  europe: 'at;de;es;fr;gb',  // Austria, Germany, Spain, France, Great Britain
  asia: 'id;in;kw;cn;ru',  // Indonesia, India, Kuwait, China, Russia
  oceania: 'au;nz;to;nr;fj'  // Australia, New Zealand, Tonga, Nauru, Fiji
};

class ChartInfo extends React.Component {
  state = {
    sortedResults: [],
    resultsToDisplay: [],
    infoToChart: [],
    countriesLabel: [],
    currentContinent: [],
    countriesToSearch: '',
    indicatorToDisplay: 'AG.LND.AGRI.ZS',
    indicatorLabels: [],
    title: '',
    chartType: 'line'
  }




  splitData = (arrayToGroup) => {
    // lodash group by array, constant, what should be returned
    const rawData = _.groupBy(arrayToGroup, countryEach => countryEach.country.value)
    // create list to get name of all countries from api call

    this.setState({title: arrayToGroup[0].indicator.value});

    let countryEach = []
    // loop through data get key values
    for (let key in rawData){
    // push keys into countryEach
      countryEach.push(key)
    }
    // set countries each to eqaul counties searched for

    console.log('SPLITDATA');

    this.setState(
      {
        countriesLabel: countryEach,
        sortedResults: rawData,
        // infoToChart: rawData
      },
      () => this.updateChartDisplay()
    );

    // console.log(this.state.infoToChart);
    // search sorted results to rawData
    // this.setState({sortedResults: rawData})
    // this.setState({infoToChart: rawData})
    } // spilt data

  getCountryAbbreviations = continent => {
    return COUNTRY_ABBREVIATIONS[continent];
  }

  performSearch = (countries, indicator, timeRange='2006:2015') => {

    const continent = this.props.match.params.continent;
    axios.get(`https://api.worldbank.org/v2/country/${countries}/indicator/${indicator}?date=${timeRange}&format=json`)
    .then(res => {
      // take base url and call sortData() with data argument

      this.splitData(res.data[1]);
      console.log(res.data[1]);
      // console.log('this.updateChartDisplay()');
    })
    // .then(() => {
    //   this.updateChartDisplay();
    // })
    .catch( err => {
      console.warn(err)
    })
  } // performSearch

  filterCountriesByCheckBox(checkedCountries){

  }


  handleChange = (e) => {
    // get state save as preSelection
    let preSelection = this.state.resultsToDisplay;
    // target event
    const target = e.target;
    // get value of event
    const value = target.value;
    // if state has value
   if (!target.checked) {  // preSelection.includes(value)
     // remove value from preSelection
     const toDisplay = preSelection.filter( box => box !== value);
     // update sates to include only 'ticked' items
     this.setState(
       {resultsToDisplay: toDisplay},
       () => this.updateChartDisplay()
     );
     console.log('selected false');

   } else {
     console.log('selected true');
     // add new county to rest of state save as joined
     // const joined = this.state.resultsToDisplay.concat(value);
     // update state with new value
     this.setState(
       { resultsToDisplay: [...this.state.resultsToDisplay, value] },
       () => this.updateChartDisplay()
     );
   } // if

  } // handleChange

  changeIndicator = (e) => {
    const indicatorSubString = e.target.value;
    axios.get(`${host(process.env.NODE_ENV)}${indicatorSubString}.json`)
      .then(res => {
        let labels = [];
        labels = res.data.map(r => [r.label, r.indicator_search]);
        this.setState({indicatorLabels: labels});
        console.log('labels:', labels);

        if (res.data.length === 1) {
          this.setState({indicatorToDisplay: res.data[0].indicator_search});
        }
      })
      .catch(res => {
        this.setState({indicatorLabels: []});
        console.warn(res);
      });

  } // changeIndicator

  chooseIndicator = (e) =>{
    console.log(e.target.value);
    const indicator = e.target.dataset.indicator;//this.state.indicatorToDisplay;
    console.log(this.state.indicatorToDisplay);
    console.log(indicator);
    this.performSearch(this.getCountryAbbreviations(this.state.currentContinent), indicator);
  }

  submitIndicator = e => {
    e.preventDefault();
    if (e.target.dataset.indicator) {
      this.setState({indicatorToDisplay: e.target.dataset.indicator});
    }
    console.log('click:', e.target.dataset.indicator);
    const indicator = this.state.indicatorToDisplay;
    if (indicator) {
      this.performSearch(this.getCountryAbbreviations(this.state.currentContinent), indicator);
    }
  }

  changeChart = e => {
    this.setState({chartType: e.target.value});
  }

  updateChartDisplay(){
    let listToUpdateState = {};
    let listToCompareObject = this.state.sortedResults;
    let listToCompareName = this.state.resultsToDisplay;

    // console.log('FULL:', listToCompareObject);

    listToCompareName.forEach(c => {
      listToUpdateState[c] = listToCompareObject[c]
    });

    // console.log('FILTERED:', listToUpdateState);

    this.setState({infoToChart: listToUpdateState})
  }

  getNews(){
    let continent = this.props.match.params.continent
    let newsSearch;
    if (continent === 'africa') {
      newsSearch = 'ng'
    } else if (continent === 'northAmerica') {
      newsSearch = 'us'
    } else if (continent === 'southAmerica'){
      newsSearch = 'ar'
    } else if (continent === "europe") {
      newsSearch = 'gb'
    } else {
      newsSearch = 'au'
    }

    return newsSearch
  }



  componentDidMount(){
    const continent = this.props.match.params.continent;
    this.setState({currentContinent: continent});

    // pass props in imediataly
    // pass in countrys to search and indicator
    this.performSearch(this.getCountryAbbreviations(continent), this.state.indicatorToDisplay);
  } // componentdidmount


  render(){

    return(
      <div>
      <div className="contianerInfo">
        {
          this.state.infoToChart.length !== 0
          ?
        <div className="displaycheckBoxDiv">
          <div className="checkBox">
            <CheckBox countriesLabels={this.state.countriesLabel} handleChange={this.handleChange}  checked={this.state.checked}/>
            <div className="indicator">
              <SelectIndicator
              countriesLabels={this.state.countriesLabel}
              handleSubmit={this.submitIndicator}
              handleChange={this.changeIndicator}
              labels={this.state.indicatorLabels}
              chooseIndicator={this.chooseIndicator}
              />
            </div>
          </div>
          </div>
          :
          <h1></h1>
        }
          <div className="chartDiv">
          {
            this.state.infoToChart.length !== 0
            ?
            <div className="chartDisplay">
              <Chart chart={this.state.chartType} dataRange={this.state.infoToChart} title={this.state.title} key={Math.random()}/>
            </div>
            :
            <div className="loader"></div>
          }

          </div>
          <div className="displayselectChartDiv">
            <div className="SelectChart">
              <SelectChart handleChange={this.changeChart}/>
            </div>
          </div>

        </div>
        <div className="newsFeed">
          <NewsFeed localSearch={this.getNews()}/>
        </div>
      </div>
    ) // render
  } // render
} //ChartCO2

export default ChartInfo;
