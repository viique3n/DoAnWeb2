import React, { Component } from 'react';
import ChuyenKhoan from '../Components/ChuyenKhoan';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ChuyenKhoanForMikContainer from '../Containers/ChuyenKhoanForMikContainer';

class ChuyenKhoanPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ChuyenKhoanForMikContainer />
        <Footer />
      </div>
    );
  }
}
export default ChuyenKhoanPage;
