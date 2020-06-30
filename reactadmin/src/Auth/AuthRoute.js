import decode from 'jwt-decode';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import axios from 'axios';

const checkAuth = () => {
  //   return true;
  const token = sessionStorage.getItem('jwtToken');
  const refreshToken = sessionStorage.getItem('refreshToken');
  if (!token || !refreshToken) {
    return false;
  }

  try {
    const { exp } = decode(token);
    const decodetoken = decode(token);
    const decoderefreshtoken = decode(refreshToken);
    console.log(exp);
    console.log(new Date().getTime() / 1000);
    console.log(new Date(exp));
    console.log(new Date(new Date() / 1000));

    if (exp < new Date().getTime() / 1000) {
      sessionStorage.clear();
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

export function AuthRoute({ children, ...rest }) {
  // Children là component chứa bên trong AuthRoute
  // rest chứa các thuộc tính bên trong AuthRoute ví dụ như path="/admin/getdanhsachkhachhang"
  // Kiểm tra auth
  // true => render children (Component chứa bên trong AuthRoute)
  // false => redirect lại trang login
  return (
    <Route
      {...rest}
      render={({ location }) =>
        checkAuth() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/admin/login',
            }}
          />
        )
      }
    />
  );
}

export function UnAuthRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        checkAuth() ? (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}

export function renewAccessToken(token) {
  axios
    .post('http://localhost:9000/api/admin/renewacesstoken', {
      refreshToken: token,
    })
    .then((res) => {
      debugger;
      const token = JSON.stringify(res.data.accessToken);
      console.log(token);
      sessionStorage.setItem('jwtToken', token);
    })
    .catch((err) => {
      console.log(err);
    });
}
