import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

// Cac component
import Navbar from './navbar/index';
import Footer from './footer/index';
import Full from './full/index';
import Login from './login/index';
import Home from './home/index';
import fakeAuth from './../auth';

class Logout extends React.Component {
  render() {
    // Sign out
    fakeAuth.signout();
    // Render
    return(
      <div style={{textAlign: 'center', height: 600, background: 'green'}}>
      <b>-------------</b>
      <div></div>
      <b>You singed out!</b>
      <div></div>
      <b>----------------------</b>
    </div> 
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
export default class Admin extends React.Component {  
  render() {
    // fakeAuth.signout();
    return(
      <React.Fragment>
    <Router>
    {/* Xác định các trang có thể thêm Navbar */}
    <Switch>
      <PrivateRoute exact path = "/" component = {Navbar} />
    </Switch>

    {/* Phần body */}
    <Switch>
      <PrivateRoute exact path = "/" component = {Home} />
      <PrivateRoute path = "/full" component = {Full} />
      <Route path = "/login" component = {Login} />
      <Route path = "/logout" component = {Logout} />
    </Switch>

    {/* Phần các đường dẫn đến các trang */}
    <div style={{textAlign: 'center'}}>
      <Link to="/">Go Home</Link>
      <div></div>
      <Link to="/login">Login</Link>
      <div></div>    
      <Link to="/logout">Sign out</Link>
      <div></div>
    </div>

    {/* Phần footer */}
    <Footer/>
    </Router>    
  </React.Fragment>
    )
  }
}
