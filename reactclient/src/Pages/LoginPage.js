import React, { Component } from 'react';
import LoginForm from '../Components/LoginForm';
import LoginForMikContainer from '../Containers/LoginForMikContainer';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <LoginForMikContainer />
        {/* <LoginForm /> */}
        {/* <Footer /> */}
      </div>
    );
  }
}
export default LoginPage;
