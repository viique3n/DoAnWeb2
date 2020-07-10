import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { renewAccessToken } from '../../Auth/AuthRoute';
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';

class TaoSoTietKiem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danhsachtaikhoanthanhtoan: [],
      danhsachlaisuat: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //#region function
  renewAcess() {
    let token = sessionStorage.getItem('refreshToken');
    const isValidToken = renewAccessToken(token);
    if (isValidToken === false) {
      return false;
    }
    return true;
  }
  getDanhSachTaiKhoanThanhToan() {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    let token = sessionStorage.getItem('refreshToken');
    token = sessionStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    const { sodienthoai } = decoded;
    axios('http://localhost:9000/api/taikhoan/getdanhsachtaikhoanthanhtoan', {
      params: { khachhangSodienthoai: sodienthoai },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          danhsachtaikhoanthanhtoan: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getDanhSachLaiSuat() {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    axios('http://localhost:9000/api/laisuat/getdanhsachlaisuat')
      .then((res) => {
        console.log(res.data);
        this.setState({
          danhsachlaisuat: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //#endregion

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    this.getDanhSachTaiKhoanThanhToan();
    this.getDanhSachLaiSuat();
  }

  render() {
    const test = this.state;
    debugger;
    return (
      <Container>
        <br />
        <Row>
          <Col></Col>
          <Col>
            <Form onSubmit={this.handleSubmit1}>
              <Card border="info">
                <Card.Header>Tài khoản nguồn</Card.Header>
                <Card.Body>
                  <Form.Group>
                    <Card.Title>Chọn tài khoản gốc</Card.Title>
                    <Form.Control
                      as="select"
                      name="mataikhoanchuyenkhoan"
                      onChange={this.handleSelectMaTaiKhoanChuyenKhoan}
                    >
                      <option value="DEFAULT">Chọn tài khoản</option>
                      {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                        <option value={taikhoan.mataikhoan}>
                          {taikhoan.mataikhoan} - Số dư: {taikhoan.sodu}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Card.Body>
              </Card>
              <br />

              <Card border="info">
                <Card.Header>Thông tin giao dịch</Card.Header>
                <Card.Body>
                  <Form.Group>
                    <Form.Label>Kỳ hạn</Form.Label>
                    <Form.Control
                      as="select"
                      name="kyhan"
                      onChange={this.handleSelectKyHan}
                    >
                      <option value="DEFAULT">Chọn kỳ hạn - Lãi suất</option>
                      {this.state.danhsachlaisuat.map((laisuat) => (
                        <option value={laisuat.kyhan}>
                          {laisuat.kyhan} - Lãi suất: {laisuat.laisuat}%
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Số tiền gửi</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Hình thức trả lãi</Form.Label>
                    <Form.Control
                      as="select"
                      name="hinhthuctralai"
                      onChange={this.handleSelectHinhThucTraLai}
                    >
                      <option value="DEFAULT">Chọn hình thức trả lãi</option>
                      <option value="1thang">Lãi nhập gốc</option>
                      <option value="2">
                        Lãi trả vào tải khoản tiết kiệm khi đến hạn
                      </option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Hình thức nhận mã OTP</Form.Label>
                    <Form.Control
                      as="select"
                      name="hinhthucnhanmaotp"
                      onChange={this.handleSelectHinhThucOTP}
                    >
                      <option value="DEFAULT">Email</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Button>Xác nhận</Button>
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* <Button variant="primary" type="submit">
                Xác nhận
              </Button>
              <p>{this.state.trangthaichuyenkhoan}</p> */}
            </Form>
          </Col>
          <Col></Col>
        </Row>
        <br />
        <br />
      </Container>
    );
  }
}
export default TaoSoTietKiem;
