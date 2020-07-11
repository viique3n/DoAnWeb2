import React, { Component } from 'react';
import RutTienTietKiem from '../../Components/SoTietKiem/RutTienTietKiem';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

class RutTienTietKiemPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <RutTienTietKiem />
        <Footer />
      </div>
    );
  }
}
export default RutTienTietKiemPage;
