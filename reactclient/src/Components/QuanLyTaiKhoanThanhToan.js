import React, { Component } from 'react';

class QuanLyTaiKhoanThanhToan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      danhsachtaikhoanthanhtoan: [],
    };
  }

  render() {
    if (this.state.isAuthenticated) {
      return (
        <ul>
          <li>Email: </li>
          <li>Số điện thoại:</li>
          <li>Tên hiển thị: </li>
        </ul>
      );
    }
    return <div></div>;
  }
}
export default QuanLyTaiKhoanThanhToan;
