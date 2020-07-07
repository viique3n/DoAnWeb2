import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { renewAccessToken } from '../Auth/AuthRoute';

class QuanLyTaiKhoanThanhToan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      danhsachtaikhoanthanhtoan: [],
    };
  }
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
        this.setState({
          danhsachtaikhoanthanhtoan: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    const token = sessionStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    const { sodienthoai } = decoded;
    this.getDanhSachTaiKhoanThanhToan(sodienthoai);
  }

  render() {
    if (this.state.isAuthenticated) {
      return (
        <div>
          {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
            <ul>
              <li>Mã tài khoản: {taikhoan.mataikhoan}</li>
              <li>Số dư: {taikhoan.sodu}</li>
              <li>Tình trạng: {taikhoan.tinhtrang}</li>
            </ul>
          ))}
        </div>
      );
    }
    return <div></div>;
  }
}
export default QuanLyTaiKhoanThanhToan;
