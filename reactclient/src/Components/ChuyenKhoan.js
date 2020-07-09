import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { renewAccessToken } from '../Auth/AuthRoute';
import { Form, Button } from 'react-bootstrap';

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
  getDanhSachTaiKhoanThanhToan() {
    let token = sessionStorage.getItem('refreshToken');
    const isValidToken = renewAccessToken(token);
    if (isValidToken === false) {
      return;
    }
    debugger;
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

  //#region EventHandle
  handleSelectLoaiChuyenKhoan(event) {
    debugger;
    const test = this.state;
    const test2 = this.props.values;
    event.preventDefault();
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
    const mataikhoanchuyenkhoan = event.target.value;
    this.setState({
      mataikhoanchuyenkhoan,
    });
  }
  handleSelectMaTaiKhoanChuyenKhoan2(event) {
    event.preventDefault();
    const mataikhoanchuyenkhoan2 = event.target.value;
    this.setState({
      mataikhoanchuyenkhoan2,
    });
  }
  handleSelectMaTaiKhoanThuHuong(event) {
    debugger;
    event.preventDefault();
    const mataikhoanthuhuong = event.target.value;
    this.setState({
      mataikhoanthuhuong,
    });
  }
  handleChangeMaTaiKhoanThuHuong(event) {
    event.preventDefault();
  }
  haldeChangeSoTienChuyenKhoan(event) {
    event.preventDefault();
    const sotienchuyenkhoan = event.target.value;
    this.setState({
      sotienchuyenkhoan,
    });
  }
  handleChangeNoiDungChuyenKhoan(event) {
    event.preventDefault();
    const noidung = event.target.value;
    this.setState({
      noidung,
    });
  }
  handleSubmit1(event) {
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
        <Form onSubmit={this.handleSubmit1} style={{ width: '30%' }}>
          <Form.Group>
            <Form.Label>Chọn tài khoản gốc</Form.Label>
            <Form.Control
              as="select"
              name="mataikhoanchuyenkhoan"
              onChange={this.handleSelectMaTaiKhoanChuyenKhoan}
            >
              {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                <option value={taikhoan.mataikhoan}>
                  {taikhoan.mataikhoan} --- Số dư: {taikhoan.sodu}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Chọn tài khoản thụ hưởng</Form.Label>
            <Form.Control
              as="select"
              name="mataikhoanthuhuong"
              onChange={this.handleSelectMaTaiKhoanThuHuong}
            >
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
              name="sotienchuyenkhoan1"
              onChange={this.props.handleChange}
            />
            <p>{this.props.errors.sotienchuyenkhoan1}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Nội dung chuyển khoản</Form.Label>
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
        // <div>
        //   <form onSubmit={this.handleSubmit1}>
        //     <label>Chọn tài khoản gốc</label>
        //     <select
        //       defaultValue={'DEFAULT'}
        //       name='mataikhoanchuyenkhoan'
        //       onChange={this.handleSelectMaTaiKhoanChuyenKhoan}
        //     >
        //       {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
        //         <option value={taikhoan.mataikhoan}>
        //           {taikhoan.mataikhoan} --- Số dư: {taikhoan.sodu}
        //         </option>
        //       ))}
        //     </select>
        //     <br />

        //     <label>Chọn tài khoản thụ hưởng</label>
        //     <select
        //       defaultValue={'DEFAULT'}
        //       name='mataikhoanthuhuong'
        //       onChange={this.handleSelectMaTaiKhoanThuHuong}
        //     >
        //       {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
        //         <option>{taikhoan.mataikhoan}</option>
        //       ))}
        //     </select>
        //     <br />
        //     <label>Nhập số tiền cần chuyển*</label>
        //     <input
        //       type='text'
        //       onChange={this.props.handleChange}
        //       name='sotienchuyenkhoan1'
        //     ></input>
        //     <p>{this.props.errors.sotienchuyenkhoan1}</p>
        //     <br />
        //     <label>Nội dung chuyển khoản</label>
        //     <textarea
        //       onChange={this.props.handleChange}
        //       name='noidung1'
        //     ></textarea>
        //     <br />
        //     <button type='submit'>Xác nhận</button>
        //   </form>
        //   <p>{this.state.trangthaichuyenkhoan}</p>
        // </div>
      );
    } else if (loaichuyenkhoanId === 2) {
      return (
        <div>
          <form onSubmit={this.handleSubmit2}>
            <label>Chọn tài khoản gốc</label>
            <select
              defaultValue={'DEFAULT'}
              name="mataikhoanchuyenkhoan"
              onChange={this.handleSelectMaTaiKhoanChuyenKhoan2}
            >
              {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                <option value={taikhoan.mataikhoan}>
                  {taikhoan.mataikhoan} --- Số dư: {taikhoan.sodu}
                </option>
              ))}
            </select>
            <br />
            <label>Nhập mã thẻ/Số khoản thụ hưởng*</label>
            <input
              type="text"
              onChange={this.props.handleChange}
              name="mataikhoanthuhuong2"
            ></input>
            <p>{this.props.errors.mataikhoanthuhuong2}</p>
            <br />
            <label>Nhập số tiền cần chuyển*</label>
            <input
              type="text"
              onChange={this.props.handleChange}
              name="sotienchuyenkhoan2"
            ></input>
            <p>{this.props.errors.sotienchuyenkhoan2}</p>
            <br />
            <label>Nội dung chuyển khoản</label>
            <textarea
              onChange={this.props.handleChange}
              name="noidung2"
            ></textarea>
            <br />
            <button type="submit">Xác nhận</button>
            <p>{this.state.trangthaichuyenkhoan2}</p>
          </form>
        </div>
      );
    } else if (loaichuyenkhoanId === 3) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Chọn tài khoản gốc</label>
            <select defaultValue={'DEFAULT'}>
              {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                <option>{taikhoan.mataikhoan}</option>
              ))}
            </select>
            <br />
            <select defaultValue={'DEFAULT'}>
              <option value="DEFAULT">NGÂN HÀNG ???</option>
            </select>
            <label>Nhập mã thẻ/Số khoản thụ hưởng*</label>
            <input
              type="text"
              onChange={this.props.handleChange}
              name="mataikhoanthuhuong"
            ></input>
            <p>{this.props.errors.mataikhoanthuhuong}</p>
            <br />
            <label>Nhập số tiền cần chuyển*</label>
            <input
              type="text"
              onChange={this.props.handleChange}
              name="sotienchuyenkhoan"
            ></input>
            <p>{this.props.errors.sotienchuyenkhoan}</p>
            <br />
            <label>Nội dung chuyển khoản</label>
            <textarea
              onChange={this.props.handleChange}
              name="noidung"
            ></textarea>
            <br />
            <button type="submit">Xác nhận</button>
          </form>
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
      <>
        <div>
          <h1>Chuyển khoản</h1>
          <Form.Group style={{ width: '30%' }}>
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
              <option value="chuyenkhoan3">Chuyển khoản liên ngân hàng</option>
            </Form.Control>
            <p>{this.state.thongtinloaichuyenkhoan}</p>
          </Form.Group>
        </div>
        {this.renderKhungChuyenKhoan()}
      </>
    );
  }
  //#endregion
}
export default ChuyenKhoan;
