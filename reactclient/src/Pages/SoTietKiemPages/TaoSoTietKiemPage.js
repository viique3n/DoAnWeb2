import React, { Component } from 'react';
import TaoSoTietKiem from '../../Components/SoTietKiem/TaoSoTietKiem';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

class TaoSoTietKiemPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <TaoSoTietKiem />
        <Footer />
      </div>
    );
  }
}
export default TaoSoTietKiemPage;
