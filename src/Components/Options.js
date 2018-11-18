import React, { Component } from "react";

class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options
    };
  }

  render() {
    const options = this.state.options.map(option => (
      <div key={option}>
        <button className="button" onClick={this.props.selectOption}>
          {option}
        </button>
      </div>
    ));

    return <div className="options__holder">{options}</div>;
  }
}

export default Options;
