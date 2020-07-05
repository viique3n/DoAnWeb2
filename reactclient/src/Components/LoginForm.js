import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './css/login.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log(this.props);
    e.preventDefault();
    const { sodienthoai, matkhau } = this.props.values;
    const user = { sodienthoai, matkhau };
    const loginURL = 'http://localhost:9000/' + 'api/auth/login';
    debugger;
    axios
      .post(loginURL, user)
      .then((res) => {
        sessionStorage.setItem('jwtToken', res.data.token);
        sessionStorage.setItem('refreshToken', res.data.refreshToken);
        this.setState({ isAuthenticated: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <div className="w3-container" style={{ width: '30%' }}>
        <form className="loginform" onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <label for="sodienthoai">
            <b>Số điện thoại</b>
          </label>
          <input
            type="text"
            name="sodienthoai"
            required
            onChange={this.props.handleChange}
          ></input>
          <div>{this.props.errors.sodienthoai}</div>
          <br></br>
          <label for="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            name="matkhau"
            required
            onChange={this.props.handleChange}
          ></input>
          <div>{this.props.errors.matkhau}</div>

          <br></br>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
export default LoginForm;
