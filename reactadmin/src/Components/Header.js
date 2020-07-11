import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
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
        <Navbar bg="light" expand="lg">
          <NavLink className="navLink" to="/">
            Trang chủ |
          </NavLink>

          <NavLink className="navLink" to="/admin/profile">
            {userData.tenhienthi} |
          </NavLink>

          <NavLink className="navLink" to="/admin/getdanhsachkhachhang">
            Danh sách khách hàng |
          </NavLink>

          <NavLink className="navLink" to="/admin/capnhattaikhoan">
            Cập nhật danh sách |
          </NavLink>

          <NavLink className="navLink" to="/" onClick={this.logout}>
            Đăng xuất
          </NavLink>
        </Navbar>
      );
    }
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Internet Banking</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/admin/login">Đăng Ký</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
