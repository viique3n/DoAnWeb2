import React, { Component } from 'react';
import AuthHeader from '../../Components/Common/AuthHeader';
import Footer from '../../Components/Common/Footer';
import ChuyenKhoanCungKhachHang from '../../Components/ChuyenKhoan/ChuyenKhoanCungKhachHang';
// import ChuyenKhoanCungKhachHangForMikContainer from '../../Containers/ChuyenKhoan/ChuyenKhoanCungKhachHangForMikContainer';

class ChuyenKhoanCungKhachHangPage extends Component {
  render() {
    return (
      <div>
        <AuthHeader />
        <ChuyenKhoanCungKhachHang />
        <Footer />
      </div>
    );
  }
}
export default ChuyenKhoanCungKhachHangPage;
