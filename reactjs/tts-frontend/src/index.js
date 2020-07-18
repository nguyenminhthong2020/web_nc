import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Import style
import "./style.scss";

// Import component (Now dont use)
import Login from './login/index';
import Recovery from './forgot_password/index';

// Import component with role
import Admin from './admin/index';
import Employee from './employee/index';
import Customer from './customer/index';

// Authention
import fakeAuth from './auth';

// Route Check Authention (Currently not in use)
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

// Main render by Role
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
                <Route path = "/recovery" component = {Recovery}/>
                <Route path = "*" render = { _ => <Redirect to="/login" /> }/>
              </Switch>
              {/* <Redirect to='/login' /> */}
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

// Service Worker
serviceWorker.unregister();