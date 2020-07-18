import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import { AppHeader, AppBreadcrumb, AppSidebar, AppSidebarNav2, AppSidebarMinimizer } from "@coreui/react";

const navConfigs = {
  items: [
    {
      name: "Trang chủ",
      url: "/",
      icon: "icon-home",
    },
    {
      title: true,
      name: "chức năng",
    },
    {
      name: "Quản lý nhân viên",
      url: "/",
      icon: "icon-people",
    },
    {
      name: "Danh sách giao dịch",
      url: "/",
      icon: "icon-calendar",
    },
  ],
};

export default class Home extends React.Component {
    render() {
        return (
          <div style={{fontFamily: '"Segoe UI" !important'}}>          
            <div className="app">
              <div className="app-body">
                {/* Sidebar */}
                <AppSidebar fixed display="lg">
                  <AppSidebarNav2 navConfig={navConfigs} style={{fontFamily: 'Segoe UI'}}/>
                  <AppSidebarMinimizer style={{fontFamily: 'Segoe UI'}}/>
                </AppSidebar>
                {/* Content */}
                <main className="main">
                  
                </main>        
              </div>
            </div>
          </div> 
        )
    }
}
