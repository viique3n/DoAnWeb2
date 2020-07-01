import React, { Component } from 'react';
import DanhSachKhachHang from '../Components/DanhSachKhachHang';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class DanhSachKhachHangPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <DanhSachKhachHang />
        {/* <Footer /> */}
      </div>
    );
  }
}
export default DanhSachKhachHangPage;
