import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

// Các component con
import Header from './header/index';
import Footer from './footer/index';
import NotFound from './notfound/index';
import Login from './../login/index';
import Logout from './../logout/index';
import Home from './home/index';
import Transaction from './transaction/index';

import fakeAuth from './../auth';

// Kiểm tra quyền đăng nhập
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

// Export
export default class Employee extends React.Component {  
  render() {
    return(
      <React.Fragment>
    <Router>
    {/* Phần Navbar */}
    <Switch>
      <PrivateRoute exact path = "/" component = {Header} />
      <PrivateRoute exact path = "/transaction" component = {Header} />      
      <PrivateRoute exact path = "/error-404" component = {Header} />
      <Route path = "/login"/>
      <Redirect to="/error-404" />
    </Switch>

    {/* Phần body */}
    <Switch>
      <PrivateRoute exact path = "/" component = {Home} />
      <PrivateRoute exact path = "/transaction" component = {Transaction} />      
      <PrivateRoute exact path = "/error-404" component = {NotFound} />
      <Route path = "/login" component = {Login} />
      <Route path = "/logout" component = {Logout} />
      <Redirect to="/error-404" />
    </Switch>

   
    </Router>    
  </React.Fragment>
    )
  }
}
