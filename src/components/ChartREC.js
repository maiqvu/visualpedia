import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class ChartREC extends Component {

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'bottom',
    location: 'City'
  }

  render() {
    const components = {
      bar: Bar,
      line: Line,
      pie: Pie
    };

    const ChartTag = components[this.props.chart];

    return (
      <div className="chart">
      <ChartTag data={this.props.chartData} options={{
        title: {
          display: this.props.displayTitle,
          text: 'Renewable Energy Consumption in ' + this.props.unit,
          fontSize: 25
        },
        legend: {
          display: this.props.displayLegend,
          position: this.props.legendPosition
          }
        }}
      />
      </div>
    );
  }
}

export default ChartREC;
