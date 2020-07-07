import React, { Component } from 'react';
import ChuyenKhoan from '../Components/ChuyenKhoan';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class ChuyenKhoanPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ChuyenKhoan />
        <Footer />
      </div>
    );
  }
}
export default ChuyenKhoanPage;
