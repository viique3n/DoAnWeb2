import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { sodienthoai, matkhau } = this.props.values;
    const user = { sodienthoai, matkhau };
    // const loginURL = 'https://ibnodeserver.herokuapp.com/' + 'api/auth/login';
    const loginURL = 'https://ibnodeserver.herokuapp.com/' + 'api/auth/login';
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: 'JWT fefege...',
    // };
    debugger;
    axios
      .post(loginURL, user)
      .then((res) => {
        debugger;
        sessionStorage.setItem('jwtToken', res.data.token);
        sessionStorage.setItem('refreshToken', res.data.refreshToken);
        this.setState({ isAuthenticated: true });
      })
      .catch((err) => {
        debugger;
        if (err.response) {
          console.log(err.response.header);
          console.log(err.response.status);
          console.log(err.response.data);
        }
        // console.log(err);
      });
  }

  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <Row>
        <Col>
          <img src='http://localhost:9000/images/BingW06.jpg'></img>
        </Col>
        <Col>
          <br />
          <br />
          <Form onSubmit={this.handleSubmit}>
            <h3>
              <center>
                <b>Đăng nhập</b>
              </center>
            </h3>
            <Form.Group controlId='formBasicSoDienThoai'>
              <Form.Label>
                <b>Số điện thoại</b>
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Ví dụ: 0123456789'
                name='sodienthoai'
                onChange={this.props.handleChange}
              />
              <div>{this.props.errors.sodienthoai}</div>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>
                <b>Password</b>
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='...'
                name='matkhau'
                onChange={this.props.handleChange}
              />
              <div>{this.props.errors.matkhau}</div>
            </Form.Group>

            <Button variant='primary' type='submit'>
              <b>Đăng nhập</b>
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    );
  }
}
export default LoginForm;
