import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { renewAccessToken } from '../../Auth/AuthRoute';
import { Container, Card, Row, Col, CardDeck } from 'react-bootstrap';

class QuanLyTaiKhoanThanhToan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      danhsachtaikhoanthanhtoan: [],
    };
  }
  getDanhSachTaiKhoanThanhToan(khachhangSodienthoai) {
    const token = sessionStorage.getItem('refreshToken');
    const isValidToken = renewAccessToken(token);
    if (isValidToken === false) {
      return;
    }
    debugger;
    axios('http://localhost:9000/api/taikhoan/getdanhsachtaikhoanthanhtoan', {
      params: { khachhangSodienthoai },
    })
      .then((res) => {
        console.log(res.data);
        debugger;
        this.setState({
          danhsachtaikhoanthanhtoan: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    const token = sessionStorage.getItem('jwtToken');
    const decoded = jwt_decode(token).data;
    const { sodienthoai } = decoded;
    this.getDanhSachTaiKhoanThanhToan(sodienthoai);
  }

  render() {
    if (this.state.isAuthenticated) {
      return (
        // <div>
        //   {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
        //     <ul>
        //       <li>Mã tài khoản: {taikhoan.mataikhoan}</li>
        //       <li>Số dư: {taikhoan.sodu}</li>
        //       <li>Tình trạng: {taikhoan.tinhtrang}</li>
        //     </ul>
        //   ))}
        // </div>
        <Row>
           {/* <Col>
            <img src="http://localhost:9000/images/BingW06.jpg" ></img>
          </Col>  */}
          <Col></Col>
          <Col>
            <br />
            <CardDeck>
              {this.state.danhsachtaikhoanthanhtoan.map((taikhoan) => (
                <Card>
                  <Card.Body>
                    <Card.Title>Tài khoản thanh toán</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Mã tài khoản: {taikhoan.mataikhoan}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      Số dư: {taikhoan.sodu}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      Tình trạng: {taikhoan.tinhtrang}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              ))}
            </CardDeck>
          </Col>
          <Col></Col>
        </Row>
      );
    }
    return <div></div>;
  }
}
export default QuanLyTaiKhoanThanhToan;
