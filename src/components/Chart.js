import React from 'react'
import {Bar, Line, Radar, HorizontalBar} from 'react-chartjs-2';
import _ from 'lodash/collection';
import randomColor from 'randomcolor';

const colorWheel = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
];
const chartStyle = () => ({
  // fill: false,
  // lineTension: 0.1,
  // borderColor: randomColor(),
  //backgroundColor: randomColor(),
  // borderCapStyle: 'butt',
  // borderDash: [],
  // borderDashOffset: 0.0,
  // borderJoinStyle: 'miter',
  // pointBorderColor: randomColor(),
  // pointBackgroundColor: randomColor(),
  // pointBorderWidth: 1,
  // pointHoverRadius: 5,
  // pointHoverBackgroundColor: randomColor(),
  // pointHoverBorderColor: randomColor(),
  // pointHoverBorderWidth: 2,
  // pointRadius: 1,
  // pointHitRadius: 10,
});

class Chart extends React.Component {
  state = {
    data: {
      labels: Array(10).fill(2006).map((y, i) => String(y + i)),
      datasets: []
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right'
  }

  updateDataSets(resultsToSort) {
    const datasets = [];

    // get each county name to loop through and sort with lodash
    let counter = 0;
    for (const country in resultsToSort) {
      // sort counrties by order of dates
      let countries = _.sortBy(resultsToSort[country], ['date'])
      const bg = {backgroundColor: colorWheel[counter]}
      counter++;
      // push new
      datasets.push({
        // side datasets chart js need label and data
        label: country,
        // map through data give the value and spread the chartStyle
        data: countries.map(v => v.value), ...bg // ...chartStyle(),
      });// push
    } // for
    // state of data is being changed therefore inner data can replace*
    this.setState({data: {datasets: datasets}});  // ...this.state.data,

  }

  // componentDidMount(){
  //   this.updateDataSets(this.props.dataRange);
  // };
  //
  // componentDidUpdate(prevProps){
  //   if (prevProps.dataRange !== this.props.dataRange) {
  //     this.updateDataSets(this.props.dataRange);
  //   }
  // }

  addColors = () => {
    const dataWithColors = this.state.data.datasets.map((c, i) => ({...c, backgroundColor: colorWheel[i]}));
    this.setState({
      data: {...this.state.data, datasets: dataWithColors}
    }, () => {
      console.log('data:', this.state.data);
    });
  }

  componentDidMount() {
    this.setState({ data: this.props.dataRange }, () => {
      this.addColors();
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataRange !== this.props.dataRange) {
      this.setState({data: this.props.dataRange}, () => {
        this.addColors();
      });
    }
  }

  render(){
    return(
      <div className="Chart">
        <Bar data={this.state.data} options={{ //this.props.data
        maintainAspectRatio: true,
        title: {
          display: true,
          text: this.props.title,
          fontSize: 25
        },
        legend: {
          display: this.props.displayLegend,
          position: this.props.legendPosition,
          labels: {
            display: true
          }
        }
        }}/>
      </div>
    ) // return
  } //render
} // AgricultureChart

export default Chart
