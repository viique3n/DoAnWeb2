import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
class Home extends Component {
  render() {
    return (
      <div>
        <h2>Admin Home page</h2>
        <Card.Subtitle className="mb-2 text-muted">
          <p>1760378-Trần Thị Cẩm Nhung</p>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <p>1760399-Phan Thị Lệ Quyên</p>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <p>1760402-Huỳnh Hoàng Sang</p>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <p>1760463-Nguyễn Minh Văn</p>
        </Card.Subtitle>
      </div>
    );
  }
}
export default Home;
