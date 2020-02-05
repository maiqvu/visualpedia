// import React, { Component } from 'react';
// import Chart from './Chart';
// import CheckBox from './CheckBox';
// import SelectIndicator from './SelectIndicator'
// import '../App.css'
// import axios from 'axios';
// import _ from 'lodash/collection';
//
//
//
// class ChartAPIRequest extends Component {
//
//   state = {
//     indicator: 'AG.LND.AGRI.ZS',
//     countriesLabels: [],
//     //countries: [],
//     data: {
//       labels: Array(10).fill(2006).map((y, i) => String(y + i)),
//       datasets: [],
//     },
//     infoToChart: {
//       labels: Array(10).fill(2006).map((y, i) => String(y + i)),
//       datasets: [],
//     },
//     title: '',
//     currentContinent: ''
//   };
//
//   getCountryAbbreviations = continent => {
//     const countryAbbreviations = {
//       northAmerica: 'us;ca;mx;cu;ni',  // US, Canada, Mexico, Cuba, Nicaragua
//       southAmerica: 'ar;br;sr;ve;co',  // Argentina, Brazil, Suriname, Venezuela, Colombia
//       africa: 'eg;za;ng;sd;cm',  // Egypt, South Africa, Nigeria, Sudan, Cameroon
//       europe: 'at;de;es;fr;gb',  // Austria, Germany, Spain, France, Great Britain
//       asia: 'id;in;kw;cn;ru',  // Indonesia, India, Kuwait, China, Russia
//       oceania: 'au;nz;to;nr;fj'  // Australia, New Zealand, Tonga, Nauru, Fiji
//     };
//     return countryAbbreviations[continent];
//   }
//
//   performSearch = (countries, indicator, timeRange='2006:2015') => {
//
//     axios.get(`https://api.worldbank.org/v2/country/${countries}/indicator/${indicator}?date=${timeRange}&format=json`)
//     .then(({data: [, dataArray]}) => {
//       const rawData = _.groupBy(dataArray, (d) => d.country.value);
//
//       this.setState({title: dataArray[0].indicator.value});
//
//       const datasets = [];
//       const countriesLabels = [];
//
//       for (const country in rawData) {
//         rawData[country] = _.sortBy(rawData[country], ['date']);
//         datasets.push({
//           label: country,
//           data: rawData[country].map(c => c.value)
//         });
//         countriesLabels.push(country);
//       }
//
//       this.setState({data: {datasets},
//                      countriesLabels: countriesLabels});  // {data: {...this.state.data, datasets}}
//     })
//     .then(() => {
//       this.updateNewRequest();
//     })
//     .catch(console.warn);
//   } // performSearch
//
//   componentDidMount() {
//     const continent = this.props.match.params.continent;
//     this.setState({currentContinent: continent});
//     this.performSearch(this.getCountryAbbreviations(continent), this.state.indicator)
//   }
//
//   componentDidUpdate(prevProps, prevState){
//     if (prevState.indicator !== this.state.indicator) {
//       const continent = this.state.currentContinent
//       this.performSearch(this.getCountryAbbreviations(continent), this.state.indicator);
//       //this.setState((state, props) => ({ infoToChart: {...this.state.infoToChart}}));
//       //this.updateChartDisplay();
//     }
//   }
//
//   updateNewRequest = () => {
//     const dataForNewIndicator = [];
//     for (let i = 0; i < this.state.infoToChart.datasets.length; i++) {
//       dataForNewIndicator.push(_.find(this.state.data.datasets, {label: this.state.infoToChart.datasets[i].label}))
//     }
//     this.setState((state, props) => ({ infoToChart: {datasets: [...dataForNewIndicator] }}));
//   }
//
//
//
//   handleChange = e => {
//     const target = e.target;
//     const value = target.value;
//
//    if (!target.checked) {
//      // remove value from preSelection
//      const toDisplay = this.state.infoToChart.datasets.filter(c => !c.label.includes(value));
//      // update sates to include only 'ticked' items
//      this.setState((state, props) => ({ infoToChart: {...this.state.infoToChart, datasets: [...toDisplay] }}));
//
//    } else {
//      // add new county to rest of state save as joined
//      const data = _.find(this.state.data.datasets, {label: value});
//      // const joined = this.state.infoToChart.datasets.concat(restructuredData);
//      // console.log('joined data', joined);
//      // update state with new value
//
//      this.setState((state, props) => ({ infoToChart: {...this.state.infoToChart, datasets: [...this.state.infoToChart.datasets, data] }}));
//    }
//   }
//
//   changeIndicator = (e) => {
//
//     let value = e.target.value;
//     this.setState({indicator: value});
//
//   }
//
//
//   render() {
//     return (
//       <div>
//         <div className="displayGraphDiv">
//           <div className="checkBox">
//             <CheckBox countriesLabels={this.state.countriesLabels} handleChange={this.handleChange} />
//             <div className="indicator">
//               <SelectIndicator
//               countriesLabels={this.state.countriesLabels}
//               handleChange={this.changeIndicator} />
//             </div>
//           </div>
//           {
//             this.state.infoToChart.length !== 0
//             ?
//             <div className="chartDisplay">
//               <h1>Agricultural Land in % of area</h1>
//               <Chart dataRange={this.state.infoToChart} title={this.state.title} />
//             </div>
//             :
//             <h1>Select some Countries so display</h1>
//           }
//         </div>
//       </div>
//     );
//   } // render()
// } // ChartAPIRequest
//
// export default ChartAPIRequest;
