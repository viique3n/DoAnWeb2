import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
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
    const { email, matkhau } = this.props.values;
    const user = { email, matkhau };
    axios
      .post('http://localhost:9000/api/admin/login', user)
      .then((res) => {
        // console.log(res.data.token);
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
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <br />
            <br />
            <Form onSubmit={this.handleSubmit}>
              <h3>Đăng nhập</h3>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>
                  <b>Email</b>
                </Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  placeholder='Địa chỉ email admin'
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
                Đăng nhập
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      // <div className="w3-container" style={{ width: '30%' }}>
      //   <form className="loginform" onSubmit={this.handleSubmit}>

      //     <h1>Login</h1>
      //     <label>
      //       <b>Email</b>
      //     </label>
      //     <input
      //       type="email"
      //       name="email"
      //       placeholder="Email"
      //       required
      //       onChange={this.props.handleChange}
      //     ></input>
      //     <div>{this.props.errors.email}</div>
      //     <br></br>
      //     <label>
      //       <b>Password</b>
      //     </label>
      //     <input
      //       type="password"
      //       name="matkhau"
      //       placeholder="Password user"
      //       required
      //       onChange={this.props.handleChange}
      //     ></input>
      //     <div>{this.props.errors.matkhau}</div>

      //     <br></br>
      //     <button type="submit">Login</button>
      //   </form>
      // </div>
    );
  }
}
export default LoginForm;
