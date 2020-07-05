import React, { Component } from 'react';
import QuanLyTaiKhoanThanhToan from '../Components/QuanLyTaiKhoanThanhToan';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class QuanLyTaiKhoanThanhToanPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <QuanLyTaiKhoanThanhToan />
        <Footer />
      </div>
    );
  }
}
export default QuanLyTaiKhoanThanhToanPage;
