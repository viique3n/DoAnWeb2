import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
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
        <ul id='menu'>
          <li>
            <NavLink className='navLink' to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className='navLink' to='/profile'>
              {tenhienthi}
            </NavLink>
          </li>
          <li>
            <NavLink className='navLink' to='/' onClick={this.logout}>
              LogOut
            </NavLink>
          </li>
        </ul>
      );
    }
    return (
      <ul id='menu'>
        <li>
          <NavLink className='navLink' to='/'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className='navLink' to='/login'>
            Log in
          </NavLink>
        </li>
        <li>
          <NavLink className='navLink' to='signup' onClick={this.props.logout}>
            Sign up
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
