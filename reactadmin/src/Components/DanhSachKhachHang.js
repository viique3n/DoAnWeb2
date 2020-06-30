import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { renewAccessToken } from '../Auth/AuthRoute';

class DanhSachKhachHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danhsachkhachhang: [],
      danhsachUpdate: [],
      isAuthenticated: false,
    };
    this.filterList = this.filterList.bind(this);
  }
  filterList(e) {
    let updateDSKH = this.state.danhsachkhachhang;
    updateDSKH = updateDSKH.filter((kh) => {
      return (
        kh.tenhienthi.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    this.setState(
      {
        danhsachUpdate: updateDSKH,
      },
      () => {
        const tset = this.state.danhsachkhachhang;
        debugger;
      }
    );
  }
  getDanhSachKhachHang() {
    const token = sessionStorage.getItem('refreshToken');
    renewAccessToken(token);

    const filter = {
      tinhtrang: 'Chưa xác thực',
    };
    axios('http://localhost:9000/api/admin/thongtinkhachhang', {
      params: { filter },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ danhsachkhachhang: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getDanhSachKhachHang();
    if (
      sessionStorage.getItem('jwtToken') &&
      sessionStorage.getItem('nhanvien')
    ) {
      const ds = this.getDanhSachKhachHang();
      this.setState({
        isAuthenticated: true,
        danhsachUpdate: ds,
      });
    }
    if (this.state.isAuthenticated === false) {
      return <Redirect to={{ pathname: '/' }} />;
    }
  }
  render() {
    const dskh = this.state.danhsachkhachhang;
    return (
      <form>
        <label for="email-sodienthoai">Lọc theo: </label>
        <select for="loaitimkiem">
          <option value="all" selected="true">
            Tất cả
          </option>
          <option value="email">Email</option>
          <option value="sodienthoai">Số điện thoại</option>
        </select>
        <label for="tinhtrang">Tình trạng: </label>
        <select name="tinhtrang">
          <option value="tatca">Tất cả</option>
          <option value="chuaxacthuc">Chưa xác thực</option>
          <option value="daxacthuc">Đã xác thực</option>
          <option value="dakhoa">Đã khóa</option>
        </select>
        <input type="text"></input>
      </form>
      // <React.Fragment>
      //   <input type="text" onChange={this.filterList}></input>
      //   <ul>
      //     {this.state.danhsachUpdate.map((khachhang) => (
      //       <li key={khachhang.sodienthoai}>
      //         {khachhang.tenhienthi} - --- {khachhang.email} --- -{' '}
      //         {khachhang.sodienthoai}
      //       </li>
      //     ))}
      //   </ul>
      // </React.Fragment>
    );
  }
}
export default DanhSachKhachHang;
