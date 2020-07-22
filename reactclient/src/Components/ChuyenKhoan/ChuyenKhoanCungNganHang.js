import React, { Component } from 'react';
import {
  Container,
  Form,
  Card,
  Col,
  Row,
  Button,
  Modal,
} from 'react-bootstrap';
import axios from 'axios';
import { renewAccessToken } from '../../Auth/AuthRoute';
import jwt_decode from 'jwt-decode';

class ChuyenKhoanCungNganHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mataikhoanchuyenkhoan: '',
      sodutaikhoanchuyenkhoan: '',
      sodutaikhoanchuyenkhoantext: '',
      mataikhoanthuhuong: '',
      sodienthoaithuhuong: '',
      tenkhachhangthuhuong: '',
      mataikhoanthuhuongerror: '',
      sotienchuyenkhoan: '',
      sotienchuyenkhoanerror: '',
      noidungchuyenkhoan: '',
      loaichuyenkhoanId: 2,
      danhsachtaikhoanthanhtoan: [],
      trangthaichuyenkhoan: '',
      thoigianotpm: 0,
      thoigianotps: 0,
      secret: '',
      maotp: '',
      xacthucotp: false,
      showModal: false,
      thongtinchuyenkhoanerrors: '',
      chuyenkhoanerror: [],
      OTPLimit: 5,
      OTOLimittext: '',
    };
    //#region bindEvent
    this.handleChangeMaTaiKhoanChuyenKhoan = this.handleChangeMaTaiKhoanChuyenKhoan.bind(
      this
    );
    this.handleChangeMaTaiKhoanThuHuong = this.handleChangeMaTaiKhoanThuHuong.bind(
      this
    );
    this.hanleChangeSoTienChuyenKhoan = this.hanleChangeSoTienChuyenKhoan.bind(
      this
    );
    this.handleChangeNoiDungChuyenKhoan = this.handleChangeNoiDungChuyenKhoan.bind(
      this
    );
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeMaOTP = this.handleChangeMaOTP.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //#endregion
  }

  //#region function
  openModal() {
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
        thongtinchuyenkhoanerrors: 'Vui lòng nhập mã tài khoản thụ hưởng',
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
      let sodienthoaithuhuong;
      axios('http://localhost:9000/api/taikhoan/getthongtintaikhoan', {
        params: { mataikhoan: mataikhoanthuhuong },
      })
        .then((res) => {
          debugger;
          this.setState({
            loaichuyenkhoanId: 1,
          });
          sodienthoaithuhuong = res.data.taikhoan.khachhangSodienthoai;
          const token = sessionStorage.getItem('jwtToken');
          const decoded = jwt_decode(token).data;
          const sodienthoaichuyenkhoan = decoded.sodienthoai;
          if (sodienthoaichuyenkhoan === sodienthoaithuhuong) {
            this.setState({
              loaichuyenkhoanId: 1,
            });
          }
          this.setState({
            sodienthoaithuhuong,
            thongtinchuyenkhoanerrors: '',
          });
          if (thoigianotpm === 0 && thoigianotps === 0) {
            let secret;
            let timeremaining;
            let tenkhachhangthuhuong;
            // const { sodienthoaithuhuong } = this.state;
            console.log(sodienthoaithuhuong);
            debugger;
            axios
              .get('http://localhost:9000/api/auth/getthongtinkhachhang', {
                params: { sodienthoai: sodienthoaithuhuong },
              })
              .then((res) => {
                debugger;
                tenkhachhangthuhuong = res.data.tenhienthi;
                this.setState({
                  tenkhachhangthuhuong,
                });
                axios
                  .post('http://localhost:9000/api/totp/totp-secret')
                  .then((res) => {
                    secret = res.data.secret;
                    axios
                      .post('http://localhost:9000/api/totp/totp-generate', {
                        secret,
                      })
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
              })
              .catch((err) => {
                return;
              });
          }
        })
        .catch((err) => {
          this.setState({
            mataikhoanthuhuong: '',
            thongtinchuyenkhoanerrors:
              'Tài khoản thụ hưởng không tồn tại, vui lòng kiểm tra lại',
            sodienthoaithuhuong,
          });
          return;
        });
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

  //#region eventhandler
  handleChangeMaTaiKhoanChuyenKhoan(event) {
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

  handleChangeMaTaiKhoanThuHuong(event) {
    event.preventDefault();
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    const mataikhoanthuhuong = event.target.value;
    const reg = /[^A-Za-z0-9-.-_]+/g;
    if (mataikhoanthuhuong.length < 10) {
      this.setState({
        mataikhoanthuhuong: '',
        mataikhoanthuhuongerror:
          'Mã tài khoản phải có độ dài tối thiểu 10 ký tự',
        sodienthoaithuhuong: '',
      });
      return;
    } else if (reg.test(mataikhoanthuhuong) === true) {
      this.setState({
        mataikhoanthuhuong: '',
        mataikhoanthuhuongerror:
          'Mã tài khoản chứa các ký tự đặc biệt không hợp lệ',
        sodienthoaithuhuong: '',
      });
      return;
    } else if (mataikhoanthuhuong.length > 30) {
      this.setState({
        mataikhoanthuhuong: '',
        mataikhoanthuhuongerror: 'Mã tài khoản phải có độ dài tối đa 30 ký tự',
        sodienthoaithuhuong: '',
      });
      return;
    } else {
      this.setState({
        mataikhoanthuhuong,
        mataikhoanthuhuongerror: '',
        sodienthoaithuhuong: '',
      });
      return;
    }
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
              if (err.response) {
                debugger;
                const test = this.state;
                const loichuyenkhoan = err.response.data.errors;
                console.log(err.response.status);
                console.log(err.response.data);
                console.log(err.response.headers);
                this.setState({
                  chuyenkhoanerror: loichuyenkhoan,
                  trangthaichuyenkhoan: 'Chuyển khoản thất bại',
                  showModal: false,
                });
                return;
              }
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
  }
  //#endregion

  //#region componentLifecircle
  componentDidMount() {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    this.getDanhSachTaiKhoanThanhToan();
  }
  //#endregion

  //#region render
  render() {
    return (
      <Container>
        <br></br>
        <Row>
          <Col></Col>
          <Col>
            <Form>
              <Card border="info">
                <Card.Header as="h5">Tài khoản gốc</Card.Header>
                <Card.Body>
                  <Form.Label>Chọn tài khoản gốc (*)</Form.Label>
                  <Form.Group>
                    <Form.Control
                      as="select"
                      name="mataikhoanchuyenkhoan"
                      onChange={this.handleChangeMaTaiKhoanChuyenKhoan}
                    >
                      <option value="DEFAULT">Chọn tài khoản</option>
                      {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                        <option value={taikhoan.mataikhoan}>
                          {taikhoan.mataikhoan}
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
                    <Form.Label>Nhập mã tài khoản thụ hưởng (*)</Form.Label>
                    <Form.Control
                      type="text"
                      name="mataikhoanthuhuong"
                      onChange={this.handleChangeMaTaiKhoanThuHuong}
                    ></Form.Control>
                    <Form.Text style={{ color: 'red' }}>
                      {this.state.mataikhoanthuhuongerror}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Nhập số tiền chuyển khoản (*)</Form.Label>
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
                      onChange={this.handleChangeNoiDungChuyenKhoan}
                    />
                  </Form.Group>
                  <Button onClick={this.openModal}>Xác nhận</Button>
                  <Form.Text style={{ color: 'red' }}>
                    {this.state.thongtinchuyenkhoanerrors}
                  </Form.Text>
                  <Form.Text style={{ color: 'red' }}>
                    {this.state.OTPLimittext}
                  </Form.Text>
                  {this.state.chuyenkhoanerror.map((err) => (
                    <Form.Group>
                      <Form.Text style={{ color: 'red' }}>
                        {err.tinhtrangtaikhoanchuyenkhoan}
                      </Form.Text>
                      <Form.Text style={{ color: 'red' }}>
                        {err.tinhtrangtaikhoanthuhuong}
                      </Form.Text>
                      <Form.Text style={{ color: 'red' }}>
                        {err.sodutaikhoanchuyenkhoan}
                      </Form.Text>
                      <Form.Text style={{ color: 'red' }}>
                        {err.sotienchuyenkhoan}
                      </Form.Text>
                      <Form.Text style={{ color: 'red' }}>
                        {err.hanmuctrenngayquaquydinh}
                      </Form.Text>
                      <Form.Text style={{ color: 'red' }}>
                        {err.hanmuctrengiaodichquaquydinh}
                      </Form.Text>
                    </Form.Group>
                  ))}
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
                    <Form.Label>
                      Tên người thụ hưởng: {this.state.tenkhachhangthuhuong}
                    </Form.Label>
                    <br></br>
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
  //#endregion
}
export default ChuyenKhoanCungNganHang;
