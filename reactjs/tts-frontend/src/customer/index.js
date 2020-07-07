import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

// Các component con
import Navbar from './navbar/index';
import Footer from './footer/index';
import NotFound from './notfound/index';
import Login from './../login/index';
import Logout from './../logout/index';
import Home from './home/index';
import AccountInfo from './account_info/index';
import ReceiverInfo from './receiver_info/index';
import Transfer from './transfer/index';
import InterTransfer from './inter_transfer/index';
import Debt from './debt/index';
import Transaction from './transaction/index';
import ChangePassword from './change_password/index';


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
export default class Admin extends React.Component {  
  render() {
    return(
      <React.Fragment>
    <Router>
    {/* Phần Navbar */}
    <Switch>
      <PrivateRoute exact path = "/" component = {Navbar} />
      <PrivateRoute exact path = "/error-404" component = {Navbar} />
      <PrivateRoute exact path = "/account_info" component = {Navbar} />
      <PrivateRoute exact path = "/receiver_info" component = {Navbar} />
      <PrivateRoute exact path = "/transfer" component = {Navbar} />
      <PrivateRoute exact path = "/inter_transfer" component = {Navbar} />
      <PrivateRoute exact path = "/debt" component = {Navbar} />
      <PrivateRoute exact path = "/transaction/detail" component = {Navbar} />
      <PrivateRoute exact path = "/transaction" component = {Navbar} />
      <PrivateRoute exact path = "/change_password" component = {Navbar} />
      <Route path = "/login"/>
      <Redirect to="/error-404" />
    </Switch>

    {/* Phần body */}
    <Switch>
    <PrivateRoute exact path = "/" component = {AccountInfo} />
      <PrivateRoute exact path = "/error-404" component = {NotFound} />
      <PrivateRoute exact path = "/account_info" component = {AccountInfo} />
      <PrivateRoute exact path = "/receiver_info" component = {ReceiverInfo} />
      <PrivateRoute exact path = "/transfer" component = {Transfer} />
      <PrivateRoute exact path = "/inter_transfer" component = {InterTransfer} />
      <PrivateRoute exact path = "/debt" component = {Debt} />
      <PrivateRoute exact path = "/transaction/detail" component = {Debt} />
      <PrivateRoute exact path = "/transaction" component = {Transaction} />
      <PrivateRoute exact path = "/change_password" component = {ChangePassword} />
      <Route path = "/login" component = {Login} />
      <Route path = "/logout" component = {Logout} />
      <Redirect to="/error-404" />
    </Switch>

    {/* Phần các đường dẫn đến các trang */}
    <div style={{display: 'none', textAlign: 'center'}}>
      <Link to="/">Go Home /C</Link>
      <div></div>
      <Link to="/login">Login /C</Link>
      <div></div>    
      <Link to="/logout">Sign out /C</Link>
      <div></div>
    </div>

    {/* Phần footer */}
    <Footer/>
    </Router>    
  </React.Fragment>
    )
  }
}
