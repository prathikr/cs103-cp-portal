import React from 'react';
import { withRouter } from 'react-router-dom';


class SignUpBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      signUpError: '',
      signUpUsername: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpGender: '',
      signUpZip: ''
    };

    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(this);
    this.onTextboxChangeSignUpGender = this.onTextboxChangeSignUpGender.bind(this);
    this.onTextboxChangeSignUpZip = this.onTextboxChangeSignUpZip.bind(this);

    this.onSignUp = this.onSignUp.bind(this);
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }
  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }
  onTextboxChangeSignUpUsername(event) {
    this.setState({
      signUpUsername: event.target.value
    });
  }
  onTextboxChangeSignUpGender(event) {
    this.setState({
      signUpGender: event.target.value
    });
  }
  onTextboxChangeSignUpZip(event) {
    this.setState({
      signUpZip: event.target.value
    });
  }

  onSignUp() {
    // Grab state
    const { signUpUsername, signUpEmail, signUpPassword, signUpZip, signUpGender } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
        gender: signUpGender,
        zip: signUpZip
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.props.history.push("/account");
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const {
      isLoading,
      signUpError,
      signUpEmail,
      signUpUsername,
      signUpPassword,
      signUpGender,
      signUpZip
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
              value={signUpUsername}
              onChange={this.onTextboxChangeSignUpUsername} />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text"
              name="email"
              className="signin-input"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail} />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="signin-input"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword} />
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              name="gender"
              className="signin-input"
              placeholder="Gender"
              value={signUpGender}
              onChange={this.onTextboxChangeSignUpGender} />
          </div>
          <div className="input-group">
            <label htmlFor="zip">ZIP Code</label>
            <input
              type="text"
              name="zip"
              className="signin-input"
              placeholder="ZIP Code"
              value={signUpZip}
              onChange={this.onTextboxChangeSignUpZip} />
          </div>
          <button
            type="button"
            className="signin-btn"
            onClick={this.onSignUp}>Register</button>
        </div>
        {
          (signUpError) ? (
            <p className="danger-error">{signUpError}</p>
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

export default withRouter(SignUpBox);
