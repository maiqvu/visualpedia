import React from 'react'
import {Bar, Line, Radar, HorizontalBar, Polar, Bubble, Pie, Doughnut} from 'react-chartjs-2';
import _ from 'lodash/collection';
import randomColor from 'randomcolor';


const chartStyle = () => ({

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
    legendPosition: 'right',
  }

  updateDataSets(resultsToSort) {
    const datasets = [];

    // get each county name to loop through and sort with lodash
    let counter = 0;
    for (const country in resultsToSort) {
      // sort counrties by order of dates
      let countries = _.sortBy(resultsToSort[country], ['date'])
      // push new
      // console.log('new counter', counter);
      datasets.push({
        // side datasets chart js need label and data
        label: country,
        // map through data give the value and spread the chartStyle
        data: countries.map(v => v.value),

        //backgroundColor: colorWheel[counter]
         // ...chartStyle(),
      });// push
    } // for
    // state of data is being changed therefore inner data can replace*
    this.setState({data: {datasets: datasets} } );
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
          scales: {
            yAxes: [{
              stacked: true,
              ticks: {
                fontColor: 'white'
              }
            }],
            xAxes: [{
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
          scales: {
            yAxes: [{
              ticks: {
                fontColor: 'white'
              }
            }],
            xAxes: [{
              ticks: {
                fontColor: 'white'
              }
            }]
          }
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
    const gradientFill = ctx.createLinearGradient(0, 0, 400,0);
    const gradientStroke = ctx.createLinearGradient(0, 0, 400, 0);
    gradientStroke.addColorStop(0, color);
    gradientStroke.addColorStop(0.95, colorStop);
    gradientFill.addColorStop(0, color);
    gradientFill.addColorStop(0.95, colorStop);
    return [gradientFill, gradientStroke];
  }

  getChartData = canvas => {
    const data = this.state.data;
    const transparency = this.props.chart === 'radar' ? 0.4 : 1;
    if (data.datasets) {
      const colors = [`rgba(255, 159, 192, ${transparency})`,
                          `rgba(114, 222, 255, ${transparency})`,
                          `rgba(255, 246, 146, ${transparency})`,
                          `rgba(135, 242, 252, ${transparency})`,
                          `rgba(213, 152, 255, ${transparency})`
      ];
      const colorStops = [`rgba(255, 99, 132, ${transparency})`,
                          `rgba(54, 162, 235, ${transparency})`,
                          `rgba(255, 206, 86, ${transparency})`,
                          `rgba(75, 192, 192, ${transparency})`,
                          `rgba(153, 102, 255, ${transparency})`
      ];
      data.datasets.forEach((set, i) => {
        const colorFill = this.setGradientColor(canvas, colors[i], colorStops[i])[0];
        const colorStroke = this.setGradientColor(canvas, colors[i], colorStops[i])[1];
        set.backgroundColor = colorFill;
        set.borderColor = colorStroke;
        set.borderColor = colorStroke;
        set.pointBorderColor = colorStroke;
        set.pointBackgroundColor = colorStroke;
        set.pointHoverBackgroundColor = colorStroke;
        set.pointHoverBorderColor = colorStroke;
      });
    }

    return data;
  }

  render(){
    const components = {
        bar: Bar,
        line: Line,
        horizontal: HorizontalBar,
        radar: Radar,
        // polar: Polar,
        // bubble: Bubble,
        // pie: Pie,
        // doughnut: Doughnut
      };

    const generalGlobalOptions = {
      maintainAspectRatio: true,
      title: {
        display: true,
        text: this.props.title,
        fontColor: 'white',
        fontSize: 25
      },
      legend: {
        display: this.props.displayLegend,
        position: this.props.legendPosition,
        labels: {
          display: true,
          fontColor: 'white',
          fontSize: 18
        }
      },
      animation: {
            easing: "easeInQuad",
          duration: 600
      },
      layout: {
            padding: {
                left: 50,
                right: 50,
                top: 0,
                bottom: 0
            }
        }
    };


    const ChartTag = components[this.props.chart];

    return(
      <div className="Chart">
        <ChartTag data={this.getChartData} options={{...generalGlobalOptions,  ...this.getOptionsForChart(this.props.chart)}}/>
      </div>
    ) // return
  } //render
} // AgricultureChart

export default Chart
