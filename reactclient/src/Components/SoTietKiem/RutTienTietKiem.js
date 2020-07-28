import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  Form,
  Button,
  Col,
  Container,
  Row,
  Card,
  Modal,
} from 'react-bootstrap';
class RutTienTietKiem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date(),
      danhsachsotietkiem: [],
      danhsachlaisuat: [],
      danhsachkyhan: [],
      masotietkiem: '',
      sotiengui: '',
      sotienguitext: '',
      ngaymo: '',
      ngaymotext: '',
      ngaydong: '',
      ngaydongtext: '',
      kyhan: '',
      kyhantext: '',
      tienlai: '',
      tienlaitext: '',
      laisuat: '',
      laisuatId: '',
      laisuattext: '',
      laisuatkhongkyhan: '',
      laisuatkhongkyhantext: '',
      thoigiandagui: '',
      thoigiandaguitext: '',
      tongtiennhanduoc: '',
      tongtiennhanduoctext: '',
      tonglaitruockyhan: '',
      tonglaitruockyhantext: '',
      tongtiennhantruockyhan: '',
      tongtiennhantruockyhantext: '',
      showModal: false,
      xacnhanruttien: '',
      thoigianotpm: 0,
      thoigianotps: 0,
      maotp: '',
    };
    this.handleSelectSoTietKiem = this.handleSelectSoTietKiem.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeMaOTP = this.handleChangeMaOTP.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //#region function
  openModal() {
    const { masotietkiem, thoigianotpm, thoigianotps } = this.state;

    if (masotietkiem === '') {
      this.setState({
        xacnhanruttien: 'Vui lòng chọn sổ tiết kiệm',
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
  closeModal() {
    this.setState({
      showModal: false,
    });
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
  getDanhSachSoTietKiem() {
    const token = sessionStorage.getItem('jwtToken');
    const decoded = jwt_decode(token).data;
    const { sodienthoai } = decoded;
    axios('http://localhost:9000/api/sotietkiem/getsotietkiem', {
      params: {
        khachhangSodienthoai: sodienthoai,
        tinhtrang: 'Đang trong thời gian gửi tiết kiệm',
      },
    })
      .then((res) => {
        debugger;
        this.setState({
          danhsachsotietkiem: res.data,
        });
      })
      .catch((err) => {
        debugger;
        if (err.response) {
          const test = err.response.data;
        }
      });
  }
  getDanhSachLaiSuat() {
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
  handleSelectSoTietKiem(event) {
    event.preventDefault();
    const masotietkiem = event.target.value;
    if (masotietkiem === 'DEFAULT') {
      this.setState({
        masotietkiem,
        sotiengui: '',
        sotienguitext: '',
        ngaymo: '',
        ngaymotext: '',
        ngaydong: '',
        ngaydongtext: '',
        kyhan: '',
        kyhantext: '',
        laisuat: '',
        laisuattext: '',
        tienlai: '',
        tienlaitext: '',
        thoigiandagui: '',
        thoigiandaguitext: '',
        laisuatkhongkyhan: '',
        laisuatkhongkyhantext: '',
        tonglai: '',
        tonglaitext: '',
        tongtiennhanduoc: '',
        tongtiennhanduoctext: '',
        tonglaitruockyhan: '',
        tonglaitruockyhantext: '',
        tongtiennhantruockyhan: '',
        tongtiennhantruockyhantext: '',
      });
      return;
    } else {
      const { danhsachsotietkiem, danhsachlaisuat, now } = this.state;
      danhsachsotietkiem.map((sotietkiem) => {
        if (sotietkiem.id === masotietkiem) {
          let {
            ngaymo,
            ngaydong,
            kyhan,
            laisuatId,
            tienlai,
            sotiengui,
          } = sotietkiem;

          let ngaymotext,
            ngaydongtext,
            kyhantext,
            laisuattext,
            tienlaitext,
            sotienguitext,
            thoigiandaguitext,
            laisuatkhongkyhantext,
            tongtiennhanduoc,
            tongtiennhanduoctext,
            tonglaitruockyhan,
            tonglaitruockyhantext,
            tongtiennhantruockyhan,
            tongtiennhantruockyhantext;

          ngaymo = new Date(ngaymo);
          ngaymotext =
            'Ngày mở: ' +
            ngaymo.getDate() +
            '/' +
            (+ngaymo.getMonth() + 1) +
            '/' +
            ngaymo.getFullYear();
          ngaydong = new Date(ngaydong);
          ngaydongtext =
            'Ngày đóng: ' +
            ngaydong.getDate() +
            '/' +
            (+ngaydong.getMonth() + 1) +
            '/' +
            ngaydong.getFullYear();

          kyhantext = 'Kỳ hạn: ' + kyhan;
          tienlaitext = 'Tiền lãi theo đúng kỳ hạn: ' + tienlai + 'VNĐ';
          sotienguitext = 'Số tiền gửi: ' + sotiengui + 'VNĐ';

          let laisuat, laisuatkhongkyhan;
          let i;
          for (i = 0; i < danhsachlaisuat.length; i++) {
            if (danhsachlaisuat[i].id === laisuatId) {
              laisuat = danhsachlaisuat[i].laisuat;
              break;
            }
          }
          for (i = 0; i < danhsachlaisuat.length; i++) {
            if (danhsachlaisuat[i].id === 'khongkyhan') {
              laisuatkhongkyhan = danhsachlaisuat[i].laisuat;
              break;
            }
          }
          laisuatkhongkyhantext =
            'Lãi suất không kỳ hạn: ' + laisuatkhongkyhan + '%';
          const nowdmy = new Date(
            +now.getMonth() + 1 + '/' + now.getDate() + '/' + now.getFullYear()
          );
          const ngaymodmy = new Date(
            +ngaymo.getMonth() +
              1 +
              '/' +
              ngaymo.getDate() +
              '/' +
              ngaymo.getFullYear()
          );
          console.log(
            +now.getMonth() + 1 + '/' + now.getDate() + '/' + now.getFullYear()
          );
          laisuattext = 'Lãi suất: ' + laisuat + '%';
          const diffInTime = nowdmy.getTime() - ngaymodmy.getTime();
          const thoigiandagui = diffInTime / (1000 * 3600 * 24);
          thoigiandaguitext = 'Số ngày đã gửi tiết kiệm: ' + thoigiandagui;

          tongtiennhanduoc = Math.round(+sotiengui + +tienlai);
          tongtiennhanduoctext =
            'Tổng số tiền nhận được nếu rút đúng kỳ hạn: ' +
            tongtiennhanduoc +
            'VNĐ';

          tonglaitruockyhan = Math.round(
            +sotiengui * (+laisuatkhongkyhan / 100) * (+thoigiandagui / 360)
          );
          tonglaitruockyhantext =
            'Số tiền lãi nhận được nếu rút tiền hôm nay: ' +
            tonglaitruockyhan +
            'VNĐ';
          tongtiennhantruockyhan = sotiengui + tonglaitruockyhan;
          tongtiennhantruockyhantext =
            'Tổng số tiền nhận nếu rút tiền hôm nay: ' +
            tongtiennhantruockyhan +
            'VNĐ';

          this.setState({
            masotietkiem,
            ngaymo,
            ngaymotext,
            ngaydong,
            ngaydongtext,
            kyhan,
            kyhantext,
            laisuat,
            laisuattext,
            tienlai,
            tienlaitext,
            sotiengui,
            sotienguitext,
            thoigiandagui,
            thoigiandaguitext,
            laisuatkhongkyhan,
            laisuatkhongkyhantext,
            tongtiennhanduoc,
            tongtiennhanduoctext,
            tonglaitruockyhan,
            tonglaitruockyhantext,
            tongtiennhantruockyhan,
            tongtiennhantruockyhantext,
          });
        }
      });
    }
  }
  handleChangeMaOTP(event) {
    event.preventDefault();
    const maotp = event.target.value;
    debugger;
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
        console.log(res.data);
        const { valid } = res.data;
        debugger;
        if (valid === true) {
          const {
            masotietkiem,
            now,
            tonglaitruockyhan,
            tongtiennhantruockyhan,
          } = this.state;
          const thongtin = {
            id: masotietkiem,
            ngayruttien: now,
            tienlai: tonglaitruockyhan,
            tongtiennhantruockyhan,
            tinhtrang: 'Hoàn tất rút tiền',
            kyhan: 'Không kỳ hạn',
          };
          axios
            .post('http://localhost:9000/api/sotietkiem/ruttientietkiem', {
              thongtin,
            })
            .then((res) => {
              debugger;
              console.log('thong tin tao so tiet kiem');
              console.log(res.data);
              this.setState({
                xacthucotp: true,
                trangthaitaoso: 'Tạo sổ tiết kiệm thành công',
                showModal: false,
                sodutext: '',
              });
              // this.getDanhSachTaiKhoanThanhToan();
              alert('Chuyển khoản thành công');
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          debugger;

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
  }
  componentDidMount() {
    this.getDanhSachSoTietKiem();
    this.getDanhSachLaiSuat();
  }
  render() {
    const {
      ngaymotext,
      ngaydongtext,
      tienlaitext,
      laisuattext,
      kyhantext,
      sotienguitext,
      thoigiandaguitext,
      laisuatkhongkyhantext,
      tongtiennhanduoctext,
      tonglaitruockyhantext,
      tongtiennhantruockyhantext,
    } = this.state;
    return (
      <Container>
        <br></br>
        <h3>Rút tiền ???????????????</h3>
        <Row>
          <Col></Col>
          <Col>
            <Form>
              <Card>
                <Card.Header>Thông tin sổ tiết kiệm</Card.Header>
                <Card.Body>
                  <Form.Group>
                    <Card.Title>Chọn sổ tiết kiệm</Card.Title>
                    <Form.Control
                      as="select"
                      name="masotietkiem"
                      onChange={this.handleSelectSoTietKiem}
                    >
                      <option value="DEFAULT">Chọn sổ tiết kiệm</option>
                      {this.state.danhsachsotietkiem.map((sotietkiem) => (
                        <option value={sotietkiem.id}>{sotietkiem.id}</option>
                      ))}
                    </Form.Control>
                    <Form.Text>{sotienguitext}</Form.Text>
                    <Form.Text>{ngaymotext}</Form.Text>
                    <Form.Text>{ngaydongtext}</Form.Text>
                    <Form.Text>{kyhantext}</Form.Text>
                    <Form.Text>{laisuattext}</Form.Text>
                    <Form.Text>{tienlaitext}</Form.Text>
                    <Form.Text>{thoigiandaguitext}</Form.Text>
                    <Form.Text>{laisuatkhongkyhantext}</Form.Text>
                    <Form.Text>{tongtiennhanduoctext}</Form.Text>
                    <Form.Text>{tonglaitruockyhantext}</Form.Text>
                    <Form.Text>{tongtiennhantruockyhantext}</Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Button onClick={this.openModal}>Rút tiền </Button>
                  </Form.Group>
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
export default RutTienTietKiem;
