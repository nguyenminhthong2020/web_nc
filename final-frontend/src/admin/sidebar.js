import React from "react";
import { AppSidebar, AppSidebarNav2, AppSidebarMinimizer } from "@coreui/react";

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
      url: "/manage-employee",
      icon: "icon-people",
    },
    {
      name: "Giao dịch với đối tác",
      url: "/transaction",
      icon: "icon-calendar",
    }
  ],
};

export default class Sidebar extends React.Component {
  render() {
    return (
      <AppSidebar fixed display="lg" style = {{fontFamily: 'Segoe UI'}}>
        <AppSidebarNav2 navConfig={navConfigs} />  
        <AppSidebarMinimizer />
      </AppSidebar>
    );
  }  
}
