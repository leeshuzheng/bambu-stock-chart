import React, { Component } from 'react';
import axios from 'axios';


class Chart extends Component {

  constructor(prop) {
    super();

    this.state = {
      stock: prop.stock,
      endpoint: prop.endpoint
    }

  }

  getStockAPI() {

    console.log('this is called');

    let stockName = this.state.stock,
    endPoint = this.state.endpoint;

    axios.get(endPoint, {
      params: {
        symbol: stockName,
        function: 'TIME_SERIES_DAILY',
        interval: '60min',
        apikey: 'JCTFCHSSCP0MKMZ6'
      }
    })
    .then(function (response) {

      let data = response.data,
      metaData = data["Meta Data"],
      addInfo = data["Time Series (Daily)"];

      console.log(data);

      let keysArray = Object.keys(addInfo),
      idx = 0,
      latestDataPoints = [];

      // get first 15
      keysArray.forEach(function(each, idx) {

        if (idx < 15) {

          let dataPointObj = {
            date: each,
            data: addInfo[each]
          };

          latestDataPoints.push(dataPointObj);
        }

      });

      latestDataPoints.forEach(function(dataPoint, i) {
        console.log(dataPoint);
      })

    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }

  componentDidMount(prop) {
    this.getStockAPI();
  }

  // componentDidUpdate(prop) {
  //
  //   this.getStockAPI();
  //
  // }

  render() {
    return (
      <div className="chart">
      <h1>{this.state.endpoint}</h1>
      </div>
    );
  }
}

export default Chart;
