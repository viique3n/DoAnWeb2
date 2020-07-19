import React, { Component } from 'react';
import AuthHeader from '../../Components/Common/AuthHeader';
import Footer from '../../Components/Common/Footer';
import ChuyenKhoanCungNganHang from '../../Components/ChuyenKhoan/ChuyenKhoanCungNganHang';
// import ChuyenKhoanCungNganHangForMikContainer from '../../Containers/ChuyenKhoan/ChuyenKhoanCungNganHangForMikContainer';
// import Timer from '../../Components/ChuyenKhoan/Timer';

class ChuyenKhoanCungNganHangPage extends Component {
  render() {
    return (
      <div>
        <AuthHeader />
        <ChuyenKhoanCungNganHang />
        <Footer />
      </div>
    );
  }
}
export default ChuyenKhoanCungNganHangPage;
