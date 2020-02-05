import React from 'react'
import {Bar, Line, Radar, HorizontalBar} from 'react-chartjs-2';
import _ from 'lodash/collection';
import randomColor from 'randomcolor';
let counter
const colorWheel = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
];
const chartStyle = () => ({

});

class Chart extends React.Component {
  state = {
    data: {
      labels: Array(10).fill(2006).map((y, i) => String(y + i)),
      datasets: [],
      options: {
        title: {
          display: true,
          fontColor: 'white'
        },
        legend: {
          display: true,
          labels: {
            fontColor: 'white'
          }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",
                    fontSize: 18,
                    stepSize: 1,
                    beginAtZero: true
                }
          }],
          xAxes: [{
              ticks: {
                  fontColor: "white",
                  fontSize: 14,
                  stepSize: 1,
                  beginAtZero: true
              }
          }]
        }
      }
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',

  }

  updateDataSets(resultsToSort) {
    const datasets = [];

    // get each county name to loop through and sort with lodash
    let counter = 0;
    for (const country in resultsToSort) {
      // sort counrties by order of dates
      let countries = _.sortBy(resultsToSort[country], ['date'])
      // const bg = {backgroundColor: colorWheel[counter]}
      // push new
      console.log('new counter', counter);
      datasets.push({
        // side datasets chart js need label and data
        label: country,
        // map through data give the value and spread the chartStyle
        data: countries.map(v => v.value),

        backgroundColor: colorWheel[counter]
         // ...chartStyle(),
      });// push
      counter++;
    } // for
    // state of data is being changed therefore inner data can replace*
    this.setState({data: {datasets: datasets } } );
    // () => console.log('STATE', this.state) );  // ...this.state.data,
    console.log(datasets);
  }

  componentDidMount(){
    this.updateDataSets(this.props.dataRange);
  };

  componentDidUpdate(prevProps){
    if (prevProps.dataRange !== this.props.dataRange) {
      this.updateDataSets(this.props.dataRange);
    }
  }

  getOptionsForChart = chart => {
    let options = {};
    switch(chart) {
      case 'line':
        options = {
          legend: {
            labels: {
                fontColor: 'white',
                fontSize: 18
            }
        },
          scales: {
            yAxes: [{

              stacked: true,
              ticks: {
                fontColor: 'white'
              }
            }]
        }
        };
        break;

      case 'bar':
      case 'horziontal':
        options = {

        };
        break;
      case 'radar':
        options = {

        };
        break;
    }

    return options;
  }

  setGradientColor = (canvas, color, colorStop) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.95, colorStop);
    return gradient;
  }

  getChartData = canvas => {
    const data = this.state.data;
    if (data.datasets) {
      const colors = ['rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)'
      ];
      const colorStops = ['rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)'
      ];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = this.setGradientColor(canvas, colors[i], colorStops[i]);

      });
    }

    return data;
  }

  render(){
    const components = {
        bar: Bar,
        line: Line,
        horizontal: HorizontalBar,
        radar: Radar
      };

    const generalGlobalOptions = {
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
    }


    const ChartTag = components[this.props.chart];

    return(
      <div className="Chart">
        <ChartTag data={this.getChartData} options={{...generalGlobalOptions, ...this.getOptionsForChart(this.props.chart)}}/>
      </div>
    ) // return
  } //render
} // AgricultureChart

export default Chart
