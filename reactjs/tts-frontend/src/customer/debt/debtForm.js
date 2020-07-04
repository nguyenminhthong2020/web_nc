import React, { useState } from 'react';
import DB from '../database/index';
import {  } from 'reactstrap';
import {
  AiOutlineDelete
} from "react-icons/ai";
import {
  MdPayment
} from "react-icons/md";

import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Card,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
    CardBody,
    CardHeader,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Collapse,
    TabContent,
    TabPane,
    NavItem,
    NavLink,
    Nav
  } from "reactstrap";

export default class TransferForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab: 0,
    }
    this.selectChange = this.selectChange.bind(this);    
  } 

  selectChange(e) {
    if (e.target.value == "Nhắc nợ đã tạo") {
      this.setState({
        activeTab: 0
      })
    }
    else {
      this.setState({
        activeTab: 1
      })
    }
  }

  setActiveTab(val) {
    this.setState({
      activeTab: val
    })
  }

  ActionPay(e) {
      e.preventDefault();
      alert('Thanh toán nhắc nợ');
  }

  ActionCancel(e) {
    e.preventDefault();
    alert('Hủy bỏ nhắc nợ');
}
  
    

  render() {      
      // Loại nhắc nợ
      const typeDebt = [
          {
              type: "Nhắc nợ đã tạo"
          },
          {
              type: "Nhắc nợ nhận được"
          }
        ]      
      const typeDebts = typeDebt    
      .map((item, index) => {
        return (
          <option>{item.type}</option>
        );
      });

      // Danh sách nhắc nợ đã tạo
      const listCreatedDebts = DB.listCreatedDebts()    
      .map((item, index) => {
        return (
          <tr>
            <th scope="row">{index+1}</th>
            <td>
              <a href={"/debt-detail?id=" + item.code} style={{fontSize: '15px', color:'#6c757d', textDecorationLine: 'underline'}}>{item.code}</a>              
            </td>
            <td>{item.name}</td>
            <td>{item.number}</td>
            <td>{item.money}</td>
            <td style = {{textAlign: 'center'}}>
              <button onClick = {this.ActionPay} style = {{fontSize: '24px', marginRight: '10px'}}><MdPayment/></button>
              <button onClick = {this.ActionCancel} style = {{fontSize: '24px', marginLeft: '10px'}}><AiOutlineDelete/></button>
            </td>
          </tr>
        );
      });

      // Danh sách nhắc nợ đã nhận
      const listReceivedDebts = DB.listReceivedDebts()    
      .map((item, index) => {
        return (
          <tr>
            <th scope="row">{index+1}</th>
            <td>
              <a href={"/debt-detail?id=" + item.code} style={{fontSize: '15px', color:'#6c757d', textDecorationLine: 'underline'}}>{item.code}</a>              
            </td>
            <td>{item.name}</td>
            <td>{item.number}</td>
            <td>{item.money}</td>
            <td style = {{textAlign: 'center'}}>
              <button onClick = {this.ActionPay} style = {{fontSize: '24px', marginRight: '10px'}}><MdPayment/></button>
              <button onClick = {this.ActionCancel} style = {{fontSize: '24px', marginLeft: '10px'}}><AiOutlineDelete/></button>
            </td>
          </tr>
        );
      });
      return (
      <div>
      <Card style={{borderStyle: 'none'}}>
        <CardHeader style={{backgroundColor: '#435d7d', textAlign: 'center', color: 'white', fontSize: '18px'}}>
          <strong>Quản lý nhắc nợ</strong>
        </CardHeader>
        <CardBody style={{borderStyle: 'ridge', borderColor: '#435d7d'}}>
        <FormGroup row>
          <Col xs="12" md="6">
            <Nav tabs>
              <NavItem>
                <NavLink active={this.state.activeTab === 0} onClick={() => this.setActiveTab(0)}>
                  <b style = {{fontFamily: 'Segoe UI', fontSize: '15px'}}>Nhắc nợ đã tạo</b>
                </NavLink>
              </NavItem>
              <NavItem >
                <NavLink  active={this.state.activeTab === 1} onClick={() => this.setActiveTab(1)}>
                  <b style = {{fontFamily: 'Segoe UI', fontSize: '15px'}}>Nhắc nợ đã nhận</b>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </FormGroup>
        <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId={0}>          
                <Row>
                  <Col>
                    <Table responsive bordered>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Mã giao dịch</th>
                          <th>Chủ khoản</th>
                          <th>Số tài khoản</th>
                          <th>Số tiền</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {listCreatedDebts}
                      </tbody>
                    </Table>
                  </Col>
                </Row>        
            </TabPane>
            <TabPane tabId={1}>              
                <Row>
                  <Col>
                    <Table responsive bordered>
                      <thead>
                          <tr>
                            <th>#</th>
                            <th>Mã giao dịch</th>
                            <th>Chủ khoản</th>
                            <th>Số tài khoản</th>
                            <th>Số tiền</th>
                            <th></th>
                          </tr>
                        </thead>
                      <tbody>
                        {listReceivedDebts}
                      </tbody>
                    </Table>
                  </Col>
                </Row>        
            </TabPane>
          </TabContent>        
        </CardBody>
        </Card>                
      </div>      
      );
    }

}