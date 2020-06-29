import React, { Component } from 'react';
import LoginForMikContainer from '../Containers/LoginForMikContainer';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <LoginForMikContainer />
        <Footer />
      </div>
    );
  }
}
export default LoginPage;
