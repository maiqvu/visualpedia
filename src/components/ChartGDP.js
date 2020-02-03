import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import _ from 'lodash/collection';
import randomColor from 'randomcolor';

const INDICATOR = `NY.GDP.MKTP.CD`;
const TIME_RANGE = `2006:2015`;
const COUNTRIES = `br;sur;jpn;arg;deu`;
const URL = `http://api.worldbank.org/v2/country/${COUNTRIES}/indicator/${INDICATOR}?date=${TIME_RANGE}&format=json`;

const chartStyle = () => ({
  fill: false,
  lineTension: 0.1,
  backgroundColor: randomColor(),
  borderColor: randomColor(),
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
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

class ChartGdp extends Component {
  state = {
    data: {
      labels: Array(10).fill(2006).map((y, i) => String(y + i)),
      datasets: [],
    },
  };

  componentDidMount() {
    axios.get(URL)
        .then(({data: [, dataArray]}) => {
          const rawData = _.groupBy(dataArray, (d) => d.country.value);
          const datasets = [];
          for (const country in rawData) {
            rawData[country] = _.sortBy(rawData[country], ['date']);
            datasets.push({
              label: country,
              data: rawData[country].map(c => c.value), ...chartStyle(),
            });
          }
          this.setState({data: {...this.state.data, datasets}});
        })
        .catch(console.warn);
  }

  render() {
    return (
        <div>
          <h1>Historical GDP</h1>
          <Line data={this.state.data}/>
        </div>
    );
  }
}

export default ChartGdp;
