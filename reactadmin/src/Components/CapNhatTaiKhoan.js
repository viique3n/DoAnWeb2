import React, { Component } from 'react';
import axios from 'axios';
class CapNhatTaiKhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mataikhoan: '',
      taikhoan: {},
      isAuthenticated: true,
    };
  }

  handleSearchSubmit = (event) => {
    const mataikhoan = this.state.mataikhoan;
    const filter = { mataikhoan };
    debugger;
    const check = axios
      .get('http://localhost:9000/api/admin/getthontintaikhoan', {
        params: { filter },
      })
      .then((res) => {
        debugger;
        const taikhoan = res.data;
        this.setState({
          taikhoan,
        });
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });
  };
  handleSearchChange = (event) => {
    const mataikhoan = event.target.value;
    this.setState({ mataikhoan });
  };
  render() {
    return (
      <form>
        <label>Mã tài khoản:</label>
        <select defaultValue={'DEFAULT'}>
          <option value='DEFAULT'>Tất cả</option>
          <option value='chuaxacthuc'>Chưa xác thực</option>
          <option value='daxacthuc'>Đã xác thực</option>
          <option value='dakhoa'>Đã khóa</option>{' '}
        </select>
        <input
          type='text'
          className='capnhatSearchBox'
          onChange={this.handleSearchChange}
        ></input>
        <button type='button' onClick={this.handleSearchSubmit}>
          Filter
        </button>
      </form>
    );
  }
}
export default CapNhatTaiKhoan;
