import React, { Component } from 'react';
import RutTienTietKiem from '../../Components/SoTietKiem/RutTienTietKiem';
import AuthHeader from '../../Components/Common/AuthHeader';
import Footer from '../../Components/Common/Footer';

class RutTienTietKiemPage extends Component {
  render() {
    return (
      <div>
        <AuthHeader />
        <RutTienTietKiem />
        <Footer />
      </div>
    );
  }
}
export default RutTienTietKiemPage;
