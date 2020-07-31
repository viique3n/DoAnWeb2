import React, { Component } from 'react';
import QuanLyTaiKhoanThanhToan from '../../Components/ThongTinCaNhan/QuanLyTaiKhoanThanhToan';
import AuthHeader from '../../Components/Common/AuthHeader';
import Footer from '../../Components/Common/Footer';

class QuanLyTaiKhoanThanhToanPage extends Component {
  render() {
    return (
      <div>
        <AuthHeader />
        <QuanLyTaiKhoanThanhToan />
        <Footer />
      </div>
    );
  }
}
export default QuanLyTaiKhoanThanhToanPage;
