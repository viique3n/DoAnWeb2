import React, { Component } from 'react';
import jwt_decode from "jsonwebtoken";
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
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    debugger;
    const { email, sodienthoai, tenhienthi } = decoded;
    const user = {
      email,
      sodienthoai,
      tenhienthi,
    };
    this.setState({
      user,
    });
    debugger;

    // if (localStorage.getItem('jwtToken') && localStorage.getItem('user')) {
    //   const userData = JSON.parse(localStorage.getItem('user'));
    //   this.setState({
    //     isAuthenticated: true,
    //     user: userData,
    //   });
    // }
    // if (this.state.isAuthenticated === false) {
    //   return <Redirect to={{ pathname: '/' }} />;
    // }
  }
  render() {
    if (this.state.isAuthenticated) {
      const { email, sodienthoai, tenhienthi } = this.state.user;
      return (
        <ul>
          <li>Email: {email}</li>
          <li>Số điện thoại: {sodienthoai}</li>
          <li>Tên hiển thị: {tenhienthi}</li>
        </ul>
      );
    }
    return <div></div>;
  }
}
export default ProfileCard;
