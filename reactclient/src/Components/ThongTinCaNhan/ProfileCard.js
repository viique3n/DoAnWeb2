import React, { Component } from 'react';
import decode from 'jwt-decode';
import axios from 'axios';
import {
  Card,
  Container,
  Button,
  Form,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import { renewAccessToken } from '../../Auth/AuthRoute';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      giaytoimg: null,
      tinhtrangcapnhat: '',
      tinhtrangupload: '',
      thongtingiayto: {},
      ngaycap: '',
      magiayto: '',
      giaytourl: '',
      magiaytoerror: '',
      thongtincapnhaterror: '',
      tinhtrangxacthuc: '',
    };
    this.handleChangeFileSelect = this.handleChangeFileSelect.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.handleChangeNgayCap = this.handleChangeNgayCap.bind(this);
    this.handleChangeMaGiayTo = this.handleChangeMaGiayTo.bind(this);
    this.handleCapNhatThongTin = this.handleCapNhatThongTin.bind(this);
  }
  //#region function
  getThongTinCaNhan() {
    const token = sessionStorage.getItem('jwtToken');
    const decoded = decode(token).data;
    if (decoded.tinhtrang === 'Đã xác thực') {
      this.setState(
        {
          user: decoded,
          tinhtrangxacthuc: '',
        },
        () => {
          this.getThongTinGiayToTuyThan();
        }
      );
    } else if (decoded.tinhtrang === 'Chưa xác thực') {
      this.setState(
        {
          user: decoded,
          tinhtrangxacthuc:
            'Vui lòng cập nhật thông tin giấy tờ tùy thân để thực hiện xác thực tài khoản',
        },
        () => {
          this.getThongTinGiayToTuyThan();
        }
      );
    }
  }
  getThongTinGiayToTuyThan() {
    debugger;
    const { sodienthoai } = this.state.user;
    if (sodienthoai) {
      axios('https://ibnodeserver.herokuapp.com/api/giayto/getthongtingiayto', {
        params: { sodienthoai },
      })
        .then((res) => {
          debugger;
          const giayto = res.data;
          const { tinhtrang } = this.state.user;
          if (tinhtrang === 'Đã xác thực') {
            this.setState({
              thongtingiayto: giayto,
              tinhtrangxacthuc: '',
            });
          } else if (tinhtrang === 'Chưa xác thực') {
            this.setState({
              thongtingiayto: giayto,
              tinhtrangxacthuc:
                'Đang đợi xác thực, nếu trong 24 giờ chưa nhận được thông tin vui lòng liên hệ ngân hàng qua email ...@...com',
            });
          }
        })
        .catch((err) => {
          debugger;
          this.setState({
            thongtingiayto: {},
          });
        });
    }
  }
  fileUpload(file) {
    const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.post(url, formData, config).then((res) => {
      console.log(res.data);
      this.setState({
        tinhtrangupload: 'Upload thành công, vui lòng ',
      });
    });
  }
  renderFormGiayToTuyThan() {
    debugger;
    const { thongtingiayto } = this.state;
    if (thongtingiayto.magiayto) {
      const giaytourl =
        'https://ibnodeserver.herokuapp.com/' + thongtingiayto.hinhanhurl;
      return (
        <Card border="info">
          <Card.Title>Thông tin giấy tờ tùy thân</Card.Title>
          <Card.Text>Mã giấy tờ: {thongtingiayto.magiayto}</Card.Text>
          <Card.Text>Ngày cấp: {thongtingiayto.ngaycap}</Card.Text>
          <Image
            style={{ width: '400px', height: '200px' }}
            src={giaytourl}
          ></Image>
          <Image></Image>
        </Card>
      );
    } else {
      return (
        <Form>
          <h3>Cập nhật thông tin giấy tờ tùy thân</h3>
          <Form.Label>Mã giấy tờ</Form.Label>
          <Form.Control
            type="text"
            onChange={this.handleChangeMaGiayTo}
          ></Form.Control>
          <Form.Text>{this.state.magiaytoerror}</Form.Text>
          <Form.Label>Chọn ngày cấp</Form.Label>
          <Form.Control
            type="date"
            onChange={this.handleChangeNgayCap}
          ></Form.Control>
          {/* <input type="file" onChange={this.handleChangeFileSelect} />
        <Button onClick={this.handleUploadFile}>Upload</Button> */}
          <Form.File
            label="Upload ảnh giấy tờ tùy thân"
            onChange={this.handleChangeFileSelect}
          ></Form.File>
          {this.renderImage()}
          <br />
          <Button onClick={this.handleCapNhatThongTin}>
            Cập nhật thông tin
          </Button>
          <Form.Text>{this.state.thongtincapnhaterror}</Form.Text>
          <Row>
            <Col></Col>
          </Row>
        </Form>
      );
    }
  }
  renderImage() {
    if (this.state.giaytourl) {
      return (
        <Image
          style={{ width: '400px', height: '200px' }}
          src={this.state.giaytourl}
        ></Image>
      );
    }
  }
  //#endregion

  //#region EventHandler
  handleChangeFileSelect(event) {
    const immg = event.target.files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(immg);
    debugger;
    reader.onloadend = async (e) => {
      const rs = await reader.result;
      this.setState({
        giaytourl: rs,
      });
    };
    console.log(url);
    debugger;
    this.setState({
      giaytoimg: event.target.files[0],
    });
  }
  handleUploadFile(event) {
    const url = 'https://ibnodeserver.herokuapp.com/api/giayto/taogiayto';
    const formData = new FormData();
    formData.append('giayto', this.state.giaytoimg);
    debugger;
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios
      .post(url, formData, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });
  }
  handleChangeNgayCap(event) {
    event.preventDefault();
    const ngaycap = event.target.value;
    this.setState({
      ngaycap,
    });
  }
  handleChangeMaGiayTo(event) {
    event.preventDefault();
    const reg = /[^A-Za-z0-9]+/g;
    const magiayto = event.target.value;
    if (reg.test(magiayto) === true) {
      this.setState({
        magiaytoerror: 'Mã giấy tờ chứa ký tự không hợp lệ',
      });
      return;
    }
    this.setState({
      magiayto,
      magiaytoerror: '',
    });
  }
  handleCapNhatThongTin(event) {
    event.preventDefault();
    const { magiayto, ngaycap } = this.state;
    let { giaytoimg } = this.state;
    debugger;
    if (magiayto === '') {
      this.setState({
        thongtincapnhaterror: 'Vui lòng nhập mã giấy tờ',
      });
      return;
    } else if (ngaycap === '') {
      this.setState({
        thongtincapnhaterror: 'Vui lòng chọn ngày cấp',
      });
      return;
    } else if (giaytoimg === null) {
      this.setState({
        thongtincapnhaterror: 'Vui lòng upload ảnh giấy tờ',
      });
      return;
    }
    this.setState({
      thongtincapnhaterror: '',
    });
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const urlTaoGiayTo =
      'https://ibnodeserver.herokuapp.com/api/giayto/taothongtingiayto';
    const urlUploadAnh =
      'https://ibnodeserver.herokuapp.com/api/giayto/uploadanhgiayto';
    const name =
      this.state.user.sodienthoai + '.' + giaytoimg.name.split('.')[1];
    giaytoimg = new File([giaytoimg], name, { type: giaytoimg.type });
    // const ext = giaytoimg.name.split('.')[1];
    // debugger;

    // giaytoimg.name = name + '.' + ext;
    debugger;
    const formData = new FormData();
    formData.append('giayto', giaytoimg);
    const thongtin = {
      magiayto,
      ngaycap,
      loaigiaytoId: 1,
      khachhangSodienthoai: this.state.user.sodienthoai,
    };
    // formData.append('thongtinimg', thongtin);
    axios
      .post(urlTaoGiayTo, { thongtin })
      .then((res) => {
        debugger;
        const test = res.data;
        this.setState({
          tinhtrangcapnhat: 'Cập nhật thông tin giấy tờ thành công',
        });
        axios
          .post(urlUploadAnh, formData, config)
          .then((res) => {
            debugger;
            const tes = res.data;
            console.log(res.data);
            this.setState({
              tinhtrangupload: 'Upload ảnh giấy tờ thành công',
            });
            this.getThongTinCaNhan();
          })
          .catch((err) => {
            this.setState({
              tinhtrangupload: 'Upload ảnh giấy tờ thất bại ',
            });
            debugger;
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          tinhtrangcapnhat: 'Cập nhật thông tin giấy tờ thất bại',
        });
        debugger;
      });
  }

  //#endregion

  //#region ComponentLifeCircle
  componentDidMount() {
    this.getThongTinCaNhan();
    // this.getThongTinGiayToTuyThan();
  }
  //#endregion
  render() {
    const { email, sodienthoai, tenhienthi, tinhtrang } = this.state.user;
    return (
      <Container>
        <br />
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Thông tin khách hàng</Card.Title>
                <Card.Text className="mb-2 text-muted">
                  Email: {email}
                </Card.Text>
                <Card.Text className="mb-2 text-muted">
                  Số điện thoại: {sodienthoai}
                </Card.Text>
                <Card.Text className="mb-2 text-muted">
                  Tên khách hàng: {tenhienthi}
                </Card.Text>
                <Card.Text className="mb-2 text-muted">
                  Tình trạng: {tinhtrang}
                </Card.Text>
                <Card.Subtitle>{this.state.tinhtrangxacthuc}</Card.Subtitle>
              </Card.Body>
            </Card>
            {/* <input type="file" onChange={this.handleChangeFileSelect} />
        <Button onClick={this.handleUploadFile}>Upload</Button> */}
          </Col>
          <Col>{this.renderFormGiayToTuyThan()}</Col>
        </Row>
      </Container>
    );
  }
}
export default ProfileCard;
