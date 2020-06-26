import React, { Component } from 'react';
import SignUpForm from '../Components/SignUpForm';
import SignIn from '../Components/test';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import SignUpForMikContainer from '../Containers/SignupForMikContainer';

class SignUpPage extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* <SignIn /> */}
        <SignUpForMikContainer />
        {/* <Footer /> */}
      </div>
    );
  }
}
export default SignUpPage;
