import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import decode from 'jwt-decode';
import './css/header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthentiacted: false,
      userData: null,
    };
    this.logout = this.logout.bind(this);
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
        return false;
      }
    } catch (e) {
      return false;
    }

    this.setState(
      {
        isAuthentiacted: true,
        userData: decode(token),
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  logout() {
    sessionStorage.clear();
    this.setState({
      isAuthentiacted: false,
      userData: null,
    });
  }

  renderLoginLink() {
    if (this.state.isAuthentiacted) {
      const userData = this.state.userData;
      return (
        <ul id="menu">
          <li>
            <NavLink className="navLink" to="/">
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink className="navLink" to="/admin/profile">
              {userData.tenhienthi}
            </NavLink>
          </li>
          <li>
            <NavLink className="navLink" to="/admin/getdanhsachkhachhang">
              Danh sách khách hàng
            </NavLink>
          </li>
          <li>
            <NavLink className="navLink" to="/" onClick={this.logout}>
              Đăng xuất
            </NavLink>
          </li>
        </ul>
      );
    }
    return (
      <ul id="menu">
        <li>
          <NavLink className="navLink" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="navLink" to="/admin/login">
            Đăng nhập
          </NavLink>
        </li>
      </ul>
    );
  }
  componentDidMount() {
    this.isLogin();
  }
  render() {
    return <div>{this.renderLoginLink()}</div>;
  }
}
export default Header;
