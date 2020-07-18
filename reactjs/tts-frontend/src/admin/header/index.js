import React from "react";
import {
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav
} from "reactstrap";

import {AppHeader, AppSidebarToggler} from '@coreui/react';
export default class Header extends React.Component {
    changePassword(e) {
        window.location.replace('/logout');
      }
    logOut(e) {
        window.location.replace('/logout');
    }
    render() {
        return (
            <div>
                <AppHeader fixed>
                    <AppSidebarToggler className="d-lg-none" display="md" mobile/>
                    <AppSidebarToggler className="d-md-down-none" display="lg"/>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav direction="down">
                            <DropdownToggle nav right>
                                <img src="https://p7.hiclipart.com/preview/336/946/494/avatar-user-medicine-surgery-patient-avatar.jpg" className="img-avatar" alt="Admin"/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem style = {{fontFamily: 'Segoe UI', fontSize: '15px'}} onClick={this.changePassword}>
                                    <i className="fa fa-user"></i>
                                    Đổi mật khẩu
                                </DropdownItem>
                                <DropdownItem style = {{fontFamily: 'Segoe UI', fontSize: '15px'}} onClick={this.logOut}>
                                    <i className="fa fa-lock"></i>
                                    Đăng xuất
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </AppHeader>
            </div>
        );
    }
}
