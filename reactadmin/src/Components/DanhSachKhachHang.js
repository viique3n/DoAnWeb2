import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { renewAccessToken } from '../Auth/AuthRoute';
import './css/khachhang.css';
import { array } from 'yup';

class DanhSachKhachHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tinhtrang: '',
      tukhoa: '',
      loaitimkiem: 'Email',
      danhsachkhachhang: [],
      khachhangmoixoa: [],
      isAuthenticated: true,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSelectLoaiTimKiemChange = this.handleSelectLoaiTimKiemChange.bind(
      this
    );
    this.handleSelectTinhTrangChange = this.handleSelectTinhTrangChange.bind(
      this
    );
    // this.handleTableDeleteButtonClick = this.handleTableDeleteButtonClick.bind(
    //   this
    // );
    // this.handleTableUpdateButtonClick = this.handleTableUpdateButtonClick.bind(
    //   this
    // );
  }
  //#region get danh sách khách hàng
  getDanhSachKhachHang(filter) {
    const token = sessionStorage.getItem('refreshToken');
    const isValidToken = renewAccessToken(token);
    if (isValidToken === false) {
      return;
    }

    axios('http://localhost:9000/api/admin/thongtinkhachhang', {
      params: { filter },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          danhsachkhachhang: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //#endregion

  //#region render table
  renderTableHeader() {
    return (
      <tr>
        <th>Số điện thoại</th>
        <th>Email</th>
        <th>Tên hiển thị</th>
        <th>Tình trạng</th>
        <th>Xóa</th>
        <th>Khóa</th>
        <th>Xác thực</th>
        <th>Hủy xác thực</th>
      </tr>
    );
  }
  renderTable() {
    return this.state.danhsachkhachhang.map((khachhang) => {
      const { email, sodienthoai, tinhtrang, tenhienthi } = khachhang;
      return (
        <tr key={sodienthoai}>
          <td>{sodienthoai}</td>
          <td>{email}</td>
          <td>{tenhienthi}</td>
          <td>{tinhtrang}</td>
          <td>
            {/* Một kiểu truyền dữ liệu, không hiệu quả bằng cách bên dưới */}
            {/* <button
              className="khachhangDeleteButton"
              onClick={this.handleTableDeleteButtonClick.bind(this, khachhang)}
            >
              Xóa
            </button> */}
            <button
              onClick={this.handleTableUpdateButtonClick}
              data-khsodienthoai={khachhang.sodienthoai}
              data-tinhtrang="Đã xóa"
            >
              Xóa
            </button>
          </td>
          <td>
            <button
              onClick={this.handleTableUpdateButtonClick}
              data-khsodienthoai={khachhang.sodienthoai}
              data-tinhtrang="Đã khóa"
            >
              Khoá
            </button>
          </td>
          <td>
            <button
              onClick={this.handleTableUpdateButtonClick}
              data-khsodienthoai={khachhang.sodienthoai}
              data-tinhtrang="Đã xác thực"
            >
              Xác thực
            </button>
          </td>
          <td>
            <button
              onClick={this.handleTableUpdateButtonClick}
              data-khsodienthoai={khachhang.sodienthoai}
              data-tinhtrang="Chưa xác thực"
            >
              Hủy xác thực
            </button>
          </td>
        </tr>
      );
    });
  }
  //#endregion

  //#region handle filter
  handleSelectTinhTrangChange = (event) => {
    debugger;
    // this.setState({ tinhtrang: event.target.value });
    const index = event.target.selectedIndex;
    let tinhtrang = event.target[index].text;
    if (tinhtrang === 'Tất cả') {
      tinhtrang = '';
    }
    this.setState({
      tinhtrang,
    });
    const filter = {
      tinhtrang,
    };
    this.getDanhSachKhachHang(filter);
  };
  handleSelectLoaiTimKiemChange = (event) => {
    debugger;
    const index = event.target.selectedIndex;
    let loaitimkiem = event.target[index].text;
    const tukhoa = this.state.tukhoa;

    let filter;
    if (loaitimkiem === 'Tên hiển thị') {
      filter = { tenhienthi: tukhoa };
    } else if (loaitimkiem === 'Email') {
      filter = { email: tukhoa };
    } else if (loaitimkiem === 'Số điện thoại') {
      filter = { sodienthoai: tukhoa };
    } else {
      filter = { error: '' };
    }
    this.setState({ loaitimkiem });
  };

  handleSearchChange = (event) => {
    const tukhoa = event.target.value;
    this.setState({ tukhoa });
    // const filter
  };

  handleSearchSubmit = (event) => {
    debugger;
    const loaitimkiem = this.state.loaitimkiem;
    const tinhtrang = this.state.tinhtrang;
    const tukhoa = this.state.tukhoa;
    let filter;
    if (loaitimkiem === 'Email') {
      filter = {
        email: tukhoa,
        tinhtrang: tinhtrang,
      };
    } else if (loaitimkiem === 'Số điện thoại') {
      filter = {
        sodienthoai: tukhoa,
        tinhtrang: tinhtrang,
      };
    } else if (loaitimkiem === 'Tên hiển thị') {
      filter = {
        tenhienthi: tukhoa,
        tinhtrang: tinhtrang,
      };
    }
    this.getDanhSachKhachHang(filter);
  };
  //#endregion

  //#region handleTableButton
  handleTableUpdateButtonClick = (event) => {
    const token = sessionStorage.getItem('refreshToken');
    const isValidToken = renewAccessToken(token);

    if (isValidToken === false) {
      return;
    }
    debugger;
    const sodienthoai = event.target.dataset.khsodienthoai;
    const tinhtrang = event.target.dataset.tinhtrang;
    axios
      .put('http://localhost:9000/api/admin/capnhattinhtrangkhachhang', {
        sodienthoai,
        tinhtrang,
      })
      .then((res) => {
        alert('Cập nhật tình trạng thành công');
        this.setState({ khachhangmoixoa: res.data });

        const loaitimkiem = this.state.loaitimkiem;
        const tinhtrang = this.state.tinhtrang;
        const tukhoa = this.state.tukhoa;
        let filter;
        if (loaitimkiem === 'Email') {
          filter = {
            email: tukhoa,
            tinhtrang: tinhtrang,
          };
        } else if (loaitimkiem === 'Số điện thoại') {
          filter = {
            sodienthoai: tukhoa,
            tinhtrang: tinhtrang,
          };
        } else if (loaitimkiem === 'Tên hiển thị') {
          filter = {
            tenhienthi: tukhoa,
            tinhtrang: tinhtrang,
          };
        }
        this.getDanhSachKhachHang(filter);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    debugger;
  };

  // Test, tham khảo
  // handleTableDeleteButtonClick = (khackhang, event) => {
  //   // const check1 = event.target.getAttribute('key');
  //   // const check = event.target;
  //   debugger;
  // };
  // handleTableUpdateButtonClick = (event) => {
  //   const sodienthoai = event.target.dataset.khsodienthoai;
  // };
  //#endregion

  //#region component lifecircle
  componentDidMount() {
    const filter = { tinhtrang: '' };
    this.getDanhSachKhachHang(filter);
    // if (
    //   sessionStorage.getItem('jwtToken') &&
    //   sessionStorage.getItem('nhanvien')
    // ) {
    //   const ds = this.getDanhSachKhachHang();
    //   this.setState({
    //     isAuthenticated: true,
    //     danhsachUpdate: ds,
    //   });
    // }
    // if (this.state.isAuthenticated === false) {
    //   return <Redirect to={{ pathname: '/' }} />;
    // }
  }
  //#endregion

  //#region render
  render() {
    return (
      <>
        <div className="khachhangbody">
          <form id="formkhachhang">
            <div>
              <label className="khachhangLabel">Tình trạng: </label>
              <select
                className="khachhangSelect"
                name="tinhtrang"
                defaultValue={'DEFAULT'}
                onChange={this.handleSelectTinhTrangChange}
              >
                <option value="DEFAULT">Tất cả</option>
                <option value="chuaxacthuc">Chưa xác thực</option>
                <option value="daxacthuc">Đã xác thực</option>
                <option value="dakhoa">Đã khóa</option>
              </select>
            </div>
            <div>
              <label className="khachhangLabel">Lọc theo: </label>
              <select
                defaultValue={'DEFAULT'}
                className="khachhangSelect"
                onChange={this.handleSelectLoaiTimKiemChange}
              >
                <option value="DEFAULT">Email</option>
                <option value="tenhienthi">Tên hiển thị</option>
                <option value="sodienthoai">Số điện thoại</option>
              </select>
              <input
                type="text"
                className="khachhangSearchBox"
                onChange={this.handleSearchChange}
              ></input>
              <button type="button" onClick={this.handleSearchSubmit}>
                Filter
              </button>
            </div>
          </form>
          <br></br>
          <table id="khachhang">
            <tbody>
              {this.renderTableHeader()}
              {this.renderTable()}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  //#endregion
}
export default DanhSachKhachHang;
