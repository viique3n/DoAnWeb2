import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
    const { email, matkhau } = this.props.values;
    const user = { email, matkhau };
    axios
      .post('http://localhost:9000/api/admin/login', user)
      .then((res) => {
        console.log(res.data.token);
        sessionStorage.setItem('jwtToken', res.data.token);
        sessionStorage.setItem('refreshToken', res.data.refreshToken);
        // const { email, sodienthoai, tenhienthi } = res.data.nhanvienquanly;
        // const userInfor = { email, sodienthoai, tenhienthi };
        // sessionStorage.setItem('nhanvien', JSON.stringify(userInfor));
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
      <div className="login">
        <form className="loginform" onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <label for="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            name="email"
            required
            onChange={this.props.handleChange}
          ></input>
          <div>{this.props.errors.email}</div>
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
