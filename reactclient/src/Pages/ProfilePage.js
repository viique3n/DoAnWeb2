import React, { Component } from 'react';
import ProfileCard from '../Components/ThongTinCaNhan/ProfileCard';
import AuthHeader from '../Components/Common/AuthHeader';
import Footer from '../Components/Common/Footer';

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <AuthHeader />
        <ProfileCard />
        <Footer />
      </div>
    );
  }
}
export default ProfilePage;
