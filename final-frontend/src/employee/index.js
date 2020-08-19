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
import CreateAccount from './create_account/index';
import RechargeAccount from './recharge/index';


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
      <PrivateRoute exact path = "/create-account" component = {Header} />
      <PrivateRoute exact path = "/recharge" component = {Header} />
      <PrivateRoute exact path = "/error-404" component = {Header} />
      <Route path = "/login"/>
      <Redirect to="/error-404" />
    </Switch>

    {/* Phần body */}
    <Switch>
      <PrivateRoute exact path = "/" component = {Home} />
      <PrivateRoute exact path = "/transaction" component = {Transaction} />
      <PrivateRoute exact path = "/create-account" component = {CreateAccount} />   
      <PrivateRoute exact path = "/recharge" component = {RechargeAccount} />   
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
