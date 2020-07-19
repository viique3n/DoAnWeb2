import React, { Component } from 'react';
import TaoSoTietKiem from '../../Components/SoTietKiem/TaoSoTietKiem';
import AuthHeader from '../../Components/Common/AuthHeader';
import Footer from '../../Components/Common/Footer';

class TaoSoTietKiemPage extends Component {
  render() {
    return (
      <div>
        <AuthHeader />
        <TaoSoTietKiem />
        <Footer />
      </div>
    );
  }
}
export default TaoSoTietKiemPage;
