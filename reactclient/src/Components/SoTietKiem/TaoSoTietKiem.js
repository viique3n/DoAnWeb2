//#region import
import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { renewAccessToken } from '../../Auth/AuthRoute';
import { Form, Button, Col, Row, Card, Modal } from 'react-bootstrap';
//#endregion

class TaoSoTietKiem extends Component {
  //#region constructor
  constructor(props) {
    super(props);
    //#region state
    this.state = {
      email: '',
      mataikhoanthanhtoan: '',
      sodu: 0,
      sodutext: '',
      ngaymo: '',
      ngaydong: '',
      ngaydongtext: '',
      sotiensautietkiem: 0,
      sotiensautietkiemtext: '',
      hinhthuctralai: '',
      hinhthuctralaiId: '',
      showModal: false,
      danhsachtaikhoanthanhtoan: [],
      danhsachkyhan: [],
      danhsachlaisuat: [],
      kyhan: '',
      laisuatId: '',
      laisuat: '',
      laisuattext: '',
      sotiengui: '',
      sotienguitemp: '', // Lưu số tiền gửi kể cả khi không hợp lệ
      sotienguierrors: '',
      tienlai: 0,
      tienlaitext: '',
      secret: '',
      maotp: '',
      xacthucotp: false,
      thoigianotpm: 0,
      thoigianotps: 0,
      hethan: true,
      xacnhantaosoerror: '',
      trangthaitaoso: '',
    };
    //#endregion

    //#region eventHandler
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
    //#endregion
  }
  //#endregion

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
      const { email } = this.state;
      axios
        .post('http://localhost:9000/api/totp/totp-secret')
        .then((res) => {
          secret = res.data.secret;
          axios
            .post('http://localhost:9000/api/totp/totp-generate', {
              secret,
              email,
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
    const decoded = jwt_decode(token).data;
    const { sodienthoai, email } = decoded;
    this.setState({
      email,
    });
    axios('http://localhost:9000/api/taikhoan/getdanhsachtaikhoanthanhtoan', {
      params: { khachhangSodienthoai: sodienthoai },
    })
      .then((res) => {
        debugger;
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
  addWeeks(date, weeks) {
    return new Date(date.setDate(date.getDate() + weeks * 7));
  }
  addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }
  tinhTienLai(sotiengui, laisuat, kyhan) {
    debugger;
    if (kyhan) {
      return parseInt(+sotiengui * (+laisuat / 100) * (+kyhan / 360));
    }
  }
  //#endregion

  //#region EventHandler
  handleOnChangeSoTienGuiTietKiem(event) {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    event.preventDefault();
    if (isNaN(event.target.value)) {
      this.setState({
        sotiengui: '',
        sotienguierrors: 'Số tiền gửi không hợp lệ',
        sotienguitemp: '',
        laisuat: '',
        laisuatId: '',
        laisuattext: '',
        sotiensautietkiem: '',
        sotiensautietkiemtext: '',
        tienlai: 0,
        tienlaitext: '',
      });
      return;
    }

    const sotiengui = event.target.value;
    if (+sotiengui < 3000000) {
      this.setState({
        sotiengui: '',
        sotienguitemp: '',
        sotienguierrors: 'Số tiền gửi tối thiểu phải lớn hơn 3 triệu đồng',
        laisuat: '',
        laisuatId: '',
        laisuattext: '',
        sotiensautietkiem: '',
        sotiensautietkiemtext: '',
        tienlai: 0,
        tienlaitext: '',
      });
      return;
    } else if (+sotiengui % 50000 !== 0) {
      this.setState({
        sotiengui: '',
        sotienguitemp: '',
        sotienguierrors:
          'Số tiền gửi không hợp lệ, yêu cầu số tiền phải chia hết cho 50 nghìn đồng',
        laisuat: '',
        laisuatId: '',
        laisuattext: '',
        sotiensautietkiem: '',
        sotiensautietkiemtext: '',
        tienlai: 0,
        tienlaitext: '',
      });
      return;
    } else if (+sotiengui > +this.state.sodu) {
      this.setState({
        sotiengui: '',
        sotienguitemp: sotiengui,
        sotienguierrors:
          'Số tiền gửi tiết kiệm lớn hơn số tiền trong tài khoản thanh toán, vui lòng nhập số tiền thấp hơn',
        laisuat: '',
        laisuatId: '',
        laisuattext: '',
        sotiensautietkiem: '',
        sotiensautietkiemtext: '',
        tienlai: 0,
        tienlaitext: '',
      });
      return;
    } else {
      const { danhsachlaisuat, kyhan } = this.state;
      if (kyhan === 'DEFAULT' || kyhan === '') {
        this.setState({
          sotiengui,
          sotienguitemp: '',
          laisuat: '',
          laisuatId: '',
          laisuattext: '',
          ngaydong: '',
          ngaydongtext: '',
          tienlai: 0,
          tienlaitext: '',
          sotiensautietkiem: '',
          sotiensautietkiemtext: '',
          sotienguierrors: '',
        });
        return;
      }
      let ls;
      let lsId;
      let kyhand;
      const splKyHan = kyhan.split(' ');
      if (splKyHan[1] === 'tuần') {
        kyhand = splKyHan[0] * 7;
      } else if (splKyHan[1] === 'tháng') {
        kyhand = splKyHan[0] * 30;
      }
      debugger;
      danhsachlaisuat.map((laisuat) => {
        debugger;
        if (
          +sotiengui >= +laisuat.muctientoithieu &&
          +sotiengui < +laisuat.muctientoida &&
          laisuat.kyhan === kyhan
        ) {
          ls = laisuat.laisuat;
          lsId = laisuat.id;
        } else if (
          +sotiengui >= +laisuat.muctientoithieu &&
          +laisuat.muctientoida === -1 &&
          laisuat.kyhan === kyhan
        ) {
          ls = laisuat.laisuat;
          lsId = laisuat.id;
        }
      });
      debugger;
      let tienlai, tienlaitext, sotiensautietkiem, sotiensautietkiemtext;
      tienlai = this.tinhTienLai(sotiengui, ls, kyhand);
      tienlaitext = `Tiền lãi sau tiết kiệm: ${tienlai}`;
      sotiensautietkiem = +sotiengui + +tienlai;
      sotiensautietkiemtext = `Số tiền sau khi hoàn tất kỳ hạn tiết kiệm: ${sotiensautietkiem}`;
      this.setState({
        sotiengui,
        sotienguitemp: '',
        laisuat: ls,
        laisuatId: lsId,
        laisuattext: 'Lãi suất: ' + ls + '%',
        sotienguierrors: '',
        tienlai,
        tienlaitext,
        sotiensautietkiem,
        sotiensautietkiemtext,
      });
    }
  }
  handleSelectMaTaiKhoanGoc(event) {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    event.preventDefault();
    const mataikhoanthanhtoan = event.target.value;
    if (mataikhoanthanhtoan === 'DEFAULT') {
      this.setState({
        mataikhoanthanhtoan: '',
        sodu: 0,
        sodutext: '',
        laisuat: '',
        laisuatId: '',
        laisuattext: '',
        sotienguierrors: '',
        tienlai: 0,
        tienlaitext: '',
        sotiensautietkiem: '',
        sotiensautietkiemtext: '',
      });
      return;
    }

    const { danhsachtaikhoanthanhtoan, kyhan, sotiengui } = this.state;
    let kyhand;
    const splKyHan = kyhan.split(' ');
    if (splKyHan[1] === 'tuần') {
      kyhand = splKyHan[0] * 7;
    } else if (splKyHan[1] === 'tháng') {
      kyhand = splKyHan[0] * 30;
    }
    danhsachtaikhoanthanhtoan.map((taikhoan) => {
      if (taikhoan.mataikhoan === mataikhoanthanhtoan) {
        if (+this.state.sotiengui > +taikhoan.sodu) {
          debugger;
          this.setState({
            sotienguierrors:
              'Số tiền gửi tiết kiệm lớn hơn số tiền trong tài khoản thanh toán, vui lòng nhập số tiền thấp hơn',
            laisuat: '',
            laisuatId: '',
            laisuattext: '',
            tienlai: '',
            tienlaitext: '',
            sotiensautietkiem: '',
            sotiensautietkiemtext: '',
            mataikhoanthanhtoan,
            sodu: taikhoan.sodu,
            sodutext: 'Số dư: ' + taikhoan.sodu + ' ' + taikhoan.donvitiente,
          });
          return;
        } else if (
          !this.sotiengui &&
          +this.state.sotienguitemp > +taikhoan.sodu
        ) {
          debugger;
          this.setState({
            sotienguierrors:
              'Số tiền gửi tiết kiệm lớn hơn số tiền trong tài khoản thanh toán, vui lòng nhập số tiền thấp hơn',
            laisuat: '',
            laisuatId: '',
            laisuattext: '',
            tienlai: '',
            tienlaitext: '',
            sotiensautietkiem: '',
            sotiensautietkiemtext: '',
            mataikhoanthanhtoan,
            sodu: taikhoan.sodu,
            sodutext: 'Số dư: ' + taikhoan.sodu + ' ' + taikhoan.donvitiente,
          });
          return;
        } else {
          const { danhsachlaisuat } = this.state;
          if (kyhan === 'DEFAULT') {
            this.setState({
              laisuat: '',
              laisuatId: '',
              laisuattext: '',
              ngaydong: '',
              ngaydongtext: '',
              tienlai: 0,
              tienlaitext: '',
              sotiensautietkiem: '',
              sotiensautietkiemtext: '',
            });
            return;
          }
          const { sotienguitemp } = this.state;
          let ls;
          let lsId;
          if (sotiengui !== '') {
            danhsachlaisuat.map((laisuat) => {
              if (
                +sotiengui >= +laisuat.muctientoithieu &&
                +sotiengui < +laisuat.muctientoida &&
                laisuat.kyhan === kyhan
              ) {
                ls = laisuat.laisuat;
                lsId = laisuat.id;
              } else if (
                +sotiengui >= +laisuat.muctientoithieu &&
                +laisuat.muctientoida === -1 &&
                laisuat.kyhan === kyhan
              ) {
                ls = laisuat.laisuat;
                lsId = laisuat.id;
              }
            });
          } else if (sotienguitemp !== '') {
            danhsachlaisuat.map((laisuat) => {
              if (
                +sotienguitemp >= +laisuat.muctientoithieu &&
                +sotienguitemp < +laisuat.muctientoida &&
                laisuat.kyhan === kyhan
              ) {
                ls = laisuat.laisuat;
                lsId = laisuat.id;
              } else if (
                +sotienguitemp >= +laisuat.muctientoithieu &&
                +laisuat.muctientoida === -1 &&
                laisuat.kyhan === kyhan
              ) {
                ls = laisuat.laisuat;
                lsId = laisuat.id;
              }
            });
          }
          debugger;
          if (sotiengui === '' && sotienguitemp === '') {
            this.setState({
              sotiengui,
              sotienguierrors: '',
              mataikhoanthanhtoan,
              sodu: taikhoan.sodu,
              sodutext: 'Số dư: ' + taikhoan.sodu + ' ' + taikhoan.donvitiente,
            });
            return;
          }
          // sotiengui = sotienguitemp;

          let tienlai, tienlaitext, sotiensautietkiem, sotiensautietkiemtext;
          tienlai = this.tinhTienLai(sotiengui, ls, kyhand);
          tienlaitext = `Tiền lãi sau tiết kiệm: ${tienlai}`;
          sotiensautietkiem = +sotiengui + +tienlai;
          sotiensautietkiemtext = `Số tiền sau khi hoàn tất kỳ hạn tiết kiệm: ${sotiensautietkiem}`;

          this.setState({
            sotiengui,
            laisuat: ls,
            laisuatId: lsId,
            laisuattext: 'Lãi suất: ' + ls + '%',
            sotienguierrors: '',
            mataikhoanthanhtoan,
            sodu: taikhoan.sodu,
            sodutext: 'Số dư: ' + taikhoan.sodu + ' ' + taikhoan.donvitiente,
            tienlai,
            tienlaitext,
            sotiensautietkiem,
            sotiensautietkiemtext,
          });
        }
      }
    });
  }
  handleSelectKyHan(event) {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    event.preventDefault();
    const kyhan = event.target.value;
    if (kyhan === 'DEFAULT') {
      this.setState({
        laisuat: '',
        laisuatId: '',
        laisuattext: '',
        ngaydong: '',
        ngaydongtext: '',
        tienlai: 0,
        tienlaitext: '',
        sotiensautietkiem: '',
        sotiensautietkiemtext: '',
        kyhan: '',
      });
      return;
    }
    const { sotiengui, danhsachlaisuat, sotienguierrors } = this.state;
    debugger;
    const now = new Date();
    let ngaydong;
    let ngaydongtext;
    let kyhand;
    const splKyHan = kyhan.split(' ');
    if (splKyHan[1] === 'tuần') {
      ngaydong = this.addWeeks(now, +splKyHan[0]);
      kyhand = splKyHan[0] * 7;
      ngaydongtext = `Ngày đóng thẻ: ${ngaydong.getDate()}/${
        ngaydong.getMonth() + 1
      }/${ngaydong.getFullYear()}`;
    } else if (splKyHan[1] === 'tháng') {
      ngaydong = this.addMonths(now, splKyHan[0]);
      kyhand = splKyHan[0] * 30;
      ngaydongtext = `Ngày đóng thẻ: ${ngaydong.getDate()}/${
        ngaydong.getMonth() + 1
      }/${ngaydong.getFullYear()}`;
    }

    if (sotiengui === '') {
      this.setState({
        laisuat: '',
        laisuatId: '',
        laisuattext: '',
        sotiensautietkiem: '',
        sotiensautietkiemtext: '',
        tienlai: '',
        tienlaitext: '',
        kyhan,
        ngaydong,
        ngaydongtext,
      });
      return;
    }

    let ls;
    let lsId;
    danhsachlaisuat.map((laisuat) => {
      if (
        +sotiengui >= +laisuat.muctientoithieu &&
        +sotiengui < +laisuat.muctientoida &&
        laisuat.kyhan === kyhan
      ) {
        ls = laisuat.laisuat;
        lsId = laisuat.id;
      } else if (
        +sotiengui >= +laisuat.muctientoithieu &&
        +laisuat.muctientoida === -1 &&
        laisuat.kyhan === kyhan
      ) {
        ls = laisuat.laisuat;
        lsId = laisuat.id;
      }
    });

    let tienlai, tienlaitext, sotiensautietkiem, sotiensautietkiemtext;
    tienlai = this.tinhTienLai(sotiengui, ls, kyhand);
    tienlaitext = `Tiền lãi sau tiết kiệm: ${tienlai}`;
    sotiensautietkiem = +sotiengui + +tienlai;
    sotiensautietkiemtext = `Số tiền sau khi hoàn tất kỳ hạn tiết kiệm: ${sotiensautietkiem}`;
    debugger;
    this.setState({
      sotiengui,
      laisuat: ls,
      laisuatId: lsId,
      laisuattext: 'Lãi suất: ' + ls + '%',
      sotienguierrors: '',
      kyhan,
      ngaydong,
      ngaydongtext,
      tienlai,
      tienlaitext,
      sotiensautietkiem,
      sotiensautietkiemtext,
    });
  }
  handleSelectHinhThucTraLai(event) {
    const renew = this.renewAcess;
    if (renew === false) {
      return;
    }
    event.preventDefault();
    debugger;
    const hinhthuctralai = event.target.value;
    if (hinhthuctralai === 'DEFAULT') {
      this.setState({
        hinhthuctralai: '',
        hinhthuctralaiId: '',
      });
    } else {
      this.setState({
        hinhthuctralai,
        hinhthuctralaiId: hinhthuctralai,
      });
    }
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
        debugger;
        if (valid === true) {
          let token = sessionStorage.getItem('refreshToken');
          token = sessionStorage.getItem('jwtToken');
          const decoded = jwt_decode(token).data;
          const { sodienthoai } = decoded;
          const {
            ngaydong,
            sotiengui,
            kyhan,
            tienlai,
            laisuat,
            laisuatId,
            mataikhoanthanhtoan,
            hinhthuctralaiId,
          } = this.state;
          const sotietkiem = {
            ngaymo: new Date(),
            ngaydong,
            sotiengui,
            kyhan,
            tienlai,
            laisuatId,
            laisuat,
            taikhoanthanhtoanMataikhoan: mataikhoanthanhtoan,
            khachhangSodienthoai: sodienthoai,
            hinhthuctralaiId,
          };
          axios
            .post('http://localhost:9000/api/sotietkiem/taosotietkiem', {
              sotietkiem,
            })
            .then((res) => {
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
      <Row>
        <Col>
          <img src="http://localhost:9000/images/BingW06.jpg"></img>
        </Col>
        <Col>
          <br />
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
                  <Form.Text>{this.state.ngaydongtext}</Form.Text>
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
                  <Form.Text>{this.state.tienlaitext}</Form.Text>
                  <Form.Text>{this.state.sotiensautietkiemtext}</Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Hình thức trả lãi</Form.Label>
                  <Form.Control
                    as="select"
                    name="hinhthuctralai"
                    onChange={this.handleSelectHinhThucTraLai}
                  >
                    <option value="DEFAULT">Chọn hình thức trả lãi</option>
                    <option value="1">Lãi nhập gốc</option>
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
                <Form.Text style={{ color: 'red' }}>
                  {this.state.xacnhantaosoerror}
                </Form.Text>
                <Form.Text>{this.state.trangthaitaoso}</Form.Text>
              </Card.Body>
              <Modal size="sm" show={this.state.showModal} onHide={this.close}>
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
    );
  }
  //#endregion
}
export default TaoSoTietKiem;
