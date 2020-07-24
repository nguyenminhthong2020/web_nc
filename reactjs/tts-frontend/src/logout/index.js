import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

// Authention
import fakeAuth from './../auth';

// Export
export default class Logout extends React.Component {  
    render() {        
        // Sign out
        fakeAuth.signout();

        // Render
        return(
          <Redirect to='/login' />
          )
      }
}
