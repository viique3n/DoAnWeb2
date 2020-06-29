import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/admin/login" component={LoginPage}></Route>
          <Route path="/admin/profile" component={ProfilePage}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
