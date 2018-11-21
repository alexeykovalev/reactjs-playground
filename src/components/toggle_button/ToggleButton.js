import React, { Component } from 'react';

class ToggleButton extends Component {

  constructor(props) {
    super(props);
    this.state = { isActive: this.props.isActive }
    // this.toggle = this.toggle.bind(this);
  }
  
  render() {
    const title = this.state.isActive ? 'On' : 'Off';
    return (
      <button onClick={this.toggle}>{title}</button>
    );
  }

  toggle = () => {
    this.setState(state => ({
      isActive: !state.isActive
    }));
  }

  // toggle() {
  //   this.setState(state => ({
  //     isActive: !state.isActive
  //   }));
  // }
}

export default ToggleButton;


(function() {
  function Some() {

  }
  console.log(Some.prototype);
})();

