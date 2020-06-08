import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

// Cac component
import Navbar from './../navbar/index';
import Footer from './../footer/index';
import Full from './../full/index';
import Login from './../login/index';
import fakeAuth from './../auth';

// Import component with role
import Admin from './../admin/index';
import Employee from './../employee/index';
import Customer from './../customer/index';


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

export default class Logout extends React.Component {  
    render() {
        // Sign out
        fakeAuth.signout();
        alert('you signed outouta!');
        localStorage.setItem('reload','false');
        // Render
        return(
          <Redirect to='/login' />
          )
      }
}
