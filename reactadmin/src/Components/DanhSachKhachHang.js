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
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSelectLoaiTimKiemChange = this.handleSelectLoaiTimKiemChange.bind(
      this
    );
    this.handleSelectTinhTrangChange = this.handleSelectTinhTrangChange.bind(
      this
    );
  }
  //#region get danh sách khách hàng
  getDanhSachKhachHang(filter) {
    const token = sessionStorage.getItem('refreshToken');
    const isValidToken = renewAccessToken(token);
    if (isValidToken === false) {
      return;
    }

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
                onClick={this.handleTableUpdateButtonClick}
                data-khsodienthoai={khachhang.sodienthoai}
                data-tinhtrang="Đã xác thực"
              >
                Xác thực
              </Button>
              <Button
                style={{ border: 'none' }}
                variant="outline-warning"
                onClick={this.handleTableUpdateButtonClick}
                data-khsodienthoai={khachhang.sodienthoai}
                data-tinhtrang="Chưa xác thực"
              >
                Hủy xác thực
              </Button>
              <Button
                style={{ border: 'none' }}
                variant="outline-warning"
                onClick={this.handleTableUpdateButtonClick}
                data-khsodienthoai={khachhang.sodienthoai}
                data-tinhtrang="Đã khóa"
              >
                Khoá
              </Button>
              <Button
                style={{ border: 'none' }}
                variant="outline-danger"
                onClick={this.handleTableUpdateButtonClick}
                data-khsodienthoai={khachhang.sodienthoai}
                data-tinhtrang="Đã xóa"
              >
                Xóa
              </Button>
            </ButtonGroup>
          </td>

          {/* <td>
            <Button
              variant="outline-warning"
              onClick={this.handleTableUpdateButtonClick}
              data-khsodienthoai={khachhang.sodienthoai}
              data-tinhtrang="Chưa xác thực"
            >
              Hủy xác thực
            </Button>
          </td>
          <td>
            <Button
              variant="outline-warning"
              onClick={this.handleTableUpdateButtonClick}
              data-khsodienthoai={khachhang.sodienthoai}
              data-tinhtrang="Đã khóa"
            >
              Khoá
            </Button>
          </td>
          <td>
      
            <Button
              variant="outline-danger"
              onClick={this.handleTableUpdateButtonClick}
              data-khsodienthoai={khachhang.sodienthoai}
              data-tinhtrang="Đã xóa"
            >
              Xóa
            </Button>
          </td> */}
        </tr>
      );
    });
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
  handleTableUpdateButtonClick = (event) => {
    const token = sessionStorage.getItem('refreshToken');
    const isValidToken = renewAccessToken(token);

    if (isValidToken === false) {
      return;
    }
    debugger;
    const sodienthoai = event.target.dataset.khsodienthoai;
    const tinhtrang = event.target.dataset.tinhtrang;
    axios
      .put('http://localhost:9000/api/admin/capnhattinhtrangkhachhang', {
        sodienthoai,
        tinhtrang,
      })
      .then((res) => {
        alert('Cập nhật tình trạng thành công');
        this.setState({ khachhangmoixoa: res.data });

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
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    debugger;
  };

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
      </Container>
    );
  }
  //#endregion
}
export default DanhSachKhachHang;
