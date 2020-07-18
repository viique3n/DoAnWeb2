import React, { Component } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import ChuyenKhoanCungKhachHang from '../../Components/ChuyenKhoan/ChuyenKhoanCungKhachHang';
// import ChuyenKhoanCungKhachHangForMikContainer from '../../Containers/ChuyenKhoan/ChuyenKhoanCungKhachHangForMikContainer';

class ChuyenKhoanCungKhachHangPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ChuyenKhoanCungKhachHang />
        <Footer />
      </div>
    );
  }
}
export default ChuyenKhoanCungKhachHangPage;
