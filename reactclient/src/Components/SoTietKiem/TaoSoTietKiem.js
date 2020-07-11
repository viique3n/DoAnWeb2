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

class TaoSoTietKiem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mataikhoanthanhtoan: '',
      sodu: 0,
      sodutext: '',
      ngaymo: '',
      hinhthuctralai: '',
      showModal: false,
      danhsachtaikhoanthanhtoan: [],
      danhsachkyhan: [],
      danhsachlaisuat: [],
      kyhan: '',
      laisuat: '',
      laisuattext: '',
      sotiengui: '',
      sotienguierrors: '',
      secret: '',
      maotp: '',
      xacthucotp: false,
      thoigianotpm: 0,
      thoigianotps: 0,
      hethan: true,
      xacnhantaosoerror: '',
      trangthaitaoso: '',
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleOnChangeSoTienGuiTietKiem = this.handleOnChangeSoTienGuiTietKiem.bind(
      this
    );
    this.handleSelectKyHan = this.handleSelectKyHan.bind(this);
    this.handleSelectMaTaiKhoanGoc = this.handleSelectMaTaiKhoanGoc.bind(this);
    this.handleSelectHinhThucTraLai = this.handleSelectHinhThucTraLai.bind(
      this
    );
    this.handleChangeMaOTP = this.handleChangeMaOTP.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // this.handleSelectHinhThucOTP = this.handleSelectHinhThucOTP.bind(this);
  }

  //#region function
  close() {
    this.setState({ showModal: false });
  }
  open() {
    const {
      thoigianotpm,
      thoigianotps,
      mataikhoanthanhtoan,
      kyhan,
      sotiengui,
      hinhthuctralai,
      sotienguierrors,
    } = this.state;

    if (mataikhoanthanhtoan === '') {
      this.setState({
        xacnhantaosoerror: 'Vui lòng chọn thẻ thanh toán',
      });
      return;
    } else if (kyhan === '') {
      this.setState({
        xacnhantaosoerror: 'Vui lòng chọn kỳ hạn gửi tiết kiệm',
      });
      return;
    } else if (sotiengui === '') {
      this.setState({
        xacnhantaosoerror: 'Vui lòng nhập số tiền gửi tiết kiệm',
      });
      return;
    } else if (hinhthuctralai === '') {
      this.setState({
        xacnhantaosoerror: 'Vui lòng chọn hình thức trả lãi',
      });
      return;
    } else if (sotienguierrors !== '') {
      this.setState({
        xacnhantaosoerror: 'Số tiền gửi tiết kiệm lỗi',
      });
      return;
    }
    this.setState({
      xacnhantaosoerror: '',
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

    this.setState({ showModal: true });
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
    let token = sessionStorage.getItem('refreshToken');
    token = sessionStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    const { sodienthoai } = decoded;
    axios('http://localhost:9000/api/taikhoan/getdanhsachtaikhoanthanhtoan', {
      params: { khachhangSodienthoai: sodienthoai },
    })
      .then((res) => {
        let danhsachtaikhoanthanhtoan = [];
        res.data.map((tk) => {
          if (tk.tinhtrang === 'Đã kích hoạt') {
            danhsachtaikhoanthanhtoan.push(tk);
          }
        });
        this.setState({
          danhsachtaikhoanthanhtoan,
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
        let setDanhSachKyHan = new Set();
        res.data.map((data) => {
          setDanhSachKyHan.add(data.kyhan);
        });
        const danhsachkyhan = Array.from(setDanhSachKyHan);
        this.setState({
          danhsachlaisuat: res.data,
          danhsachkyhan,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //#endregion

  //#region EventHandler
  handleOnChangeSoTienGuiTietKiem(event) {
    event.preventDefault();
    if (isNaN(event.target.value)) {
      this.setState({
        sotienguierrors: 'Số tiền gửi không hợp lệ',
        laisuat: '',
        laisuattext: '',
      });
      return;
    }

    const sotiengui = event.target.value;
    if (+sotiengui < 3000000) {
      this.setState({
        sotienguierrors: 'Số tiền gửi tối thiểu phải lớn hơn 3 triệu đồng',
        laisuat: '',
        laisuattext: '',
      });
      return;
    } else if (+sotiengui % 50000 !== 0) {
      this.setState({
        sotienguierrors:
          'Số tiền gửi không hợp lệ, yêu cầu số tiền phải chia hết cho 50 nghìn đồng',
        laisuat: '',
        laisuattext: '',
      });
    } else if (+sotiengui > +this.state.sodu) {
      this.setState({
        sotienguierrors:
          'Số tiền gửi tiết kiệm lớn hơn số tiền trong tài khoản thanh toán, vui lòng nhập số tiền thấp hơn',
        laisuat: '',
        laisuattext: '',
      });
    } else {
      const { danhsachlaisuat, kyhan } = this.state;
      let ls;
      danhsachlaisuat.map((laisuat) => {
        if (
          +sotiengui >= +laisuat.muctientoithieu &&
          +sotiengui < +laisuat.muctientoida &&
          laisuat.kyhan === kyhan
        ) {
          ls = laisuat.laisuat;
        } else if (
          +sotiengui >= +laisuat.muctientoithieu &&
          +laisuat.muctientoida === -1 &&
          laisuat.kyhan === kyhan
        ) {
          ls = laisuat.laisuat;
        }
      });
      const test = this.state;
      this.setState({
        sotiengui,
        laisuat: ls,
        laisuattext: 'Lãi suất: ' + ls + '%',
        sotienguierrors: '',
      });
    }
  }
  handleSelectMaTaiKhoanGoc(event) {
    event.preventDefault();
    const mataikhoanthanhtoan = event.target.value;
    if (mataikhoanthanhtoan === 'DEFAULT') {
      this.setState({
        mataikhoanthanhtoan: '',
        sodu: 0,
        sodutext: '',
        laisuat: '',
        laisuattext: '',
        sotienguierrors: '',
      });
      return;
    }
    const { danhsachtaikhoanthanhtoan } = this.state;
    danhsachtaikhoanthanhtoan.map((taikhoan) => {
      if (taikhoan.mataikhoan === mataikhoanthanhtoan) {
        if (+this.state.sotiengui > +taikhoan.sodu) {
          this.setState({
            sotienguierrors:
              'Số tiền gửi tiết kiệm lớn hơn số tiền trong tài khoản thanh toán, vui lòng nhập số tiền thấp hơn',
            laisuat: '',
            laisuattext: '',
          });
        } else {
          const { danhsachlaisuat, kyhan, sotiengui } = this.state;
          let ls;
          danhsachlaisuat.map((laisuat) => {
            if (
              +sotiengui >= +laisuat.muctientoithieu &&
              +sotiengui < +laisuat.muctientoida &&
              laisuat.kyhan === kyhan
            ) {
              ls = laisuat.laisuat;
            } else if (
              +sotiengui >= +laisuat.muctientoithieu &&
              +laisuat.muctientoida === -1 &&
              laisuat.kyhan === kyhan
            ) {
              ls = laisuat.laisuat;
            }
          });
          const test = this.state;
          this.setState({
            sotiengui,
            laisuat: ls,
            laisuattext: 'Lãi suất: ' + ls + '%',
            sotienguierrors: '',
          });
        }
        this.setState({
          mataikhoanthanhtoan,
          sodu: taikhoan.sodu,
          sodutext: 'Số dư: ' + taikhoan.sodu + ' ' + taikhoan.donvitiente,
        });
      }
    });
    this.setState({
      mataikhoanthanhtoan,
    });
  }
  handleSelectKyHan(event) {
    event.preventDefault();
    const kyhan = event.target.value;
    if (kyhan === 'DEFAULT') {
      this.setState({
        laisuat: '',
        laisuattext: '',
      });
    }
    const { sotiengui, danhsachlaisuat, sotienguierrors } = this.state;

    let ls;
    danhsachlaisuat.map((laisuat) => {
      if (
        +sotiengui >= +laisuat.muctientoithieu &&
        +sotiengui < +laisuat.muctientoida &&
        laisuat.kyhan === kyhan
      ) {
        ls = laisuat.laisuat;
      } else if (
        +sotiengui >= +laisuat.muctientoithieu &&
        +laisuat.muctientoida === -1 &&
        laisuat.kyhan === kyhan
      ) {
        ls = laisuat.laisuat;
      }
    });
    this.setState({
      sotiengui,
      laisuat: ls,
      laisuattext: 'Lãi suất: ' + ls + '%',
      sotienguierrors: '',
      kyhan,
    });
  }
  handleSelectHinhThucTraLai(event) {
    event.preventDefault();
    const hinhthuctralai = event.target.value;
    if (hinhthuctralai === 'DEFAULT') {
      this.setState({
        hinhthuctralai: '',
      });
    } else {
      this.setState({
        hinhthuctralai,
      });
    }
  }
  handleChangeMaOTP(event) {
    event.preventDefault();
    const maotp = event.target.value;
    this.setState({
      maotp,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { maotp, secret } = this.state;
    axios
      .post('http://localhost:9000/api/totp/totp-validate', {
        secret,
        token: maotp,
      })
      .then((res) => {
        console.log(`typeof token: ${typeof maotp}`);
        const { valid } = res.data;
        debugger;
        if (valid === true) {
          axios
            .post('http://localhost:9000/api/totp/totp-validate')
            .then((res) => {})
            .catch((err) => {});
          this.setState({
            xacthucotp: true,
            trangthaitaoso: 'Tạo sổ tiết kiệm thành công',
            showModal: false,
          });
        } else {
          this.setState({
            xacthucotp: false,
            trangthaitaoso: 'Tạo sổ tiết kiệm thất bại',
            showModal: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    debugger;
  }
  //#endregion

  //#region ComponentLifeCircle
  componentDidMount() {
    this.getDanhSachTaiKhoanThanhToan();
    this.getDanhSachLaiSuat();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  //#endregion

  //#region Render
  render() {
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
                      onChange={this.handleSelectMaTaiKhoanGoc}
                    >
                      <option value="DEFAULT">Chọn tài khoản</option>
                      {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                        <option value={taikhoan.mataikhoan}>
                          {taikhoan.mataikhoan}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Text>{this.state.sodutext}</Form.Text>
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
                      {this.state.danhsachkyhan.map((kyhan) => (
                        <option value={kyhan}>{kyhan}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Số tiền gửi</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={this.handleOnChangeSoTienGuiTietKiem}
                    ></Form.Control>
                    <Form.Text style={{ color: 'red' }}>
                      {this.state.sotienguierrors}
                    </Form.Text>
                    <Form.Text>{this.state.laisuattext}</Form.Text>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Hình thức trả lãi</Form.Label>
                    <Form.Control
                      as="select"
                      name="hinhthuctralai"
                      onChange={this.handleSelectHinhThucTraLai}
                    >
                      <option value="DEFAULT">Chọn hình thức trả lãi</option>
                      <option value="hinhthuclai1">Lãi nhập gốc</option>
                      <option value="hinhthuclai2">
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
                  <Form.Text style={{ color: 'red' }}>
                    {this.state.xacnhantaosoerror}
                  </Form.Text>
                  <Form.Text>{this.state.trangthaitaoso}</Form.Text>
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
                    <Button onClick={this.close}>Close</Button>
                    <Button onClick={this.handleSubmit}>Xác nhận</Button>
                  </Modal.Footer>
                </Modal>
              </Card>
            </Form>
          </Col>
          <Col></Col>
        </Row>
        <br />
        <br />
      </Container>
    );
  }
  //#endregion
}
export default TaoSoTietKiem;
