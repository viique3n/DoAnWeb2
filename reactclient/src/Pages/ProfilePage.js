import React, { Component } from 'react';
import ProfileCard from '../Components/ProfileCard';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ProfileCard />
        <Footer />
      </div>
    );
  }
}
export default ProfilePage;
