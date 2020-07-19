import React, { Component } from 'react';
import Header from '../Components/Common/Header';
import Footer from '../Components/Common/Footer';
import SignUpForMikContainer from '../Containers/SignupForMikContainer';

class SignUpPage extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* <SignIn /> */}
        <SignUpForMikContainer />
        <Footer />
      </div>
    );
  }
}
export default SignUpPage;
