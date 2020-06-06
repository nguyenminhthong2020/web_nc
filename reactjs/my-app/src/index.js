import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import component
import App from './App';
import Navbar from './navbar/index';
import Footer from './footer/index';
import Full from './full/index';
import Login from './login/index';
// import auth from './auth';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Authention
import fakeAuth from './auth';

// Route Check Authention
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

// Logout
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
      <PrivateRoute exact path = "/" component = {App.Dashboard} />
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
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



// Login Component
// class Login extends React.Component {
//   render() {
//     return (
//       <div>
//         <button onClick = {
//             () => {
//               fakeAuth.authenticate();
//               alert(fakeAuth.isAuthenticated()?'itrue':'ifalse');
//               // window.location.href = "/";
//             }
//           } >Log in</button>
//           <button onClick = {
//             () => {
//               alert(fakeAuth.isAuthenticated()?'itrue':'ifalse');
//               // window.location.href = "/";
//             }
//           } >Check</button>
//           <button onClick = {
//             () => {
//               fakeAuth.signout();
//               alert(fakeAuth.isAuthenticated()?'itrue':'ifalse');
//               // window.location.href = "/";
//             }
//           } >Log out</button>
//       </div>
//     )
//   }
// }