import React, { Component } from "react";
import CapNhatTaiKhoan from "../Components/CapNhatTaiKhoan";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

class CapNhatTaiKhoanPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <CapNhatTaiKhoan />
        {/* <Footer /> */}
      </div>
    );
  }
}
export default CapNhatTaiKhoanPage;
