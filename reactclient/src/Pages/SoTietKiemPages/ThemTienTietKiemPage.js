import React, { Component } from 'react';
import ThemTienTietKiem from '../../Components/SoTietKiem/ThemTienTietKiem';
import AuthHeader from '../../Components/Common/AuthHeader';
import Footer from '../../Components/Common/Footer';

class ThemTienTietKiemPage extends Component {
  render() {
    debugger;
    return (
      <div>
        <AuthHeader />
        <ThemTienTietKiem />
        <Footer />
      </div>
    );
  }
}
export default ThemTienTietKiemPage;
