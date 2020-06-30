import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, UnAuthRoute } from './Auth/AuthRoute';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import DanhSachKhachHangPage from './Pages/DanhSachKhachHangPage';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <UnAuthRoute path="/admin/login">
            <LoginPage />
          </UnAuthRoute>
          <Route path="/admin/profile">
            <ProfilePage />
          </Route>
          <AuthRoute path="/admin/getdanhsachkhachhang">
            <DanhSachKhachHangPage />
          </AuthRoute>
        </Switch>
      </div>
    );
  }
}

export default App;
