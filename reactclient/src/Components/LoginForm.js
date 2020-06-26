import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      matkhau: '',
      isAuthenticated: false,
      validateErrors: {
        emailError: '',
        sodienthoaiError: '',
        matkhauError: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, matkhau } = this.state;
    const user = { email, matkhau };

    axios
      .post('http://localhost:9000/api/auth/login', user)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem('jwtToken', res.data.token);
        const { sodienthoai, email, tenhienthi } = res.data.khachhang;
        const userInfor = { sodienthoai, email, tenhienthi };
        localStorage.setItem('user', JSON.stringify(userInfor));
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
            type="text"
            placeholder="Enter Email"
            name="email"
            required
            onChange={this.handleInputChange}
          ></input>
          <label for="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="matkhau"
            required
            onChange={this.handleInputChange}
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
export default LoginForm;
