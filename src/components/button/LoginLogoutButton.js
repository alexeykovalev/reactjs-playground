import React, { Component } from 'react';
import './LoginLogoutButton.css'


function GuestGreeting(props) {
  return <p className="label">We are glad to see you here. Please sign up.</p>;
}

function UserGreeting(props) {
  return <p className="label">Welcome back</p>;
}

function Greeting(props) {
  const isLoggedIn = Boolean(props.isLoggedIn);
  console.log(`isLogged ${isLoggedIn}`);
  if (isLoggedIn === true) {
    console.log(`User greeting is called`);
    return <UserGreeting />
  } else {
    console.log(`Guest greeting is called`);
    return <GuestGreeting />
  }
}

function LoginButton(props) {
  return (
    <button className="button" onClick={props.onClick}>Login</button>
  );
}

function LogoutButton(props) {
  return (
    <button className="button" onClick={props.onClick}>Logout</button>
  ); 
}

class LoginSignUpButton extends Component {

  constructor(props) {
    super(props);
    this.handleClickOnLogin = this.handleClickOnLogin.bind(this);  
    this.handleClickOnLogout = this.handleClickOnLogout.bind(this);  
    this.state = { isLoggedIn: false }
  }
  
  handleClickOnLogin() {
    this.setState({ isLoggedIn: true });
  }

  handleClickOnLogout() {
    this.setState({ isLoggedIn: false });
  }
  
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        { isLoggedIn ? 
            (<LogoutButton onClick={this.handleClickOnLogout} /> ) : 
            (<LoginButton onClick={this.handleClickOnLogin} /> )
        }
      </div>
    );
  }
}

export default LoginSignUpButton;
