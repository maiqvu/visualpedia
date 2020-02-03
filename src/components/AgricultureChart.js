import React from 'react'
import {Line} from 'react-chartjs-2';
import _ from 'lodash/collection';
import randomColor from 'randomcolor';

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

class AgricultureChart extends React.Component {
  state = {
    data: {
      labels: ['2006', '2007', '2008', '2009', '2010', "2011", '2012', '2013', '2014', '2015'],
      datasets: []
    }
  }

  updateDataSets(resultsToSort) {
    const datasets = [];
    // get each county name to loop through and sort with lodash
    for (const country in resultsToSort) {
      // sort counrties by order of dates
      let countries = _.sortBy(resultsToSort[country], ['date'])
      // push new
      datasets.push({
        // side datasets chart js need label and data
        label: country,
        // map through data give the value and spread the chartStyle
        data: countries.map(v => v.value.toFixed(2)), ...chartStyle(),
      });// push
    } // for
    // state of data is being changed therefore inner data can replace*
    this.setState({data: {...this.state.data, datasets}});
  }

  componentDidMount(){

    this.updateDataSets(this.props.dataRange)

  }

  render(){

    return(
      <div className="AgricultureChart">
        <Line data={this.state.data}/>
      </div>
    ) // return
  } //render
} // AgricultureChart

export default AgricultureChart
