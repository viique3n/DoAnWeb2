import React, { Component } from 'react';
import { Form, Card, Col, Row, Button, Modal } from 'react-bootstrap';

class ChuyenKhoanLienNganHang extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <img src='http://localhost:9000/images/BingW06.jpg'></img>
          </Col>
          <Form>
            <br />
            <Card>Chuyển khoản liên ngân hàng ...</Card>
          </Form>
          <Col></Col>
        </Row>
      </div>
    );
  }
}
export default ChuyenKhoanLienNganHang;
