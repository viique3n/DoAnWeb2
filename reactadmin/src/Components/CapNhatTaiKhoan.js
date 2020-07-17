import React, { Component } from 'react';
import { Form, Container, Col, Row, Button } from 'react-bootstrap';
import { renewAccessToken } from '../Auth/AuthRoute';
import axios from 'axios';

class CapNhatTaiKhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSearchSubmit = (event) => {};
  handleSearchChange = (event) => {
    const mataikhoan = event.target.value;
    this.setState({ mataikhoan });
  };
  componentDidMount() {
    const token = sessionStorage.getItem('refreshToken');
    const isValidToken = renewAccessToken(token);

    if (isValidToken === false) {
      return;
    }
  }
  render() {
    return (
      <Container>
        <br></br>
        <Form>
          <Row>
            <Col sm={4}>
              <Form.Control
                type="text"
                placeholder="Email, số điện thoại hoặc mã tài khoản"
              ></Form.Control>
            </Col>
            <Button>Tìm kiếm</Button>
          </Row>
        </Form>
      </Container>
    );
  }
}
export default CapNhatTaiKhoan;
