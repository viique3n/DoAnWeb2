import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { renewAccessToken } from '../Auth/AuthRoute';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';

class ChuyenKhoan extends Component {
  constructor(props) {
    super(props);
    //#region state
    this.state = {
      loaichuyenkhoanId: 1,
      thongtinloaichuyenkhoan:
        'Thực hiện việc chuyển khoản giữa các tài khoản thanh toán của quý khách',
      danhsachtaikhoanthanhtoan: [],
      mataikhoanchuyenkhoan: '',
      mataikhoanchuyenkhoan2: '',
      mataikhoanthuhuong: '',
      mataikhoanthuhuong2: '',
      sotienchuyenkhoan: '',
      sotienchuyenkhoan2: '',
      noidung: '',
      noidung2: '',
      thoigian: '',
      trangthaichuyenkhoan: '',
      trangthaichuyenkhoan2: '',
      trangthaichuyenkhoan3: '',
    };
    //#endregion

    //#region bindEventHandle
    this.handleSelectLoaiChuyenKhoan = this.handleSelectLoaiChuyenKhoan.bind(
      this
    );
    this.handleSelectMaTaiKhoanChuyenKhoan = this.handleSelectMaTaiKhoanChuyenKhoan.bind(
      this
    );
    this.handleSelectMaTaiKhoanChuyenKhoan2 = this.handleSelectMaTaiKhoanChuyenKhoan2.bind(
      this
    );
    this.handleSelectMaTaiKhoanThuHuong = this.handleSelectMaTaiKhoanThuHuong.bind(
      this
    );
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
    //#endregion
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
    const decoded = jwt_decode(token).data;
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

  //#region EventHandle
  handleSelectLoaiChuyenKhoan(event) {
    debugger;
    const test = this.state;
    const test2 = this.props.values;
    event.preventDefault();
    const renew = this.renewAcess();
    if (renew === false) {
      return;
    }

    this.getDanhSachTaiKhoanThanhToan();
    const loaichuyenkhoan = event.target.value;
    if (loaichuyenkhoan === 'DEFAULT') {
      this.setState({
        mataikhoanchuyenkhoan: this.state.danhsachtaikhoanthanhtoan[0]
          .mataikhoan,
        mataikhoanthuhuong: this.state.danhsachtaikhoanthanhtoan[0].mataikhoan,
        loaichuyenkhoanId: 1,
        thongtinloaichuyenkhoan:
          'Thực hiện việc chuyển khoản giữa các tài khoản thanh toán của quý khách',
      });
    } else if (loaichuyenkhoan === 'chuyenkhoan2') {
      this.setState({
        mataikhoanchuyenkhoan2: this.state.danhsachtaikhoanthanhtoan[0]
          .mataikhoan,
        mataikhoanthuhuong2: '',
        loaichuyenkhoanId: 2,
        thongtinloaichuyenkhoan:
          'Thực hiện việc chuyển khoản tới các tài khoản trong cùng ngân hàng',
        mataikhoanthuhuong: '',
      });
    } else if (loaichuyenkhoan === 'chuyenkhoan3') {
      this.setState({
        loaichuyenkhoanId: 3,
        thongtinloaichuyenkhoan:
          'Thực hiện việc chuyển khoản tới các tài khoản thuộc ngân hàng khác',
      });
    }
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
  handleSelectMaTaiKhoanChuyenKhoan2(event) {
    event.preventDefault();
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    const mataikhoanchuyenkhoan2 = event.target.value;
    this.setState({
      mataikhoanchuyenkhoan2,
    });
  }
  handleSelectMaTaiKhoanThuHuong(event) {
    debugger;
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
  handleChangeMaTaiKhoanThuHuong(event) {
    event.preventDefault();
  }
  haldeChangeSoTienChuyenKhoan(event) {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    event.preventDefault();
    const sotienchuyenkhoan = event.target.value;
    this.setState({
      sotienchuyenkhoan,
    });
  }
  handleChangeNoiDungChuyenKhoan(event) {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    event.preventDefault();
    const noidung = event.target.value;
    this.setState({
      noidung,
    });
  }
  handleSubmit1(event) {
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
    const { sotienchuyenkhoan1, noidung1 } = this.props.values;
    debugger;

    if (sotienchuyenkhoan1 == '') {
      return;
    }
    axios
      .post('http://localhost:9000/api/chuyenkhoan/chuyenkhoan', {
        mataikhoanchuyenkhoan,
        mataikhoanthuhuong,
        sotienchuyenkhoan: sotienchuyenkhoan1,
        noidung: noidung1,
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
  handleSubmit2(event) {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    event.preventDefault();
    const { mataikhoanchuyenkhoan2, loaichuyenkhoanId } = this.state;
    const {
      sotienchuyenkhoan2,
      noidung2,
      mataikhoanthuhuong2,
    } = this.props.values;
    debugger;

    if (sotienchuyenkhoan2 == '') {
      return;
    }
    axios
      .post('http://localhost:9000/api/chuyenkhoan/chuyenkhoan', {
        mataikhoanchuyenkhoan: mataikhoanchuyenkhoan2,
        mataikhoanthuhuong: mataikhoanthuhuong2,
        sotienchuyenkhoan: sotienchuyenkhoan2,
        noidung: noidung2,
        thoigian: new Date(),
        loaichuyenkhoanId,
      })
      .then((res) => {
        if (res.data.thanhcong) {
          this.setState({
            trangthaichuyenkhoan2: 'Chuyển khoản thành công',
          });
          this.getDanhSachTaiKhoanThanhToan();
        }
      })
      .catch((err) => {
        this.setState({
          trangthaichuyenkhoan2: 'Chuyển khoản thất bại',
        });
        debugger;
        console.log(err);
      });
    debugger;
  }
  handleSubmit3(event) {
    event.preventDefault();
  }
  //#endregion

  //#region Render Form
  renderKhungChuyenKhoan() {
    debugger;
    const test = this.state;
    const { loaichuyenkhoanId } = this.state;
    if (loaichuyenkhoanId === 1) {
      return (
        <Form onSubmit={this.handleSubmit1}>
          <Form.Group>
            <Form.Label>
              <b>Chọn tài khoản gốc</b>
            </Form.Label>
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
          <Form.Group>
            <Form.Label>
              <b>Chọn tài khoản thụ hưởng</b>
            </Form.Label>
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
            <Form.Label>
              <b>Nhập số tiền chuyển khoản</b>
            </Form.Label>
            <Form.Control
              type="text"
              name="sotienchuyenkhoan1"
              onChange={this.props.handleChange}
            />
            <p>{this.props.errors.sotienchuyenkhoan1}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <b>Nội dung chuyển khoản</b>
            </Form.Label>
            <Form.Control
              type="textarea"
              name="noidung1"
              onChange={this.props.handleChange}
            />
            <p>{this.props.errors.noidung1}</p>
          </Form.Group>
          <Button variant="primary" type="submit">
            Xác nhận
          </Button>
          <p>{this.state.trangthaichuyenkhoan}</p>
        </Form>
      );
    } else if (loaichuyenkhoanId === 2) {
      return (
        <div>
          <Form onSubmit={this.handleSubmit2}>
            <Form.Group>
              <Form.Label>
                <b>Chọn tài khoản gốc</b>
              </Form.Label>
              <Form.Control
                as="select"
                defaultValue={'DEFAULT'}
                name="mataikhoanchuyenkhoan"
                onChange={this.handleSelectMaTaiKhoanChuyenKhoan2}
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
              <Form.Label>
                <b>Nhập mã thẻ/Số khoản thụ hưởng*</b>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={this.props.handleChange}
                name="mataikhoanthuhuong2"
              ></Form.Control>
              <p>{this.props.errors.mataikhoanthuhuong2}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <b>Nhập số tiền cần chuyển*</b>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={this.props.handleChange}
                name="sotienchuyenkhoan2"
              ></Form.Control>
              <p>{this.props.errors.sotienchuyenkhoan2}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <b>Nội dung chuyển khoản</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                onChange={this.props.handleChange}
                name="noidung2"
              ></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Xác nhận
            </Button>
            <p>{this.state.trangthaichuyenkhoan2}</p>
          </Form>
        </div>
      );
    } else if (loaichuyenkhoanId === 3) {
      return (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>
                <b>Chọn tài khoản gốc</b>
              </Form.Label>
              <Form.Control as="select" defaultValue={'DEFAULT'}>
                <option value="DEFAULT">Chọn tài khoản</option>
                {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                  <option>{taikhoan.mataikhoan}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <b>Ngân hàng</b>
              </Form.Label>
              <Form.Control as="select" defaultValue={'DEFAULT'}>
                <option value="DEFAULT">Chọn ngân hàng</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <b>Nhập mã thẻ/Số khoản thụ hưởng*</b>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={this.props.handleChange}
                name="mataikhoanthuhuong"
              ></Form.Control>
              <p>{this.props.errors.mataikhoanthuhuong}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <b>Nhập số tiền cần chuyển*</b>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={this.props.handleChange}
                name="sotienchuyenkhoan"
              ></Form.Control>
              <p>{this.props.errors.sotienchuyenkhoan}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <b>Nội dung chuyển khoản</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                onChange={this.props.handleChange}
                name="noidung"
              ></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Xác nhận
            </Button>
          </Form>
        </div>
      );
    }
  }
  //#endregion

  //#region cpLifeCircle
  componentDidMount() {
    this.getDanhSachTaiKhoanThanhToan();
  }
  componentDidUpdate() {}

  //#endregion

  //#region render
  render() {
    return (
      <Container>
        <Row>
          <Col sm={2} md={2} lg={2}></Col>
          <Col sm={5} md={5} lg={5}>
            <br></br>
            <h3 style={{ textAlign: 'center' }}>Chuyển khoản</h3>
            <Form.Group>
              <Form.Control
                as="select"
                customdefaultValue={'DEFAULT'}
                className="loaichuyenkhoanSelect"
                onChange={this.handleSelectLoaiChuyenKhoan}
              >
                <option value="DEFAULT">
                  Chuyển khoản qua tài khoản của quý khách
                </option>
                <option value="chuyenkhoan2">
                  Chuyển khoản qua tài khoản nội bộ
                </option>
                <option value="chuyenkhoan3">
                  Chuyển khoản liên ngân hàng
                </option>
              </Form.Control>
              <p>{this.state.thongtinloaichuyenkhoan}</p>
            </Form.Group>
            {this.renderKhungChuyenKhoan()}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
  //#endregion
}
export default ChuyenKhoan;
