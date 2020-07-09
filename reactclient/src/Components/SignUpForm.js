import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      signUpError: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    debugger;
    e.preventDefault();
    const { sodienthoai, email, matkhau, tenhienthi } = this.props.values;
    const user = { sodienthoai, email, matkhau, tenhienthi };
    const signupURL = 'http://localhost:9000/' + 'api/auth/signup';
    axios
      .post(signupURL, user)
      .then((res) => {
        sessionStorage.setItem('jwtToken', res.data.token);
        sessionStorage.setItem('refreshToken', res.data.refreshToken);
        this.setState({ isAuthenticated: true });
      })
      .catch((err) => {
        debugger;
        this.setState({ signUpError: 'err' });
        console.log(err);
      });
  }
  render() {
    debugger;
    if (this.state.isAuthenticated) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit} style={{ width: '30%' }}>
          <h1>Đăng ký tài khoản</h1>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              name='email'
              onChange={this.props.handleChange}
            />
            <div>{this.props.errors.email}</div>
          </Form.Group>
          <Form.Group controlId='formBasicSoDienThoai'>
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type='text'
              placeholder='Số điện thoại'
              name='sodienthoai'
              onChange={this.props.handleChange}
            />
            <div>{this.props.errors.sodienthoai}</div>
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              name='matkhau'
              onChange={this.props.handleChange}
            />
            <div>{this.props.errors.matkhau}</div>
          </Form.Group>
          <Form.Group controlId='formBasicTenHienThi'>
            <Form.Label>Tên hiển thị</Form.Label>
            <Form.Control
              type='text'
              placeholder='Tên hiển thị'
              name='tenhienthi'
              onChange={this.props.handleChange}
            />
            <div>{this.props.errors.tenhienthi}</div>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Đăng ký
          </Button>
          <div>{this.state.signUpError}</div>
        </Form>
      </div>
      // <div className="w3-container" style={{ width: '30%' }}>
      //   <form className="loginform" onSubmit={this.handleSubmit}>
      //     <h1>Đăng ký tài khoản</h1>
      //     <label for="email">
      //       <b>Email</b>
      //     </label>
      //     <input
      //       type="text"
      //       name="email"
      //       required
      //       onChange={this.props.handleChange}
      //     ></input>
      //     <div>{this.props.errors.email}</div>
      //     <br></br>

      //     <label for="sodienthoai">
      //       <b>Số điện thoại</b>
      //     </label>
      //     <input
      //       type="text"
      //       name="sodienthoai"
      //       required
      //       onChange={this.props.handleChange}
      //     ></input>
      //     <div>{this.props.errors.sodienthoai}</div>
      //     <br></br>

      //     <label for="matkhau">
      //       <b>Mật khẩu</b>
      //     </label>
      //     <input
      //       type="password"
      //       name="matkhau"
      //       required
      //       onChange={this.props.handleChange}
      //     ></input>
      //     <div>{this.props.errors.matkhau}</div>
      //     <br></br>

      //     <label for="tenhienthi">
      //       <b>Tên khách hàng</b>
      //     </label>
      //     <input
      //       type="text"
      //       name="tenhienthi"
      //       required
      //       onChange={this.props.handleChange}
      //     ></input>
      //     <div>{this.props.errors.tenhienthi}</div>
      //     <br></br>

      //     <br></br>
      //     <button type="submit">Đăng ký</button>
      //     <div>{this.state.signUpError}</div>
      //   </form>
      // </div>
    );
  }
}

export default SignupForm;
