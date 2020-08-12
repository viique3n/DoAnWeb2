import React, { Component } from 'react';
import { CardDeck } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Container, Card, Row, Col } from 'react-bootstrap';
class LichSuGiaoDich extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danhsachtaikhoanthanhtoan: [],
      lichsugiaodich: [],
    };
  }
  getDanhSachTaiKhoanThanhToan(khachhangSodienthoai) {
    axios(
      'https://ibnodeserver.herokuapp.com/api/taikhoan/getdanhsachtaikhoanthanhtoan',
      {
        params: { khachhangSodienthoai },
      }
    )
      .then((res) => {
        console.log(res.data);
        this.setState({
          danhsachtaikhoanthanhtoan: res.data,
        });
        let data = res.data;
        let danhsachmataikhoan = [];
        data.map((taikhoan) => {
          danhsachmataikhoan.push(taikhoan.mataikhoan);
        });
        axios(
          'https://ibnodeserver.herokuapp.com/api/chuyenkhoan/lichsugiaodich',
          {
            params: { danhsachtaikhoanthanhtoan: danhsachmataikhoan },
          }
        )
          .then((res) => {
            this.setState({
              lichsugiaodich: res.data.lichsugiaodich,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  renderLichSuGiaoDich() {
    debugger;
    const { lichsugiaodich } = this.state;
    if (typeof lichsugiaodich !== 'undefined' && lichsugiaodich.length > 0) {
      return lichsugiaodich.map((giaodich) => (
        <Row>
          <Col>
            <img src="https://ibnodeserver.herokuapp.com/images/BingW06.jpg"></img>
          </Col>
          <Col>
            <br />
            <Card>
              <Card.Body>
                <Card.Title>Thông tin giao dịch</Card.Title>
                <Card.Text>
                  Mã tài khoản: {giaodich.mataikhoanchuyenkhoan}
                </Card.Text>
                <Card.Text>
                  Mã tài khoản thụ hưởng: {giaodich.mataikhoanthuhuong}
                </Card.Text>
                <Card.Text>
                  Số tiền chuyển khoản: {giaodich.sotienchuyenkhoan}
                </Card.Text>
                <Card.Text>Nội dung: {giaodich.noidung}</Card.Text>
                <Card.Text>Thời gian: {giaodich.thoigian}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      ));
    }
  }
  componentDidMount() {
    const token = sessionStorage.getItem('jwtToken');
    const decoded = jwt_decode(token).data;
    const { sodienthoai } = decoded;
    this.getDanhSachTaiKhoanThanhToan(sodienthoai);
  }
  getLichSuGiaoDich() {}
  render() {
    return (
      <Container>
        <CardDeck>{this.renderLichSuGiaoDich()}</CardDeck>
      </Container>
    );
  }
}
export default LichSuGiaoDich;
