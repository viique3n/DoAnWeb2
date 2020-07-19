import React, { Component } from 'react';
import LoginForm from '../Components/Auth/LoginForm';
import LoginForMikContainer from '../Containers/LoginForMikContainer';
import Header from '../Components/Common/Header';
import Footer from '../Components/Common/Footer';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <LoginForMikContainer />
        {/* <LoginForm /> */}
        <Footer />
      </div>
    );
  }
}
export default LoginPage;
