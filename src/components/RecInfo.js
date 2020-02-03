import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import ChartREC from './ChartREC';

// Renewable Energy Consumption
class RecInfo extends Component {

  state = {
    chartData: {},
    countries: [],
    chartType: 'bar'
  };



  // componentWillMount() {
  //   this.getRecData('br;sur;jpn;arg;deu', 'EG.FEC.RNEW.ZS', '2005:2015');
  // }

  countUp(start, end) {
    let dateStart = parseInt(start);
    const dateEnd = parseInt(end);
    let arr = [];
    while(dateStart <= dateEnd) {
      arr.push(dateStart);
      dateStart++;
    }
    return arr;
  }

  countryData(allData) {
    //console.log(allData);
    const structuredData = allData.map((data, i) => {
      return {value: data.value, country: data.country.value}
    });
    //console.log(structuredData);
    return _.groupBy(structuredData, obj => obj.country);
  }

  setChartOptions(i) {
    const colors = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];
    return colors[i];
  }

  getRecData(countries, topic, date) {
    const URL = `https://api.worldbank.org/v2/country/${countries}/indicator/${topic}?date=${date}&format=json`;

    axios.get(URL)
    .then(res => {
      const labels = this.countUp(date.split(':')[0], date.split(':')[1]);
      const data = this.countryData(res.data[1]);
      const datalabels = Object.keys(data);
      let datasets = [];
      let counter = 0;
      for (let i in data) {
        console.log(i);
        datasets.push({
          label: i,
          data: data[i].map(i => i.value),
        });
      }

      for (let i = 0; i < datasets.length; i++) {
        datasets[i]['backgroundColor'] = this.setChartOptions(i);
      }


      this.setState({
        chartData: {
          labels: labels,
          datasets: datasets
        }
      });
    })
    .catch(res => console.warn(res));
  }

  handleInput = e => {

    if (e.target.checked) {
      this.setState({ countries: [...this.state.countries, e.target.value]});
      //console.log('state', this.state.countries);
    } else {
      console.log('value: ', e.target.value);
      const index = this.state.countries.indexOf(e.target.value);
      let newCountries = this.state.countries;
      newCountries.splice(index, 1);
       this.setState({
         countries: newCountries
       });
    }
    console.log('state of countries:', this.state.countries);
  }

  handleChange = e => {
    this.setState({
      chartType: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const countries = this.state.countries.join(';');
    console.log(countries);
    this.getRecData(countries, 'EG.FEC.RNEW.ZS', '2005:2015');

  }

  render() {
    return (
      <div>
        <h3>Renewable Energy Consumption</h3>
        <form onSubmit={this.handleSubmit} >
          <div>
            <input id="deu" type="checkbox" name="countries" value="deu" onChange={this.handleInput} />
            <label htmlFor="deu">Germany</label>
          </div>
          <div>
            <input id="arg" type="checkbox" name="countries" value="arg" onChange={this.handleInput} />
            <label htmlFor="arg">Argentina</label>
          </div>
          <div>
            <input id="jpn" type="checkbox" name="countries" value="jpn" onChange={this.handleInput} />
            <label htmlFor="jpn">Japan</label>
          </div>
          <div>
            <input id="br" type="checkbox" name="countries" value="br" onChange={this.handleInput} />
            <label htmlFor="br">Brazil</label>
          </div>
          <div>
            <input id="sur" type="checkbox" name="countries" value="sur" onChange={this.handleInput} />
            <label htmlFor="sur">Suriname</label>
          </div>
          <div>
            <select value={this.state.chartType} onChange={this.handleChange}>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="pie">Pie</option>
            </select>
          </div>
          <input type="submit" value="Update Chart"/>
        </form>
        <ChartREC chart={this.state.chartType} chartData={this.state.chartData} unit="%" />
      </div>

    );
  }
}

export default RecInfo
