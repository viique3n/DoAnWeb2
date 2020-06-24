import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    if (localStorage.getItem('jwtToken')) {
      this.setState({
        isAuthentiacted: true,
        userData: localStorage.getItem('user'),
      });
    }
  }
  logout() {
    debugger;
    localStorage.clear();
    this.setState({
      isAuthentiacted: false,
      userData: null,
    });
  }

  renderLoginLink() {
    if (this.state.isAuthentiacted) {
      const userData = JSON.parse(this.state.userData);
      const { tenhienthi } = userData;
      console.log(tenhienthi);
      return (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">{tenhienthi}</Link>
          </li>
          <li>
            <Link to="/" onClick={this.logout}>
              Log out
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
        <li>
          <Link to="signup" onClick={this.props.logout}>
            Sign up
          </Link>
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
