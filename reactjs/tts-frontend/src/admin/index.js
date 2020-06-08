import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

// Các component con
import Navbar from './navbar/index';
import Footer from './footer/index';
import NotFound from './notfound/index';
import Login from './../login/index';
import Logout from './../logout/index';
import Home from './home/index';
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
      <PrivateRoute path = "/error-404" component = {Navbar} />
      <Route path = "/login"/>
      <Redirect to="/error-404" />
    </Switch>

    {/* Phần body */}
    <Switch>
      <PrivateRoute exact path = "/" component = {Home} />
      <PrivateRoute path = "/error-404" component = {NotFound} />
      <Route path = "/login" component = {Login} />
      <Route path = "/logout" component = {Logout} />
      <Redirect to="/error-404" />
    </Switch>

    {/* Phần các đường dẫn đến các trang */}
    <div style={{textAlign: 'center'}}>
      <Link to="/">Go Home /A</Link>
      <div></div>
      <Link to="/login">Login /A</Link>
      <div></div>    
      <Link to="/logout">Sign out /A</Link>
      <div></div>
    </div>

    {/* Phần footer */}
    <Footer/>
    </Router>    
  </React.Fragment>
    )
  }
}
