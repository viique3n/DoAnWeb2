import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import { renewAccessToken } from '../../Auth/AuthRoute';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

class AuthHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: '',
      thoigiantokenm: 0,
      thoigiantokens: 0,
    };
    this.logout = this.logout.bind(this);
  }
  logout() {
    sessionStorage.clear();
    this.setState({
      isAuthentiacted: false,
      userData: null,
    });
    return <Redirect to={{ pathname: '/' }} />;
  }

  async renewAcess() {
    let token = sessionStorage.getItem('refreshToken');
    const isValidToken = await renewAccessToken(token);
    if (isValidToken === false) {
      this.logout();
    }
    return true;
  }
  countDown() {
    this.myInterval = setInterval(() => {
      const { thoigiantokens, thoigiantokenm } = this.state;

      if (thoigiantokens > 0) {
        this.setState(({ thoigiantokens }) => ({
          thoigiantokens: thoigiantokens - 1,
        }));
      }
      if (thoigiantokens === 0) {
        if (thoigiantokenm === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ thoigiantokenm }) => ({
            thoigiantokenm: thoigiantokenm - 1,
            thoigiantokens: 59,
          }));
        }
      }
    }, 1000);
  }

  async componentDidMount() {
    const token = sessionStorage.getItem('jwtToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
      return false;
    }

    const renew = await this.renewAcess();
    if (renew === false) {
      return;
    }
    const { exp } = decode(token);
    const nowT = new Date();
    const expT = new Date(exp * 1000);
    const tT = (expT - nowT) / 1000;
    this.setState({
      thoigiantokenm: parseInt(tT / 60),
      thoigiantokens: parseInt(tT % 60),
      userData: decode(token).data,
    });
    this.countDown();
  }

  render() {
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
                Thông tin khách hàng
              </Nav.Link>
              <NavDropdown title="Khách hàng">
                <NavDropdown.Item as={Link} to="/khachhang/thongtin">
                  Thông tin khách hàng
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/khachhang/taikhoan">
                  Quản lý tài khoản
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/khachhang/lichsugiaodich">
                  Lịch sử giao dịch
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/tktt">
                Tài khoản
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/chuyenkhoan">
                Chuyển khoản
              </Nav.Link> */}
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
              <NavDropdown title="Tiết kiệm trực tuyến" id="basic-nav-dropdown">
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
              <Nav.Link as={Link}>
                {this.state.thoigiantokenm}:{this.state.thoigiantokens}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default AuthHeader;
