import React, { Component } from 'react';
import './App.css';
import Chart from './Chart';

class App extends Component {

  constructor() {
    super();

    this.state = {
      stock: 'MSFT'
    }
  }

  getStock(stock) {

    this.setState({
      stock: stock
    });

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <button onClick={ () => { this.getStock('AAPL') } }>change stock</button>
          <Chart stock={ this.state.stock } endpoint="https://www.alphavantage.co/query"/>
        </header>
      </div>
    );
  }
}

export default App;
