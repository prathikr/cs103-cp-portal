import React, { Component } from 'react';
import { BrowserRouter, Route, } from 'react-router-dom'
import 'whatwg-fetch';
import { withRouter } from 'react-router-dom';

import { getFromStorage } from '../../utils/storage';

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      token: '',
      logoutError: '',
    };

    this.logout = this.logout.bind(this);

  }

  // require a valid token for user to access account page
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
          } else {
            this.setState({
              isLoading: false,
            });
            this.props.history.push("/");
          }
        });
    } else {
      this.props.history.push("/");
      this.setState({
        isLoading: false,
      });
    }
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              logoutError: json.message,
              token: '',
              isLoading: false,
            });
            this.props.history.push("/");
          } else {
            this.setState({
              logoutError: json.message,
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

  render() {
    const {
      isLoading,
      logoutError,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }
    return (
      <div>
        <p>Account</p>
        <button
          type="button"
          className="signin-btn"
          onClick={this.logout}>Logout</button>
        {
          (logoutError) ? (
            <p className="danger-error">{logoutError}</p>
          ) : (null)
        }
      </div>
    );
  }
}
export default withRouter(Account);
