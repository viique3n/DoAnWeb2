import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ProfilePage';
import QuanLyTaiKhoanThanhToanPage from './Pages/QuanLyTaiKhoanThanhToanPage';
import ChuyenKhoanPage from './Pages/ChuyenKhoanPage';
import { AuthRoute, UnAuthRoute } from './Auth/AuthRoute';
class App extends Component {
  render() {
    return (
      <div className="container">
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
          <AuthRoute path="/profile">
            <ProfilePage />
          </AuthRoute>
          <AuthRoute path="/tktt">
            <QuanLyTaiKhoanThanhToanPage />
          </AuthRoute>
          <AuthRoute path="/chuyenkhoan">
            <ChuyenKhoanPage />
          </AuthRoute>
        </Switch>
      </div>
    );
  }
}

export default App;
