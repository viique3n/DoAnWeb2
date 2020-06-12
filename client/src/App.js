import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Home } from './routes/test/home';
import { About } from './routes/test/about';
import { Dashboard } from './routes/test/dashboard';
import { LoginForm } from './routes/user/login';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  
  callAPI() {
    fetch('http://localhost:9000/test')
      .then(res => res.text())
      .then(res => this.setState( {apiResponse: res} ))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
        <div className="App">
          <Router>
            <div>
              <div>
                <Navbar bg="light" expand="lg">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/about">About</Nav.Link>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Navbar>
              </div>
              <div>
                <Switch>
                  <Route exact path="/">
                    <Home></Home>
                  </Route>
                  <Route path="/about">
                    <About></About>
                  </Route>
                  <Route path="/dashboard">
                    <Dashboard></Dashboard>
                  </Route>
                  <Route path="/login">
                    <LoginForm></LoginForm>
                  </Route>
                </Switch>
              </div>  
            </div>
          </Router>
            <p className="App-intro">{this.state.apiResponse}</p>
        </div>
    );
}
}

export default App;
