import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { renewAccessToken } from '../Auth/AuthRoute';

class ChuyenKhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaichuyenkhoanId: 1,
      thongtinloaichuyenkhoan:
        'Thực hiện việc chuyển khoản giữa các tài khoản thanh toán của quý khách',
      danhsachtaikhoanthanhtoan: [],
      mataikhoanchuyenkhoan: '',
      mataikhoanthuhuong: '',
      sotienchuyenkhoan: '',
      noidung: '',
      thoigian: '',
      trangthaichuyenkhoan: '',
    };
    this.handleSelectLoaiChuyenKhoan = this.handleSelectLoaiChuyenKhoan.bind(
      this
    );
    this.handleSelectMaTaiKhoanChuyenKhoan = this.handleSelectMaTaiKhoanChuyenKhoan.bind(
      this
    );
    this.handleSelectMaTaiKhoanThuHuong = this.handleSelectMaTaiKhoanThuHuong.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //#region function
  getDanhSachTaiKhoanThanhToan(khachhangSodienthoai) {
    const token = sessionStorage.getItem('refreshToken');
    const isValidToken = renewAccessToken(token);
    if (isValidToken === false) {
      return;
    }
    debugger;
    axios('http://localhost:9000/api/taikhoan/getdanhsachtaikhoanthanhtoan', {
      params: { khachhangSodienthoai },
    })
      .then((res) => {
        console.log(res.data);
        debugger;
        if (res.data[0] && res.data[0].mataikhoan) {
          this.setState({ mataikhoanchuyenkhoan: res.data[0].mataikhoan });
          this.setState({ mataikhoanthuhuong: res.data[0].mataikhoan });
        }
        console.log(typeof res.data);
        console.log(res.data[0]);
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
    const loaichuyenkhoan = event.target.value;
    if (loaichuyenkhoan === 'DEFAULT') {
      this.setState({
        loaichuyenkhoanId: 1,
        thongtinloaichuyenkhoan:
          'Thực hiện việc chuyển khoản giữa các tài khoản thanh toán của quý khách',
      });
    } else if (loaichuyenkhoan === 'chuyenkhoan2') {
      this.setState({
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
  handleSelectMaTaiKhoanThuHuong(event) {
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
  handleSubmit(event) {
    event.preventDefault();
    const test = this.state;
    debugger;

    if (this.state.loaichuyenkhoanId == 1) {
      const {
        mataikhoanchuyenkhoan,
        mataikhoanthuhuong,
        loaichuyenkhoanId,
      } = this.state;
      const { sotienchuyenkhoan, noidung } = this.props.values;
      if (sotienchuyenkhoan == '') {
        return;
      }
      axios
        .post('http://localhost:9000/api/chuyenkhoan/chuyenkhoan', {
          mataikhoanchuyenkhoan,
          mataikhoanthuhuong,
          sotienchuyenkhoan,
          noidung,
          thoigian: new Date(),
          loaichuyenkhoanId,
        })
        .then((res) => {
          if (res.data.thanhcong) {
            this.setState({
              trangthaichuyenkhoan: 'Chuyển khoản thành công',
            });
            const token = sessionStorage.getItem('jwtToken');
            const decoded = jwt_decode(token);
            const { sodienthoai } = decoded;
            this.getDanhSachTaiKhoanThanhToan(sodienthoai);
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
    } else if (this.state.loaichuyenkhoanId == 2) {
      const { mataikhoanchuyenkhoan } = this.state;
      const { mataikhoanthuhuong } = this.props.values;
    }
  }
  //#endregion

  //#region Render Form
  renderKhungChuyenKhoan() {
    const { loaichuyenkhoanId } = this.state;
    if (loaichuyenkhoanId === 1) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Chọn tài khoản gốc</label>
            <select
              defaultValue={'DEFAULT'}
              name="mataikhoanchuyenkhoan"
              onChange={this.handleSelectMaTaiKhoanChuyenKhoan}
            >
              {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                <option value={taikhoan.mataikhoan}>
                  {taikhoan.mataikhoan} --- Số dư: {taikhoan.sodu}
                </option>
              ))}
            </select>
            <br />

            <label>Chọn tài khoản thụ hưởng</label>
            <select
              defaultValue={'DEFAULT'}
              name="mataikhoanthuhuong"
              onChange={this.handleSelectMaTaiKhoanThuHuong}
            >
              {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                <option>{taikhoan.mataikhoan}</option>
              ))}
            </select>
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
          <p>{this.state.trangthaichuyenkhoan}</p>
        </div>
      );
    } else if (loaichuyenkhoanId === 2) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Chọn tài khoản gốc</label>
            <select defaultValue={'DEFAULT'} name="mataikhoanchuyenkhoan">
              {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                <option>
                  {taikhoan.mataikhoan} --- Số dư: {taikhoan.sodu}
                </option>
              ))}
            </select>
            <br />
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
    const token = sessionStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    const { sodienthoai } = decoded;
    this.getDanhSachTaiKhoanThanhToan(sodienthoai);
  }
  componentDidUpdate() {}

  //#endregion

  //#region render
  render() {
    return (
      <>
        <div>
          <h1>Chuyển khoản</h1>
          <select
            defaultValue={'DEFAULT'}
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
          </select>
          <p>{this.state.thongtinloaichuyenkhoan}</p>
        </div>
        {this.renderKhungChuyenKhoan()}
      </>
    );
  }
  //#endregion
}
export default ChuyenKhoan;
