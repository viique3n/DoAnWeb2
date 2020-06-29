import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
    };
  }
  componentDidMount() {
    debugger;

    if (localStorage.getItem('jwtToken') && localStorage.getItem('nhanvien')) {
      const userData = JSON.parse(localStorage.getItem('nhanvien'));
      this.setState({
        isAuthenticated: true,
        user: userData,
      });
    }
    if (this.state.isAuthenticated === false) {
      return <Redirect to={{ pathname: '/' }} />;
    }
  }
  render() {
    if (this.state.isAuthenticated) {
      const { email, sodienthoai, tenhienthi } = this.state.user;
      return (
        <ul>
          <li>email: {email}</li>
          <li>so dien thoai: {sodienthoai}</li>
          <li>ten hien thi: {tenhienthi}</li>
        </ul>
      );
    }
    return <div></div>;
  }
}
export default ProfileCard;
