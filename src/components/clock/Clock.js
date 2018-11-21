import React, { Component } from 'react';
import './Clock.css'

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    const currentDate = this.state.date;
    const beforeHalfMinute = currentDate.getSeconds() < 30;
    const resolvedClassName = beforeHalfMinute ? "before-half-minute" : "after-half-minute";
    return (
      <div>
        <h2>Current time is => 
          <span className={resolvedClassName}>
            {currentDate.toLocaleTimeString()
          }</span>
        </h2>
      </div>
    );
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
}

export default Clock;
