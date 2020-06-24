import React, { Component } from 'react';
import SignUpForm from '../Components/SignUpForm';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class SignUpPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <SignUpForm />
        <Footer />
      </div>
    );
  }
}
export default SignUpPage;
