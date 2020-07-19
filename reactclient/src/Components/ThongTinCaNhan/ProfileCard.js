import React, { Component } from 'react';
import decode from 'jwt-decode';

import { Card, Container } from 'react-bootstrap';
import { renewAccessToken } from '../../Auth/AuthRoute';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  async renewAcess() {
    let token = sessionStorage.getItem('refreshToken');
    const isValidToken = await renewAccessToken(token);
    if (isValidToken === false) {
      return false;
    }
    return true;
  }
  async componentDidMount() {
    const token = sessionStorage.getItem('jwtToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
      return false;
    }
    const { exp } = decode(token);
    const tokendecode = decode(token);
    const test0 = new Date();
    const test1 = new Date(exp * 1000);

    const renew = await this.renewAcess();
    if (renew === false) {
      return;
    }

    const token2 = sessionStorage.getItem('jwtToken');
    const refreshToken2 = sessionStorage.getItem('refreshToken');
    if (!token2 || !refreshToken2) {
      return false;
    }
    const exp2 = decode(token2).exp;
    const test00 = new Date();
    const test11 = new Date(exp2 * 1000);

    debugger;

    // const token = sessionStorage.getItem('jwtToken');
    // const decoded = jwt_decode(token);
    // const { email, sodienthoai, tenhienthi } = decoded;
    // const user = {
    //   email,
    //   sodienthoai,
    //   tenhienthi,
    // };
    // this.setState({
    //   user,
    // });
  }
  render() {
    const { email, sodienthoai, tenhienthi } = this.state.user;
    return (
      <Container>
        <br />
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Thông tin khách hàng</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Email: {email}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Số điện thoại: {sodienthoai}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Tên khách hàng: {tenhienthi}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
export default ProfileCard;
