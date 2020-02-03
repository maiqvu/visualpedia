import React from 'react';
import axios from 'axios';
import _ from 'lodash/collection';
import { Line } from 'react-chartjs-2';
import randomColor from 'randomcolor';


const INDICATOR = 'NY.GDP.TOTL.RT.ZS';
const COUNTRIES = 'ar;br;de;jpn;sr';
const TIME_RANGE = '2006:2015';
const BASE_URL = 'http://api.worldbank.org/v2';
const URL = `${ BASE_URL }/country/${ COUNTRIES }/indicator/${ INDICATOR }?format=json&date=${ TIME_RANGE }`;

const chartStyle = () => ({
  fill: true,
  lineTension: 0.1,
  backgroundColor: randomColor(),
  borderDash: [],
  pointBorderColor: randomColor(),
  pointBackgroundColor: randomColor(),
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: randomColor(),
  pointHoverBorderColor: randomColor(),
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
});


class TNRRChart extends React.Component {

  state = {
    data: {
      labels: ['2006', '2007', '2008', '2009', '2010', "2011", '2012', '2013', '2014', '2015'],
      datasets: []
    }
  };

  componentDidMount() {
    axios.get( URL )
    .then(({data: [, resArr]}) => {
      const response = _.groupBy(resArr, data => data.country.value);
      const datasets = [];
      for (const country in response) {
        response[country] = _.sortBy( response[country], ['date'] );
        datasets.push({
          label: country,
          data: response[country].map( c => c.value.toFixed(2) ),
          ...chartStyle()
        });
      }
      this.setState({ data: {...this.state.data, datasets} })
    })
    .catch( err => console.warn(err) );
  }   // end of componentDidMount()

  render() {
    return (
      <>
        <h2>Total natural resources rents (as % of GDP)</h2>
        <Line data={ this.state.data } />
      </>
    );
  }   // end of render()

}

export default TNRRChart;