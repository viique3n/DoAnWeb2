import React, { Component } from 'react';
import {
  Form,
  Container,
  Col,
  Row,
  Button,
  Card,
  CardDeck,
} from 'react-bootstrap';
import axios from 'axios';

class CapNhatTaiKhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thongtintimkiem: '',
      timkiemerror: '',
      danhsachtaikhoan: [],
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  renderDachSachTaiKhoan() {
    debugger;
    if (
      this.state.danhsachtaikhoan !== undefined &&
      this.state.danhsachtaikhoan.length > 0
    ) {
      return this.state.danhsachtaikhoan.map((taikhoan) => {
        return (
          <Card>
            <Card.Body>
              <Card.Text>Mã tài khoản: {taikhoan.mataikhoan}</Card.Text>
              <Card.Text>Tình trạng: {taikhoan.tinhtrang}</Card.Text>
              <Card.Text>
                Số điện thoại khách hàng: {taikhoan.khachhangSodienthoai}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      });
    } else if (
      this.state.danhsachtaikhoan !== undefined &&
      this.state.danhsachtaikhoan.length === 0
    ) {
      return;
    } else if (this.state.danhsachtaikhoan) {
      debugger;
      return (
        <Card>
          <Card.Img
            variant="top"
            src="http://localhost:9000/images/BingW01.jpg"
          />
          <Card.Body>
            <Card.Text>{this.state.danhsachtaikhoan.mataikhoan}</Card.Text>
            <Card.Text>{this.state.danhsachtaikhoan.tinhtrang}</Card.Text>
            <Card.Text>
              {this.state.danhsachtaikhoan.khachhangSodienthoai}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    const { thongtintimkiem } = this.state;
    axios
      .get('http://localhost:9000/api/taikhoan/getthongtintaikhoan', {
        params: { thongtintimkiem },
      })
      .then((res) => {
        debugger;
        console.log(res.data);
        const { taikhoan } = res.data;
        this.setState({
          danhsachtaikhoan: taikhoan,
          timkiemerror: '',
        });
      })
      .catch((err) => {
        debugger;
        this.setState({
          danhsachtaikhoan: [],
          timkiemerror: 'Không tìm thấy tài khoản theo thông tin yêu cầu',
        });
      });
  };
  handleSearchChange = (event) => {
    event.preventDefault();
    const thongtintimkiem = event.target.value;
    this.setState({ thongtintimkiem });
  };
  componentDidMount() {}
  render() {
    return (
      <Container>
        <br></br>
        <Form>
          <Row>
            <Col sm={4}>
              <Form.Control
                type="text"
                placeholder="Email, số điện thoại hoặc mã tài khoản"
                onChange={this.handleSearchChange}
              ></Form.Control>
            </Col>
            <Button onClick={this.handleSearchSubmit}>Tìm kiếm</Button>
          </Row>
        </Form>
        <br />
        <CardDeck>{this.renderDachSachTaiKhoan()}</CardDeck>
        <Card.Text>{this.state.timkiemerror}</Card.Text>
      </Container>
    );
  }
}
export default CapNhatTaiKhoan;
