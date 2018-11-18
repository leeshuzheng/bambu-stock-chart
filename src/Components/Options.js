import React, { Component } from "react";

class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options,
      selectedStock: this.props.selected
    };
  }

  render() {
    const options = this.state.options.map(option => {
      let className =
        option === this.state.selectedStock ? "button active" : "button";

      return (
        <div key={option}>
          <button
            id={option}
            className={className}
            onClick={this.props.selectOption} >
            {option}
          </button>
        </div>
      );
    });

    return <div className="options__holder">{options}</div>;
  }
}

export default Options;
