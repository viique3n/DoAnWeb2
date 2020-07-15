import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import { Card, Container } from 'react-bootstrap';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      user: [],
    };
  }
  componentDidMount() {
    const token = sessionStorage.getItem("jwtToken");
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
    
    // if (
    //   sessionStorage.getItem('jwtToken') &&
    //   sessionStorage.getItem('nhanvien')
    // ) {
    //   const userData = JSON.parse(sessionStorage.getItem('nhanvien'));
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
        <Container>
          <br />
          <Card style={{ width: '20rem' }}>
            <Card.Img variant='top' src='holder.js/100px180' />
            <Card.Body>
              <Card.Subtitle className='mb-2 text-muted'>
                Email: {email}
              </Card.Subtitle>
              <Card.Subtitle className='mb-2 text-muted'>
                Số điện thoại: {sodienthoai}
              </Card.Subtitle>
              <Card.Subtitle className='mb-2 text-muted'>
                Tên hiển thị: {tenhienthi}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Container>
        // <ul>
        //   <li>Email: {email}</li>
        //   <li>Số điện thoại: {sodienthoai}</li>
        //   <li>Tên hiển thị: {tenhienthi}</li>
        // </ul>
      );
    }
    return <div></div>;
  }
}
export default ProfileCard;
