import React, { Component } from 'react';
import Home from '../Components/Home';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
    );
  }
}
export default HomePage;
