import React, { Component } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import ChuyenKhoanCungNganHangForMikContainer from '../../Containers/ChuyenKhoan/ChuyenKhoanCungNganHangForMikContainer';
import Timer from '../../Components/ChuyenKhoan/Timer';

class ChuyenKhoanCungNganHangPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Timer />
        <Footer />
      </div>
    );
  }
}
export default ChuyenKhoanCungNganHangPage;
