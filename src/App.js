import React, { Component } from "react";
import "./App.css";
import Chart from "./Components/Chart";
import Options from "./Components/Options";

class App extends Component {
  constructor() {
    super();

    this.state = {
      stock: localStorage.getItem("stockName") || "GOOG",
      options: ["AAPL", "MSFT", "GOOG", "WUBA", "TWTR", "BAYZF", "TSLA"]
    };
  }

  selectOption(event) {
    event.preventDefault();

    let target = event.target,
      selectedStock = target.innerHTML;

    localStorage.setItem("stockName", selectedStock);

    let allButtons = document.querySelectorAll(".button");

    [].forEach.call(allButtons, function(el) {
      el.classList.remove("active");
    });

    target.classList.add("active");

    this.setState({
      stock: selectedStock
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Daily Prices (open, high, low, close) and Volumes</h1>
        </header>

        <div className="App__label">
          <p>{this.state.stock}</p>
        </div>

        <div className="App__main">
          <div className="options">
            <Options
              options={this.state.options}
              selectOption={this.selectOption.bind(this)}
            />
          </div>
          <Chart stock={this.state.stock} />
        </div>

        <footer>
          <p>Placeholder footer</p>
        </footer>
      </div>
    );
  }
}

export default App;
