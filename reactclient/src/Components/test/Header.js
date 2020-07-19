import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
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
      const tet = decode(token);
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
        userData: decode(token).data,
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
      const { tenhienthi } = userData;

      console.log(tenhienthi);
      return (
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">
              Internet Banking
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/profile">
                  {tenhienthi}
                </Nav.Link>
                <Nav.Link as={Link} to="/tktt">
                  Tài khoản
                </Nav.Link>
                <Nav.Link as={Link} to="/chuyenkhoan">
                  Chuyển khoản
                </Nav.Link>
                <NavDropdown title="Chuyển khoản">
                  <NavDropdown.Item as={Link} to="/ck/cungkh">
                    Chuyển khoản qua tài khoản của quý khách
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ck/cungnganhang">
                    Chuyển khoản qua tài khoản nội bộ
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ck/liennganhang">
                    Chuyển khoản liên ngân hàng
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Tiết kiệm trực tuyến"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/tietkiemtructuyen/taosotietkiem"
                  >
                    Tạo sổ tiết kiệm
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/tietkiemtructuyen/themtien">
                    Thêm tiền vào sổ tiết kiệm
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/tietkiemtructuyen/ruttien">
                    Rút tiền từ sổ tiết kiệm
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/" onClick={this.logout}>
                  Đăng xuất
                </Nav.Link>
                <Nav.Link as={Link}>Hello</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    }
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">
            Internet Banking
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/login">
                Đăng nhập
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Đăng ký
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
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
