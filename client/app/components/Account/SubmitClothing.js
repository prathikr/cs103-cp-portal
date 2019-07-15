import React, { Component } from 'react';
import { setInStorage } from '../../utils/storage';
import { withRouter } from 'react-router-dom';

class SubmitClothing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      submitError: '',
      submitType: '',
      submitPrice: 0.0,
    };

    this.onTextboxChangeSignInUsername = this.onTextboxChangeSignInUsername.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);

  }

  onTextboxChangeSignInUsername(event) {
    this.setState({
      signInUsername: event.target.value
    });
  }
  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onSignIn() {
    // Grab state
    const { signInUsername, signInPassword } = this.state;
    // Post request to backend
    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInUsername: '',
            signInPassword: '',
            token: JSON.token,
          });
          const { history } = this.props;
          history.push("/account");
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });

  }

  render() {
    const {
      isLoading,
      signInError,
      signInUsername,
      signInPassword,
    } = this.state;
    return (
      <div className="inner-container">
        <div className="header">
          CSCI-103 CP Portal
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="signin-input"
              placeholder="Username"
              value={signInUsername}
              onChange={this.onTextboxChangeSignInUsername} />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="signin-input"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword} />
          </div>

          <button
            type="button"
            className="signin-btn"
            onClick={this.onSignIn}>Login</button>
        </div>
        {
          (signInError) ? (
            <p className="danger-error">{signInError}</p>
          ) : (null)
        }
        {
          (isLoading) ? (
            <p>Loading...</p>
          ) : (null)
        }
      </div>
    );
  }

}

export default withRouter(SignInBox);
