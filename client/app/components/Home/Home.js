import React, { Component } from 'react';
import { BrowserRouter, Route, } from 'react-router-dom'
import 'whatwg-fetch';
import '../../styles/home'
import SignInBox from './SignIn'
import SignUpBox from './SignUp'

import { getFromStorage } from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      token: '',
      isSignInOpen: true,
      isSignUpOpen: false,
    };

    this.showSignIn = this.showSignIn.bind(this);
    this.showSignUp = this.showSignUp.bind(this);

  }

  // go straight to account page if valid token already cached
  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false,
            });
            this.props.history.push("/account");
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  showSignIn() {
    this.setState({ isSignInOpen: true, isSignUpOpen: false });
  }

  showSignUp() {
    this.setState({ isSignUpOpen: true, isSignInOpen: false });
  }

  render() {
    const {
      isLoading,
      token,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }
    if (!token) {
      return (
        <div className="root-container">
          <div className="box-controller">
            <div
              className={"controller " + (this.state.isSignInOpen
                ? "selected-controller"
                : "")}
              onClick={this
                .showSignIn
                .bind(this)}>
              Login
       </div>
            <div
              className={"controller " + (this.state.isSignUpOpen
                ? "selected-controller"
                : "")}
              onClick={this
                .showSignUp
                .bind(this)}>
              Register
       </div>
          </div>
          <div className="box-container">
            {this.state.isSignInOpen && <SignInBox />}
            {this.state.isSignUpOpen && <SignUpBox />}
          </div>
        </div >
      );
    }
    return (<div></div>);
  }
}

export default Home;
