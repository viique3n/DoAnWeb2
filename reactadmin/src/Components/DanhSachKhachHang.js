import React, { Component } from 'react';
import { renewAccessToken } from '../Auth/AuthRoute';
import {
  Container,
  Table,
  Button,
  ButtonGroup,
  Form,
  Col,
  Row,
  Modal,
  Image,
} from 'react-bootstrap';
import axios from 'axios';

class DanhSachKhachHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tinhtrang: '',
      tukhoa: '',
      loaitimkiem: 'Email',
      danhsachkhachhang: [],
      khachhangmoixoa: [],
      isAuthenticated: true,
      showModal: false,
      magiayto: '',
      ngaycap: '',
      hinhanhurl: '',
      tinhtrangkhachhangdangchon: '',
      sodienthoaikhachhangdangchon: '',
      capnhaterror: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSelectLoaiTimKiemChange = this.handleSelectLoaiTimKiemChange.bind(
      this
    );
    this.handleSelectTinhTrangChange = this.handleSelectTinhTrangChange.bind(
      this
    );
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //#region function
  getDanhSachKhachHang(filter) {
    axios('http://localhost:9000/api/admin/thongtinkhachhang', {
      params: { filter },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          danhsachkhachhang: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  openModal(event) {
    const sodienthoai = event.target.dataset.khsodienthoai;
    const tinhtrang = event.target.dataset.tinhtrang;
    this.setState({
      tinhtrangkhachhangdangchon: tinhtrang,
      sodienthoaikhachhangdangchon: sodienthoai,
    });
    debugger;
    const test = this.state;

    axios
      .get('http://localhost:9000/api/admin/thongtinkhachhanggiaytotuythan', {
        params: {
          sodienthoai,
        },
      })
      .then((res) => {
        const giayto = res.data;
        this.setState({
          ngaycap: giayto.ngaycap,
          hinhanhurl: 'http://localhost:9000/' + giayto.hinhanhurl,
          magiayto: giayto.magiayto,
        });
        debugger;
      })
      .catch((err) => {
        this.setState({
          ngaycap: 'Khách hàng chưa cung cấp thông tin',
          hinhanhurl: '',
          magiayto: 'Khách hàng chưa cung cấp thông tin',
        });
        if (err.response) {
          console.log(`Lỗi: ${err.response.data}`);
        }
      });

    this.setState({
      showModal: true,
    });
  }
  closeModal() {
    this.setState({
      ngaycap: '',
      hinhanhurl: '',
      magiayto: '',
      showModal: false,
      capnhaterror: '',
    });
  }
  //#endregion

  //#region render table
  renderTableHeader() {
    return (
      <tr>
        <th>Số điện thoại</th>
        <th>Email</th>
        <th>Tên hiển thị</th>
        <th>Tình trạng</th>
        <th style={{ textAlign: 'center' }}>Xác thực</th>
        {/* <th>Hủy xác thực</th>
        <th>Khóa</th>
        <th>Xóa</th> */}
      </tr>
    );
  }
  renderTable() {
    return this.state.danhsachkhachhang.map((khachhang) => {
      const { email, sodienthoai, tinhtrang, tenhienthi } = khachhang;
      let c = 'black';
      if (tinhtrang === 'Đã xác thực') {
        c = 'blue';
      } else if (tinhtrang === 'Chưa xác thực') {
        c = 'orange';
      } else if (tinhtrang === 'Đã khóa') {
        c = 'orange';
      } else if (tinhtrang === 'Đã xóa') {
        c = 'red';
      }
      return (
        <tr key={sodienthoai}>
          <td>{sodienthoai}</td>
          <td>{email}</td>
          <td>{tenhienthi}</td>
          <td style={{ color: c }}>{tinhtrang}</td>
          <td>
            <ButtonGroup>
              <Button
                style={{ border: 'none' }}
                variant="outline-primary"
                onClick={this.openModal}
                data-khsodienthoai={khachhang.sodienthoai}
                data-tinhtrang="Đã xác thực"
              >
                Xác thực
              </Button>
              <Button
                style={{ border: 'none' }}
                variant="outline-warning"
                onClick={this.openModal}
                data-khsodienthoai={khachhang.sodienthoai}
                data-tinhtrang="Chưa xác thực"
              >
                Hủy xác thực
              </Button>
              <Button
                style={{ border: 'none' }}
                variant="outline-warning"
                onClick={this.openModal}
                data-khsodienthoai={khachhang.sodienthoai}
                data-tinhtrang="Đã khóa"
              >
                Khoá
              </Button>
              <Button
                style={{ border: 'none' }}
                variant="outline-danger"
                onClick={this.openModal}
                data-khsodienthoai={khachhang.sodienthoai}
                data-tinhtrang="Đã xóa"
              >
                Xóa
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
  }
  renderHinhAnhGiayTo() {
    const { hinhanhurl } = this.state;
    if (hinhanhurl) {
      return (
        <Image
          style={{ width: '270px', height: '135px' }}
          src={this.state.hinhanhurl}
        ></Image>
      );
    }
    return (
      <Form.Text>Hình ảnh giấy tờ chưa được khách hàng cung cấp</Form.Text>
    );
  }
  //#endregion

  //#region handle filter
  handleSelectTinhTrangChange = (event) => {
    debugger;
    // this.setState({ tinhtrang: event.target.value });
    const index = event.target.selectedIndex;
    let tinhtrang = event.target[index].text;
    if (tinhtrang === 'Tất cả') {
      tinhtrang = '';
    }
    this.setState({
      tinhtrang,
    });
    const filter = {
      tinhtrang,
    };
    this.getDanhSachKhachHang(filter);
  };
  handleSelectLoaiTimKiemChange = (event) => {
    debugger;
    const index = event.target.selectedIndex;
    let loaitimkiem = event.target[index].text;
    const tukhoa = this.state.tukhoa;

    let filter;
    if (loaitimkiem === 'Tên hiển thị') {
      filter = { tenhienthi: tukhoa };
    } else if (loaitimkiem === 'Email') {
      filter = { email: tukhoa };
    } else if (loaitimkiem === 'Số điện thoại') {
      filter = { sodienthoai: tukhoa };
    } else {
      filter = { error: '' };
    }
    this.setState({ loaitimkiem });
  };

  handleSearchChange = (event) => {
    const tukhoa = event.target.value;
    this.setState({ tukhoa });
    // const filter
  };

  handleSearchSubmit = (event) => {
    debugger;
    const loaitimkiem = this.state.loaitimkiem;
    const tinhtrang = this.state.tinhtrang;
    const tukhoa = this.state.tukhoa;
    let filter;
    if (loaitimkiem === 'Email') {
      filter = {
        email: tukhoa,
        tinhtrang: tinhtrang,
      };
    } else if (loaitimkiem === 'Số điện thoại') {
      filter = {
        sodienthoai: tukhoa,
        tinhtrang: tinhtrang,
      };
    } else if (loaitimkiem === 'Tên hiển thị') {
      filter = {
        tenhienthi: tukhoa,
        tinhtrang: tinhtrang,
      };
    }
    this.getDanhSachKhachHang(filter);
  };
  //#endregion

  //#region handleTableButton
  handleSubmit(event) {
    const sodienthoai = this.state.sodienthoaikhachhangdangchon;
    const tinhtrang = this.state.tinhtrangkhachhangdangchon;
    const test = this.state;
    debugger;
    const { ngaycap, magiayto, hinhanhurl } = this.state;
    if (tinhtrang === 'Đã xác thực') {
      if (magiayto === '') {
        this.setState({
          capnhaterror: 'Mã giấy tờ không hợp lệ, không thể tiến hành xác thực',
        });
        return;
      }
      if (hinhanhurl === '') {
        this.setState({
          capnhaterror:
            'Hình ảnh giấy tờ không hợp lệ, không thể tiến hành xác thực',
        });
        return;
      }
      if (ngaycap === '') {
        this.setState({
          capnhaterror:
            'Thông tin ngày cấp không hợp lệ, không thể tiến hành xác thực',
        });
        return;
      }
    }

    axios
      .put('http://localhost:9000/api/admin/capnhattinhtrangkhachhang', {
        sodienthoai,
        tinhtrang,
      })
      .then((res) => {
        alert('Cập nhật tình trạng thành công');

        // const loaitimkiem = this.state.loaitimkiem;
        // const tinhtrang = this.state.tinhtrang;
        // const tukhoa = this.state.tukhoa;
        const { loaitimkiem, tinhtrang, tukhoa } = this.state;
        let filter;
        if (loaitimkiem === 'Email') {
          filter = {
            email: tukhoa,
            tinhtrang: tinhtrang,
          };
        } else if (loaitimkiem === 'Số điện thoại') {
          filter = {
            sodienthoai: tukhoa,
            tinhtrang: tinhtrang,
          };
        } else if (loaitimkiem === 'Tên hiển thị') {
          filter = {
            tenhienthi: tukhoa,
            tinhtrang: tinhtrang,
          };
        }
        this.setState({
          khachhangmoixoa: res.data,
          showModal: false,
        });
        this.getDanhSachKhachHang(filter);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  capNhatThongTinKhachHang(khachhang) {}
  //#endregion

  //#region component lifecircle
  componentDidMount() {
    const filter = { tinhtrang: '' };
    this.getDanhSachKhachHang(filter);
  }
  //#endregion

  //#region render
  render() {
    return (
      <Container>
        <br></br>
        <Form>
          <Row>
            <Col>
              <Row>
                <Form.Label column sm={4}>
                  Tình trạng
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    name="tinhtrang"
                    defaultValue={'DEFAULT'}
                    onChange={this.handleSelectTinhTrangChange}
                  >
                    <option value="DEFAULT">Tất cả</option>
                    <option value="chuaxacthuc">Chưa xác thực</option>
                    <option value="daxacthuc">Đã xác thực</option>
                    <option value="dakhoa">Đã khóa</option>
                  </Form.Control>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Form.Label column sm={4}>
                  Lọc theo
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    defaultValue={'DEFAULT'}
                    className="khachhangSelect"
                    onChange={this.handleSelectLoaiTimKiemChange}
                  >
                    <option value="DEFAULT">Email</option>
                    <option value="tenhienthi">Tên hiển thị</option>
                    <option value="sodienthoai">Số điện thoại</option>
                  </Form.Control>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Form.Control
                    sm={8}
                    type="text"
                    onChange={this.handleSearchChange}
                  ></Form.Control>
                </Col>
                <Col sm={4}>
                  <Button onClick={this.handleSearchSubmit}>Filter</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <br></br>
        {/* <table id="khachhang">
            <tbody>
              {this.renderTableHeader()}
              {this.renderTable()}
            </tbody>
          </table> */}
        <Table bordered>
          {this.renderTableHeader()}
          <tbody>{this.renderTable()}</tbody>
        </Table>
        <Modal size="sm" show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin giấy tờ tùy thân</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Text>Mã giấy tờ: {this.state.magiayto}</Form.Text>
            <Form.Text>Ngày cấp: {this.state.ngaycap}</Form.Text>
            {this.renderHinhAnhGiayTo()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
            <Button onClick={this.handleSubmit}>Xác nhận</Button>
            <Form.Text style={{ color: 'red' }}>
              {this.state.capnhaterror}
            </Form.Text>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
  //#endregion
}
export default DanhSachKhachHang;
