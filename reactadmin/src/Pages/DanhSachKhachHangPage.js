import React, { Component } from 'react';
import DanhSachKhachHang from '../Components/DanhSachKhachHang';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class DanhSachKhachHangPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Header />
        <DanhSachKhachHang />
        <Footer />
      </div>
    );
  }
}
export default DanhSachKhachHangPage;
