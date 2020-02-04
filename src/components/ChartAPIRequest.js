// import React, { Component } from 'react';
// import axios from 'axios';
// import _ from lodash 'lodash/collection';
//
// const INDICATOR = `NY.GDP.MKTP.CD`;
// const TIME_RANGE = `2005:2015`;
// const COUNTRIES = `br;sur;jpn;arg;deu`;
// const URL = `http://api.worldbank.org/v2/country/${COUNTRIES}/indicator/${INDICATOR}?date=${TIME_RANGE}&format=json`;
//
// class ChartAPIRequest extends Component {
//
//   state = {
//     indicator: '',
//     countries: ['Brazil', 'Japan'],
//     data: {
//       labels: Array(11).fill(2005).map((y, i) => String(y + i)),
//       datasets: [],
//     },
//     infoToChart: {}
//   };
//
//   componentDidMount() {
//     axios.get(URL)
//         .then(({data: [, dataArray]}) => {
//           const rawData = _.groupBy(dataArray, (d) => d.country.value);
//           const datasets = [];
//           for (const country in rawData) {
//             rawData[country] = _.sortBy(rawData[country], ['date']);
//             datasets.push({
//               label: country,
//               data: rawData[country].map(c => c.value)
//             });
//           }
//           this.setState({data: {...this.state.data, datasets}});
//         })
//         .catch(console.warn);
//   }
//
//   handleChange = e => {
//     const target = e.target;
//     const value = target.value;
//
//    if (!target.checked) {
//      // remove value from preSelection
//      const toDisplay = this.state.countries.filter(c => c !== value);
//      // update sates to include only 'ticked' items
//      this.setState({ countries: toDisplay });
//
//    } else {
//      // add new county to rest of state save as joined
//      const joined = this.state.countries.concat(value);
//      // update state with new value
//      this.setState({ countries: joined });
//    }
//   }
//
//   handleSubmit = e => {
//     e.preventDefault();
//     const selectedData = this.state.data.datasets.filter(c => this.state.countreis.includes(c.label));
//     setState({ infoToChart: {...this.state.data.labels, [...selectedData]}});
//   }
//
//   render() {
//     return (
//       <div>
//         <div className="displayGraphDiv">
//           <div className="checkBox">
//             <CheckBox countriesLabels={this.state.countries} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
//             <select value={this.state.indicator} onChange={e => this.setState({indicator: e.target.value})}>
//               <option value="AG.LND.AGRI.ZS">Agriculture</option>
//               <option value="NY.GDP.MKTP.CD">GDP</option>
//               <option value="EG.FEC.RNEW.ZS">REC</option>
//             </select>
//           </div>
//           {
//             this.state.infoToChart.length !== 0
//             ?
//             <div className="chartDisplay">
//               <h1>Agricultural Land in % of area</h1>
//               <Chart dataRange={this.state.infoToChart} />
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
