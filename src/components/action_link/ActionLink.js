import React, { Component } from 'react';

class ActionLink extends Component {

  render() {
    const clickHandler = e => {
      e.preventDefault();
      console.log('Go to Novwhere link is clicked');
    };
    return (
      <a href={this.props.link} onClick={clickHandler}>Click here to go Nowhere</a>
    );
  }
}

export default ActionLink;
