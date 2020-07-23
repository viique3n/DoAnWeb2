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
      mataikhoanchuyenkhoan: '',
      sodutaikhoanchuyenkhoan: '',
      sodutaikhoanchuyenkhoantext: '',
      mataikhoanthuhuong: '',
      sodutaikhoanthuhuong: '',
      sodutaikhoanthuhuongtext: '',
      sotienchuyenkhoan: '',
      sotienchuyenkhoanerror: '',
      noidungchuyenkhoan: '',
      loaichuyenkhoanId: 1,
      danhsachtaikhoanthanhtoan: [],
      trangthaichuyenkhoan: '',
      thoigianotpm: 0,
      thoigianotps: 0,
      secret: '',
      maotp: '',
      xacthucotp: false,
      showModal: false,
      thongtinchuyenkhoanerrors: '',
      OTPLimit: 5,
      OTOLimittext: '',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectMaTaiKhoanChuyenKhoan = this.handleSelectMaTaiKhoanChuyenKhoan.bind(
      this
    );
    this.handleSelectMaTaiKhoanThuHuong = this.handleSelectMaTaiKhoanThuHuong.bind(
      this
    );
    this.hanleChangeSoTienChuyenKhoan = this.hanleChangeSoTienChuyenKhoan.bind(
      this
    );
    this.handleChangeNoiDungChuyenKhoan = this.handleChangeNoiDungChuyenKhoan.bind(
      this
    );
    this.handleChangeMaOTP = this.handleChangeMaOTP.bind(this);
  }

  //#region function
  openModal() {
    debugger;
    const {
      thoigianotpm,
      thoigianotps,
      sotienchuyenkhoan,
      sotienchuyenkhoanerror,
      mataikhoanchuyenkhoan,
      mataikhoanthuhuong,
    } = this.state;

    if (mataikhoanchuyenkhoan === '') {
      this.setState({
        thongtinchuyenkhoanerrors: 'Vui lòng chọn tài khoản chuyển khoản',
      });
      return;
    } else if (mataikhoanthuhuong === '') {
      this.setState({
        thongtinchuyenkhoanerrors: 'Vui lòng chọn tài khoản thụ hưởng',
      });
      return;
    } else if (mataikhoanchuyenkhoan === mataikhoanthuhuong) {
      this.setState({
        thongtinchuyenkhoanerrors:
          'Không thể chuyển khoản tới cùng tài khoản chuyển khoản',
      });
      return;
    } else if (sotienchuyenkhoan === '') {
      this.setState({
        thongtinchuyenkhoanerrors: 'Vui lòng nhập số tiền chuyển khoản hợp lệ',
      });
      return;
    } else if (sotienchuyenkhoanerror !== '') {
      this.setState({
        thongtinchuyenkhoanerrors: 'Vui lòng nhập số tiền chuyển khoản hợp lệ',
      });
      return;
    } else {
      this.setState({
        thongtinchuyenkhoanerrors: '',
      });
      if (thoigianotpm === 0 && thoigianotps === 0) {
        let secret;
        let timeremaining;
        axios
          .post('http://localhost:9000/api/totp/totp-secret')
          .then((res) => {
            secret = res.data.secret;
            axios
              .post('http://localhost:9000/api/totp/totp-generate', { secret })
              .then((res) => {
                timeremaining = res.data.remaining;
                console.log(`secret: ${secret}`);
                console.log(`token: ${res.data.token}`);
                console.log(`time remaining: ${timeremaining}`);
                this.setState({
                  secret,
                  thoigianotpm: 5,
                  thoigianotps: 0,
                });
                this.countDown();
              })
              .catch((err) => {
                return;
              });
          })
          .catch((err) => {
            return;
          });
      }
    }
    this.setState({ showModal: true });
  }
  closeModal() {
    this.setState({ showModal: false });
  }
  countDown() {
    this.myInterval = setInterval(() => {
      const { thoigianotps, thoigianotpm } = this.state;

      if (thoigianotps > 0) {
        this.setState(({ thoigianotps }) => ({
          thoigianotps: thoigianotps - 1,
        }));
      }
      if (thoigianotps === 0) {
        if (thoigianotpm === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ thoigianotpm }) => ({
            thoigianotpm: thoigianotpm - 1,
            thoigianotps: 59,
          }));
        }
      }
    }, 1000);
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

  //#region EventHandler
  handleSubmit(event) {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    event.preventDefault();
    const { maotp, secret } = this.state;
    axios
      .post('http://localhost:9000/api/totp/totp-validate', {
        secret,
        token: maotp,
      })
      .then((res) => {
        console.log(`typeof token: ${typeof maotp}`);
        console.log(res.data);
        const { valid } = res.data;
        debugger;
        if (valid === true) {
          const {
            mataikhoanchuyenkhoan,
            mataikhoanthuhuong,
            loaichuyenkhoanId,
            noidungchuyenkhoan,
            sotienchuyenkhoan,
          } = this.state;
          axios
            .post('http://localhost:9000/api/chuyenkhoan/chuyenkhoan', {
              mataikhoanchuyenkhoan,
              mataikhoanthuhuong,
              sotienchuyenkhoan,
              noidung: noidungchuyenkhoan,
              thoigian: new Date(),
              loaichuyenkhoanId,
            })
            .then((res) => {
              if (res.data.thanhcong) {
                this.setState({
                  trangthaichuyenkhoan: 'Chuyển khoản thành công',
                  xacthucotp: true,
                });
                alert('Chuyển khoản thành công');
                window.location.reload();
              }
            })
            .catch((err) => {
              this.setState({
                trangthaichuyenkhoan: 'Chuyển khoản thất bại',
              });
              debugger;
              console.log(err);
            });
        } else {
          debugger;
          const ti = this.state.OTPLimit;
          this.setState({
            xacthucotp: false,
            OTPLimit: +ti - 1,
            OTPLimittext: `Số lần nhập mã còn lại ${+ti - 1}`,
            showModal: false,
          });
          debugger;
          const test = this.state.OTPLimittext;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    debugger;
  }
  handleChangeMaOTP(event) {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    event.preventDefault();
    const maotp = event.target.value;
    this.setState({
      maotp,
    });
  }
  handleSelectMaTaiKhoanChuyenKhoan(event) {
    event.preventDefault();
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    const mataikhoanchuyenkhoan = event.target.value;
    if (mataikhoanchuyenkhoan === 'DEFAULT') {
      this.setState({
        mataikhoanchuyenkhoan: '',
        sodutaikhoanchuyenkhoan: '',
        sodutaikhoanchuyenkhoantext: '',
        thongtinchuyenkhoanerrors: '',
      });
      return;
    }
    const { danhsachtaikhoanthanhtoan } = this.state;
    danhsachtaikhoanthanhtoan.map((tk) => {
      if (tk.mataikhoan === mataikhoanchuyenkhoan) {
        this.setState({
          mataikhoanchuyenkhoan,
          sodutaikhoanchuyenkhoan: tk.sodu,
          thongtinchuyenkhoanerrors: '',
          sodutaikhoanchuyenkhoantext: `Số dư: ${tk.sodu} VNĐ`,
        });
        debugger;
        return;
      }
    });
  }

  handleSelectMaTaiKhoanThuHuong(event) {
    event.preventDefault();
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    const mataikhoanthuhuong = event.target.value;
    if (mataikhoanthuhuong === 'DEFAULT') {
      this.setState({
        mataikhoanthuhuong: '',
        sodutaikhoanthuhuong: '',
        sodutaikhoanthuhuongtext: '',
        thongtinchuyenkhoanerrors: '',
      });
      return;
    }
    const { danhsachtaikhoanthanhtoan } = this.state;
    danhsachtaikhoanthanhtoan.map((tk) => {
      if (tk.mataikhoan === mataikhoanthuhuong) {
        this.setState({
          mataikhoanthuhuong,
          sodutaikhoanthuhuong: tk.sodu,
          thongtinchuyenkhoanerrors: '',
          sodutaikhoanthuhuongtext: `Số dư: ${tk.sodu} VNĐ`,
        });
        return;
      }
    });
  }

  hanleChangeSoTienChuyenKhoan(event) {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    event.preventDefault();

    if (isNaN(event.target.value)) {
      this.setState({
        sotienchuyenkhoan: '',
      });
      return;
    }

    const sotienchuyenkhoan = event.target.value;
    if (+sotienchuyenkhoan < 50000) {
      this.setState({
        sotienchuyenkhoan: '',
        sotienchuyenkhoanerror:
          'Số tiền chuyển khoản tối thiểu phải lớn hơn 50000 VNĐ',
      });
      return;
    } else if (+sotienchuyenkhoan % 50000 !== 0) {
      this.setState({
        sotienchuyenkhoan: '',
        sotienchuyenkhoanerror:
          'Số tiền chuyển khoản không hợp lệ, yêu cầu số tiền phải chia hết cho 50000',
      });
      return;
    } else if (+sotienchuyenkhoan > +this.state.sodutaikhoanchuyenkhoan) {
      this.setState({
        sotienchuyenkhoan: '',
        sotienchuyenkhoanerror:
          'Số tiền chuyển khoản lớn hơn số dư trong tài khoản, vui lòng nhập số tiền bé hơn',
      });
      return;
    } else {
      this.setState({
        sotienchuyenkhoan,
        sotienchuyenkhoanerror: '',
      });
    }
  }

  handleChangeNoiDungChuyenKhoan(event) {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    event.preventDefault();
    const noidungchuyenkhoan = event.target.value;
    this.setState({
      noidungchuyenkhoan,
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
            <Form>
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
                    <Form.Text>
                      {this.state.sodutaikhoanchuyenkhoantext}
                    </Form.Text>
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
                    <Form.Text>{this.state.sodutaikhoanthuhuongtext}</Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Nhập số tiền chuyển khoản</Form.Label>
                    <Form.Control
                      type="text"
                      name="sotienchuyenkhoan"
                      onChange={this.hanleChangeSoTienChuyenKhoan}
                    />
                    <Form.Text style={{ color: 'red' }}>
                      {this.state.sotienchuyenkhoanerror}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Nội dung chuyển khoản</Form.Label>
                    <Form.Control
                      type="textarea"
                      name="noidung"
                      onChange={this.props.handleChange}
                    />
                  </Form.Group>
                  <Button onClick={this.openModal}>Xác nhận</Button>
                  <Form.Text style={{ color: 'red' }}>
                    {this.state.thongtinchuyenkhoanerrors}
                  </Form.Text>
                  <Form.Text style={{ color: 'red' }}>
                    {this.state.OTPLimittext}
                  </Form.Text>
                </Card.Body>
                <Modal
                  size="sm"
                  show={this.state.showModal}
                  onHide={this.closeModal}
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
                    <Form.Control
                      type="text"
                      name="otp"
                      onChange={this.handleChangeMaOTP}
                    ></Form.Control>
                    <Form.Text>
                      Mã OTP hết hạn sau: {this.state.thoigianotpm}:
                      {this.state.thoigianotps}
                    </Form.Text>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.closeModal}>Close</Button>
                    <Button onClick={this.handleSubmit}>Xác nhận</Button>
                  </Modal.Footer>
                </Modal>
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
