import React, { Component } from 'react';
import './Boiler.css'

const BoilingVerdict = (props) => {
  if (props.heatingTemperature >= 100) {
    return <p className="boiled">Too hot -> water is boiling...</p>
  }
  return <p className="not-boiled">Not enough heating. Do more to boil water...</p>
};

const TemperatureInput = (props) => {
  return <label> {props.label}
    <input value={props.temperature} onChange={ (event) => props.temperatureChangeHandler(event) } />
  </label>
};

class Boiler extends Component {

  static toCelcius(fahrenheit) {
    return parseInt(fahrenheit) - 10;
  }

  static toFahrenheit(celcius) {
    return parseInt(celcius) + 10;
  }

  static tryToConvert(temperature, converter) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const converted = converter(input);
    const rounded = Math.round(converted * 100) / 100;
    
    return rounded.toString();
  }

  constructor(props) {
    super(props);
    this.state = { 
      temperature: props.initialTemperature
    };
  }
  
  handleCelciusTemperatureChange = (event) => {
    this.setState({
      temperature: event.target.value
    })
  };

  handleFahrenheitTemperatureChange = (event) => {
    this.setState({
      temperature: Boiler.tryToConvert(event.target.value, Boiler.toCelcius)
    });
  };

  render() {
    const temperatureInCelcius = this.state.temperature;
    const temperatureInFrg = Boiler.tryToConvert(temperatureInCelcius, Boiler.toFahrenheit);
    return (
      <fieldset>
        <legend>Temperature boxes:</legend>
        <TemperatureInput label="Tmp in celcius" temperature={temperatureInCelcius} temperatureChangeHandler={this.handleCelciusTemperatureChange} />
        <br />
        <TemperatureInput label="Tmp in farenheit" temperature={temperatureInFrg} temperatureChangeHandler={this.handleFahrenheitTemperatureChange} />
        
        <BoilingVerdict heatingTemperature={temperatureInCelcius} />
      </fieldset>
    );
  }
}

export default Boiler;
