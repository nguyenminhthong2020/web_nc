import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import { AppHeader, AppBreadcrumb, AppSidebar, AppSidebarNav2, AppSidebarMinimizer } from "@coreui/react";
import Sidebar from '../sidebar';

export default class Home extends React.Component {
    render() {
        return (
          <div style={{fontFamily: '"Segoe UI" !important'}}>          
            <div className="app">
              <div className="app-body">
                <Sidebar/>
                {/* Content */}
                <main className="main">
                  
                </main>        
              </div>
            </div>
          </div> 
        )
    }
}
