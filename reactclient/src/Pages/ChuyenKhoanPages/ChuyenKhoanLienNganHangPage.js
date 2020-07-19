import React, { Component } from 'react';
import AuthHeader from '../../Components/Common/AuthHeader';
import Footer from '../../Components/Common/Footer';
import ChuyenKhoanLienNganHangForMikContainer from '../../Containers/ChuyenKhoan/ChuyenKhoanLienNganHangForMikContainer';

class ChuyenKhoanLienNganHangPage extends Component {
  render() {
    return (
      <div>
        <AuthHeader />
        <ChuyenKhoanLienNganHangForMikContainer />
        <Footer />
      </div>
    );
  }
}
export default ChuyenKhoanLienNganHangPage;
