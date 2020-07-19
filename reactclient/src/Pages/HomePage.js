import React, { Component } from 'react';
import Home from '../Components/Common/Home';
import Header from '../Components/Common/Header';
import Footer from '../Components/Common/Footer';
import decode from 'jwt-decode';
import AuthHeader from '../Components/Common/AuthHeader';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };
  }
  isLogin() {
    const token = sessionStorage.getItem('jwtToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
      return false;
    }

    try {
      const { exp } = decode(token);
      if (exp < new Date().getTime() / 1000) {
        sessionStorage.clear();
        this.setState({
          isAuth: false,
        });
        return false;
      }
    } catch (e) {
      this.setState({
        isAuth: false,
      });
      return false;
    }
    this.setState({
      isAuth: true,
    });
    return true;
  }
  renderHeader() {
    if (this.state.isAuth === false) {
      return <Header />;
    }
    return <AuthHeader />;
  }
  componentDidMount() {
    this.isLogin();
  }
  render() {
    return (
      <div>
        {this.renderHeader()}
        <Home />
        <Footer />
      </div>
    );
  }
}
export default HomePage;
