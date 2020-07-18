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
      name: "Tạo tài khoản",
      url: "/",
      icon: "icon-people",
    },
    {
      name: "Nạp tiền tài khoản",
      url: "/",
      icon: "icon-calendar",
    },
    {
      name: "Lịch sử giao dịch",
      url: "/transaction",
      icon: "icon-calendar",
    },
    {
      name: "Nạp tiền tài khoản",
      url: "/",
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
