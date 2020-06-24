import React, { Component } from 'react';
import LoginForm from '../Components/LoginForm';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <LoginForm />
        <Footer />
      </div>
    );
  }
}
export default LoginPage;
