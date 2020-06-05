import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import component
import App from './App';
import Navbar from './navbar/index';
import Footer from './footer/index';
import Full from './full/index';
import mLogin from './login/index';
// import auth from './auth';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Authention
const fakeAuth = {
  isAuthenticated() {
    return localStorage.getItem('localAuth')=='true'?true:false;
  },
  authenticate(cb) {
    localStorage.setItem('localAuth', 'true');
    setTimeout(cb, 100)
  },
  signout(cb) {
    localStorage.setItem('localAuth', 'false');
    setTimeout(cb, 100)
  }
}

// Login Component
class Login extends React.Component {
  render() {
    return (
      <div>
        <button onClick = {
            () => {
              fakeAuth.authenticate();
              alert(fakeAuth.isAuthenticated()?'itrue':'ifalse');
              // window.location.href = "/";
            }
          } >Log in</button>
          <button onClick = {
            () => {
              alert(fakeAuth.isAuthenticated()?'itrue':'ifalse');
              // window.location.href = "/";
            }
          } >Check</button>
          <button onClick = {
            () => {
              fakeAuth.signout();
              alert(fakeAuth.isAuthenticated()?'itrue':'ifalse');
              // window.location.href = "/";
            }
          } >Log out</button>
      </div>
    )
  }
}
// Route Check Authention
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

// Render
ReactDOM.render(
  <React.Fragment>
    <Router>

    {/* Xác định các trang có thể thêm Navbar */}
    <Switch>
      <PrivateRoute exact path = "/" component = {Navbar} />
    </Switch>

    {/* Phần body */}
    <Switch>
      <PrivateRoute exact path = "/" component = {App.App2} />
      <PrivateRoute path = "/full" component = {Full} />
      <Route path = "/login" component = {mLogin} />
    </Switch>

    {/* Phần footer */}
    <Link to="/login">Go to Login</Link>
    <Link to="/">Go Home</Link>
    <div></div>

    <Footer/>
    </Router>    
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
