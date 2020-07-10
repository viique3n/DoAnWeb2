import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { renewAccessToken } from '../../Auth/AuthRoute';
import {
  Form,
  Button,
  Col,
  Container,
  Row,
  Card,
  Modal,
} from 'react-bootstrap';
import Example from './example';

class TaoSoTietKiem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      danhsachtaikhoanthanhtoan: [],
      danhsachlaisuat: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  //#region function
  close() {
    this.setState({ showModal: false });
  }

  open() {
    let secret;
    let token;
    axios
      .post('http://localhost:9000/api/totp/totp-secret')
      .then((res) => {
        secret = res.data.secret;
        axios
          .post('http://localhost:9000/api/totp/totp-generate', { secret })
          .then((res) => {
            token = res.data.token;
            console.log(`secret: ${secret}`);
            console.log(`token: ${token}`);
          })
          .catch((err) => {
            return;
          });
      })
      .catch((err) => {
        return;
      });
    debugger;
    this.setState({ showModal: true });
  }
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
    debugger;
  }

  componentDidMount() {
    this.getDanhSachTaiKhoanThanhToan();
    this.getDanhSachLaiSuat();
  }

  render() {
    const test = this.state;
    return (
      <Container>
        <br />
        <Row>
          <Col></Col>
          <Col>
            <Form>
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
                    <Button onClick={this.open}>Xác nhận</Button>
                  </Form.Group>
                </Card.Body>
                <Modal
                  size="sm"
                  show={this.state.showModal}
                  onHide={this.close}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Xác thực OTP</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Label>Nhập mã OTP</Form.Label>
                    <Form.Text>
                      Mã OTP đã được gửi tới Email của quý khách, vui lòng xác
                      nhận
                    </Form.Text>
                    <Form.Control type="text" name="otp"></Form.Control>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    <Button onClick={this.close}>Xác nhận</Button>
                  </Modal.Footer>
                </Modal>
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
