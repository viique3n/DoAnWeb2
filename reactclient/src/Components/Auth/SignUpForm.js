import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

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
    const signupURL = 'https://ibnodeserver.herokuapp.com/' + 'api/auth/signup';
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
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <br />
            <br />
            <Form onSubmit={this.handleSubmit}>
              <h3>Đăng ký tài khoản</h3>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={this.props.handleChange}
                />
                <div>{this.props.errors.email}</div>
              </Form.Group>
              <Form.Group controlId="formBasicSoDienThoai">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Số điện thoại"
                  name="sodienthoai"
                  onChange={this.props.handleChange}
                />
                <div>{this.props.errors.sodienthoai}</div>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="matkhau"
                  onChange={this.props.handleChange}
                />
                <div>{this.props.errors.matkhau}</div>
              </Form.Group>
              <Form.Group controlId="formBasicTenHienThi">
                <Form.Label>Tên hiển thị</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tên hiển thị"
                  name="tenhienthi"
                  onChange={this.props.handleChange}
                />
                <div>{this.props.errors.tenhienthi}</div>
              </Form.Group>
              <Button variant="primary" type="submit">
                Đăng ký
              </Button>
              <div>{this.state.signUpError}</div>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default SignupForm;
