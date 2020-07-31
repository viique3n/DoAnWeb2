import React, { Component } from 'react';
import LichSuGiaoDich from '../../Components/ThongTinCaNhan/LichSuGiaoDich';
import AuthHeader from '../../Components/Common/AuthHeader';
import Footer from '../../Components/Common/Footer';

class LichSuGiaoDichPage extends Component {
  render() {
    return (
      <div>
        <AuthHeader />
        <LichSuGiaoDich />
        <Footer />
      </div>
    );
  }
}
export default LichSuGiaoDichPage;
