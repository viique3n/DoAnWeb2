import React, { Component } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import ChuyenKhoanCungKhachHangForMikContainer from '../../Containers/ChuyenKhoan/ChuyenKhoanCungKhachHangForMikContainer';

class ChuyenKhoanCungKhachHangPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ChuyenKhoanCungKhachHangForMikContainer />
        <Footer />
      </div>
    );
  }
}
export default ChuyenKhoanCungKhachHangPage;
