import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ThongTinCaNhanPages/ProfilePage';
import QuanLyTaiKhoanThanhToanPage from './Pages/ThongTinCaNhanPages/QuanLyTaiKhoanThanhToanPage';
import LichSuGiaoDichPage from './Pages/ThongTinCaNhanPages/LichSuGiaoDichPage';
import ChuyenKhoanCungKhachHangPage from './Pages/ChuyenKhoanPages/ChuyenKhoanCungKhachHangPage';
import ChuyenKhoanCungNganHangPage from './Pages/ChuyenKhoanPages/ChuyenKhoanCungNganHangPage';
import ChuyenKhoanLienNganHangPage from './Pages/ChuyenKhoanPages/ChuyenKhoanLienNganHangPage';
import TaoSoTietKiemPage from './Pages/SoTietKiemPages/TaoSoTietKiemPage';
import ThemTienTietKiemPage from './Pages/SoTietKiemPages/ThemTienTietKiemPage';
import RutTienTietKiemPage from './Pages/SoTietKiemPages/RutTienTietKiemPage';
import { AuthRoute, UnAuthRoute } from './Auth/AuthRoute';
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <UnAuthRoute path="/login">
            <LoginPage />
          </UnAuthRoute>
          <UnAuthRoute path="/signup">
            <SignUpPage />
          </UnAuthRoute>
          {/* <AuthRoute path="/profile">
            <ProfilePage />
          </AuthRoute>
          <AuthRoute path="/tktt">
            <QuanLyTaiKhoanThanhToanPage />
          </AuthRoute> */}
          {/* <AuthRoute path="/chuyenkhoan">
            <ChuyenKhoanPage />
          </AuthRoute> */}
          <AuthRoute path="/khachhang/thongtin">
            <ProfilePage />
          </AuthRoute>
          <AuthRoute path="/khachhang/taikhoan">
            <QuanLyTaiKhoanThanhToanPage />
          </AuthRoute>
          <AuthRoute path="/khachhang/lichsugiaodich">
            <LichSuGiaoDichPage />
          </AuthRoute>
          <AuthRoute path="/ck/cungkh">
            <ChuyenKhoanCungKhachHangPage />
          </AuthRoute>
          <AuthRoute path="/ck/cungnganhang">
            <ChuyenKhoanCungNganHangPage />
          </AuthRoute>
          <AuthRoute path="/ck/liennganhang">
            <ChuyenKhoanLienNganHangPage />
          </AuthRoute>
          <AuthRoute path="/tietkiemtructuyen/taosotietkiem">
            <TaoSoTietKiemPage />
          </AuthRoute>
          <AuthRoute path="/tietkiemtructuyen/themtien">
            <ThemTienTietKiemPage />
          </AuthRoute>
          <AuthRoute path="/tietkiemtructuyen/ruttien">
            <RutTienTietKiemPage />
          </AuthRoute>
        </Switch>
      </div>
    );
  }
}

export default App;
