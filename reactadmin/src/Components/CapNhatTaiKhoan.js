import React, { Component } from 'react';
import {
  Form,
  Container,
  Col,
  Row,
  Button,
  Card,
  CardDeck,
  Modal,
} from 'react-bootstrap';
import axios from 'axios';

class CapNhatTaiKhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thongtintimkiem: '',
      timkiemerror: '',
      danhsachtaikhoan: [],
      mataikhoancapnhat: '',
      soducapnhat: '',
      soducapnhaterror: '',
      mataikhoancapnhatsoduerror: '',
      showModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleChangeSoDuCapNhat = this.handleChangeSoDuCapNhat.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleCapNhatSoDu = this.handleCapNhatSoDu.bind(this);
  }

  //#region function
  openModal(event) {
    const mataikhoan = event.target.dataset.mataikhoan;
    this.setState({
      mataikhoancapnhat: mataikhoan,
      showModal: true,
    });
  }
  closeModal() {
    this.setState({
      showModal: false,
    });
  }
  renderDachSachTaiKhoan() {
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
              <Card.Text>Số dư: {taikhoan.sodu}</Card.Text>
              <Button
                onClick={this.openModal}
                data-mataikhoan={taikhoan.mataikhoan}
              >
                Cập nhật
              </Button>
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
      return (
        <Card>
          <Card.Body>
            <Card.Text>
              Mã tài khoản: {this.state.danhsachtaikhoan.mataikhoan}
            </Card.Text>
            <Card.Text>
              Tình trạng: {this.state.danhsachtaikhoan.tinhtrang}
            </Card.Text>
            <Card.Text>
              Số điện thoại khách hàng:{' '}
              {this.state.danhsachtaikhoan.khachhangSodienthoai}
            </Card.Text>
            <Card.Text>Số dư: {this.state.danhsachtaikhoan.sodu}</Card.Text>
            <Form.Label>Nhập số tiền cần cập nhật</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChangeSoDuCapNhat}
            ></Form.Control>
          </Card.Body>
        </Card>
      );
    }
  }

  //#endregion

  //#region eventHandler
  handleSearchSubmit = (event) => {
    event.preventDefault();
    const { thongtintimkiem } = this.state;
    axios
      .get(
        'https://ibnodeserver.herokuapp.com/api/taikhoan/getthongtintaikhoan',
        {
          params: { thongtintimkiem },
        }
      )
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
  handleSearchChange(event) {
    event.preventDefault();
    const thongtintimkiem = event.target.value;
    this.setState({ thongtintimkiem });
  }
  handleChangeSoDuCapNhat(event) {
    const soducapnhat = event.target.value;
    if (isNaN(soducapnhat)) {
      this.setState({
        soducapnhat: '',
        soducapnhaterror:
          'Số tiền hợp lệ chỉ bao gồm chữ số, vui lòng nhập số tiền hợp lệ',
      });
      return;
    } else if (+soducapnhat < 50000) {
      this.setState({
        soducapnhat: '',
        soducapnhaterror: 'Số tiền phải lớn hơn 50000VNĐ',
      });
      return;
    } else if (+soducapnhat % 50000 !== 0) {
      this.setState({
        soducapnhat: '',
        soducapnhaterror:
          'Số tiền phải là số chia hết cho 50000, vui lòng nhập số tiền hợp lệ',
      });
      return;
    } else {
      this.setState({
        soducapnhat,
        soducapnhaterror: '',
      });
    }
  }
  handleCapNhatSoDu(event) {
    const { mataikhoancapnhat, soducapnhat } = this.state;
    debugger;
    axios
      .put('https://ibnodeserver.herokuapp.com/api/taikhoan/capnhatsodu', {
        mataikhoan: mataikhoancapnhat,
        soducapnhat,
      })
      .then((res) => {
        alert('Cập nhật số dư thành công');
        window.location.reload();
        debugger;
      })
      .catch((err) => {
        debugger;
      });
  }
  //#endregion

  //#region ComponentLicycle
  componentDidMount() {}
  //#endregion
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
        <Modal size="sm" show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xác thực OTP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Nhập số tiền cần cập nhật</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChangeSoDuCapNhat}
            ></Form.Control>
            <Card.Text>{this.state.soducapnhaterror}</Card.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
            <Button onClick={this.handleCapNhatSoDu}>Cập nhật số dư</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
export default CapNhatTaiKhoan;
