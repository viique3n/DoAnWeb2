import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ProfilePage';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/signup" component={SignUpPage}></Route>
          <Route path="/profile" component={ProfilePage}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
