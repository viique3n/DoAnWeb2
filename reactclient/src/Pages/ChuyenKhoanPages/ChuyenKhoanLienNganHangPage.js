import React, { Component } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import ChuyenKhoanLienNganHangForMikContainer from '../../Containers/ChuyenKhoan/ChuyenKhoanLienNganHangForMikContainer';

class ChuyenKhoanLienNganHangPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ChuyenKhoanLienNganHangForMikContainer />
        <Footer />
      </div>
    );
  }
}
export default ChuyenKhoanLienNganHangPage;
