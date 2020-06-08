// import './index.css';
// Imprort lib & Fr
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Import component (Now dont use)
import App from './App';
import Navbar from './navbar/index';
import Footer from './footer/index';
import Full from './full/index';
import Login from './login/index';

// Import component with role
import Admin from './admin/index';
import Employee from './employee/index';
import Customer from './customer/index';

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

// Render by Role
class Main extends React.Component {
  render() {
    let role = localStorage.getItem('role');
    // Admin
    switch(role) {
      case 'admin':
        {
          return <Admin/>
        }
        break;
      case 'employee':
        {
          return <Employee/>
        }
        break;
      case 'customer':
        {
          return <Customer/>
        }
        break;
      default:
        {
          // Only before login
          return(
            <React.Fragment>
              <Router>
              {/* Chuyển đến trang login */}
              <Switch>
                <Route exact path = "/login" component = {Login}/>
              </Switch>
              <Redirect to='/login' />
              </Router>    
          </React.Fragment>
          )
        }
    }  
  }
}

// Render
ReactDOM.render(  
  <Main/>,
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