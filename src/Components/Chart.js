import React, { Component } from "react";
import axios from "axios";

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataPoints: []
    };

    this.renderCanvas = this.renderCanvas.bind(this);
  }

  componentDidMount() {
    this.renderCanvas(this.props.stock);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.stock !== nextProps.stock) {
      this.renderCanvas(nextProps.stock);
    }
  }

  renderCanvas(stock) {
    let stockName = stock,
      endPoint = `/apis/stock${stockName}.json`;

    axios
      .get(endPoint)
      .then(function(response) {
        let data = response.data,
          addInfo = data["Time Series (Daily)"];

        let keysArray = Object.keys(addInfo),
          latestDataPoints = [];

        // get first 50
        keysArray.forEach(function(each, idx) {
          if (idx < 40) {
            let dataPointObj = {
              date: each,
              data: addInfo[each]
            };

            latestDataPoints.push(dataPointObj);
          }
        });

        let allHighs = [],
          allLows = [];

        let canvas = document.getElementById("chart"),
          grid = document.getElementById("grid"),
          width = canvas.width,
          height = canvas.height,
          ctx = canvas.getContext("2d"),
          gridCtx = grid.getContext("2d"),
          xStart = (width - 40) / latestDataPoints.length,
          xInterval = xStart,
          xStartAdjusted = xStart + 30;

        ctx.clearRect(0, 0, width, height);

        latestDataPoints.forEach(function(point, index) {
          let high = point.data["2. high"],
            low = point.data["3. low"];

          // get array of all Highs
          allHighs.push(high);
          // get array of all Lows
          allLows.push(low);
        });

        let highest = Math.max(...allHighs),
          lowest = Math.min(...allLows);

        // round up/down respectively
        // highest = Math.ceil(highest);
        highest = Math.ceil(highest / 10) * 10;
        lowest = Math.floor(lowest / 10) * 10;

        let range = highest - lowest,
          oneUnitLength = height / range,
          yValueLabel = highest, // start with highest and work our way downwards with interval of 10
          yValueLabelXPos = 0,
          yValueLabelYPos = 15;

        let x = 0;

        ctx.font = "12px Arial";

        while (x <= range) {
          ctx.fillText(`$${yValueLabel}`, yValueLabelXPos, yValueLabelYPos);

          yValueLabel -= 10;
          x += 10;
          yValueLabelYPos += 10 * oneUnitLength;
        }

        latestDataPoints.forEach(function(point, index) {
          let high = parseInt(point.data["2. high"]),
            low = parseInt(point.data["3. low"]),
            open = parseInt(point.data["1. open"]),
            close = parseInt(point.data["4. close"]),
            isBullish = true,
            red = "#FF0038",
            green = "#00C04A";

          // draw columns
          gridCtx.beginPath();
          gridCtx.moveTo(xStartAdjusted, 0);
          gridCtx.lineTo(xStartAdjusted, height);
          gridCtx.lineWidth = 0.1;
          gridCtx.closePath();
          gridCtx.stroke();
          gridCtx.strokeStyle = "rgba(0,0,0,.5)";

          if (close > open) {
            isBullish = false; // bearish
          }

          // set color depending on bearish or bullish
          if (isBullish) {
            ctx.strokeStyle = green;
          } else {
            ctx.strokeStyle = red;
          }

          // draw line from high to low
          let yStart = highest - high;
          yStart *= oneUnitLength; // truncate to actual position

          let realLength = high - low, // get actual length of datapoint
            displayLength = realLength * oneUnitLength, // length of datapoint when truncated to chart
            yEnd = yStart + displayLength;

          ctx.beginPath();
          ctx.moveTo(xStartAdjusted, yStart);
          ctx.lineTo(xStartAdjusted, yEnd);
          ctx.lineWidth = 2.5;
          ctx.closePath();
          ctx.stroke();

          // draw open branch
          let yToMoveOpenBranch = high - open;
          yToMoveOpenBranch *= oneUnitLength;

          let yOpenPos = yStart + yToMoveOpenBranch;

          ctx.beginPath();
          ctx.moveTo(xStartAdjusted, yOpenPos);
          ctx.lineTo(xStartAdjusted - 5, yOpenPos);
          ctx.closePath();
          ctx.stroke();

          // draw close branch
          let yToMoveCloseBranch = high - close;
          yToMoveCloseBranch *= oneUnitLength;

          let yClosePos = yStart + yToMoveCloseBranch;

          ctx.beginPath();
          ctx.moveTo(xStartAdjusted, yClosePos);
          ctx.lineTo(xStartAdjusted + 5, yClosePos);
          ctx.closePath();
          ctx.stroke();

          xStartAdjusted += xInterval;
        });

        // for displaying numbers on page
        canvas.addEventListener("mousemove", function(e) {
          var data = ctx.getImageData(0, 0, width, height).data;

          var idx = (e.offsetY * width + e.offsetX) * 4;

          var parts = Array.prototype.slice.call(data, idx, idx + 4);

          if (parts[2] === 56) {
            // display
          } else if (parts[3] === 74) {
            // display
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="chart">
        <div className="chart__holder">
          <canvas className="chart__chart" id="chart" width="1100" height="400">
            Your browser does not support canvas. Please find a suitable
            browser.
          </canvas>
          <canvas className="chart__chart" id="grid" width="1100" height="400">
            Your browser does not support canvas. Please find a suitable
            browser.
          </canvas>
        </div>
      </div>
    );
  }
}

export default Chart;
