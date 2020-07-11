import React, { Component } from 'react';
import {
  Form,
  Button,
  Container,
  Col,
  Row,
  Card,
  Modal,
} from 'react-bootstrap';
import axios from 'axios';
import { renewAccessToken } from '../../Auth/AuthRoute';
import jwt_decode from 'jwt-decode';

class ChuyenKhoanCungKhachHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mataikhoanthuhuong: '',
      sotienchuyenkhoan: '',
      noidung: '',
      loaichuyenkhoanId: 1,
      danhsachtaikhoanthanhtoan: [],
      trangthaichuyenkhoan: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectMaTaiKhoanChuyenKhoan = this.handleSelectMaTaiKhoanChuyenKhoan.bind(
      this
    );
    this.handleSelectMaTaiKhoanThuHuong = this.handleSelectMaTaiKhoanThuHuong.bind(
      this
    );
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
    debugger;
    let token = sessionStorage.getItem('refreshToken');
    token = sessionStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    const { sodienthoai } = decoded;
    axios('http://localhost:9000/api/taikhoan/getdanhsachtaikhoanthanhtoan', {
      params: { khachhangSodienthoai: sodienthoai },
    })
      .then((res) => {
        console.log(res.data);
        debugger;
        this.setState({
          danhsachtaikhoanthanhtoan: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //#endregion

  //#region EventHandler
  handleSubmit(event) {
    debugger;
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    event.preventDefault();
    const {
      mataikhoanchuyenkhoan,
      mataikhoanthuhuong,
      loaichuyenkhoanId,
    } = this.state;
    const { sotienchuyenkhoan, noidung } = this.props.values;
    debugger;

    if (sotienchuyenkhoan == '') {
      return;
    }
    axios
      .post('http://localhost:9000/api/chuyenkhoan/chuyenkhoan', {
        mataikhoanchuyenkhoan,
        mataikhoanthuhuong,
        sotienchuyenkhoan,
        noidung,
        thoigian: new Date(),
        loaichuyenkhoanId,
      })
      .then((res) => {
        if (res.data.thanhcong) {
          this.setState({
            trangthaichuyenkhoan: 'Chuyển khoản thành công',
          });

          this.getDanhSachTaiKhoanThanhToan();
        }
      })
      .catch((err) => {
        this.setState({
          trangthaichuyenkhoan: 'Chuyển khoản thất bại',
        });
        debugger;
        console.log(err);
      });
    debugger;
  }

  handleSelectMaTaiKhoanChuyenKhoan(event) {
    event.preventDefault();
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    const mataikhoanchuyenkhoan = event.target.value;
    this.setState({
      mataikhoanchuyenkhoan,
    });
  }

  handleSelectMaTaiKhoanThuHuong(event) {
    event.preventDefault();
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    const mataikhoanthuhuong = event.target.value;
    this.setState({
      mataikhoanthuhuong,
    });
  }

  //#endregion

  componentDidMount() {
    this.getDanhSachTaiKhoanThanhToan();
  }
  render() {
    return (
      <Container>
        <br />
        <Row>
          <Col></Col>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <Card border="info">
                <Card.Header as="h5">Tài khoản nguồn</Card.Header>
                <Card.Body>
                  <Form.Label>Chọn tài khoản gốc</Form.Label>
                  <Form.Group>
                    <Form.Control
                      as="select"
                      name="mataikhoanchuyenkhoan"
                      onChange={this.handleSelectMaTaiKhoanChuyenKhoan}
                    >
                      <option value="DEFAULT">Chọn tài khoản</option>
                      {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                        <option value={taikhoan.mataikhoan}>
                          {taikhoan.mataikhoan} --- Số dư: {taikhoan.sodu}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Card.Body>
              </Card>

              <br />
              <Card border="info">
                <Card.Header as="h5">Thông tin chuyển khoản</Card.Header>
                <Card.Body>
                  <Form.Group>
                    <Form.Label>Chọn tài khoản thụ hưởng</Form.Label>
                    <Form.Control
                      as="select"
                      name="mataikhoanthuhuong"
                      onChange={this.handleSelectMaTaiKhoanThuHuong}
                    >
                      <option value="DEFAULT">Chọn tài khoản</option>
                      {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                        <option value={taikhoan.mataikhoan}>
                          {taikhoan.mataikhoan} --- Số dư: {taikhoan.sodu}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Nhập số tiền chuyển khoản</Form.Label>
                    <Form.Control
                      type="text"
                      name="sotienchuyenkhoan"
                      onChange={this.props.handleChange}
                    />
                    <p>{this.props.errors.sotienchuyenkhoan}</p>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Nội dung chuyển khoản</Form.Label>
                    <Form.Control
                      type="textarea"
                      name="noidung"
                      onChange={this.props.handleChange}
                    />
                    <p>{this.props.errors.noidung}</p>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Xác nhận
                  </Button>
                  <p>{this.state.trangthaichuyenkhoan}</p>
                </Card.Body>
              </Card>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default ChuyenKhoanCungKhachHang;
