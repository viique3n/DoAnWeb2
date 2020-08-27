import decode from 'jwt-decode';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import axios from 'axios';

const checkAuth = () => {
  //return true;
  const token = sessionStorage.getItem('jwtToken');
  const refreshToken = sessionStorage.getItem('refreshToken');
  if (!token || !refreshToken) {
    return false;
  }

  try {
    const { exp } = decode(token);
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
              pathname: '/login',
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

const renewAccessTokenURL =
  'http://localhost:9000/' + 'api/auth/renewacesstoken';
export async function renewAccessToken(refreshToken) {
  await axios
    .post(renewAccessTokenURL, {
      refreshToken: refreshToken,
    })
    .then((res) => {
      const token = JSON.stringify(res.data.accessToken);
      const { exp } = decode(token);
      const exptime = new Date(exp * 1000);

      // console.log(token);
      sessionStorage.removeItem('jwtToken');
      sessionStorage.setItem('jwtToken', token);
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return true;

  // const res = await axios.post(renewAccessTokenURL, {
  //   refreshToken: token,
  // });
  // const { data } = res.data;

  // debugger;
}
