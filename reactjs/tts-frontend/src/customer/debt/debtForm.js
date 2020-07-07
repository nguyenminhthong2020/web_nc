import React, { useState } from 'react';
import DB from '../database/index';
import {  } from 'reactstrap';
import {
  AiOutlineDelete
} from "react-icons/ai";
import {
  MdPayment,
  MdNoteAdd
} from "react-icons/md";
import {
  FcAddDatabase
} from "react-icons/fc"

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
            <Col><button onClick = {this.ActionCancel} style = {{position: 'absolute', right: '20px', fontSize: '24px'}}><FcAddDatabase/></button></Col>
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
        <div style = {{display: 'none'}}>
              <Form>
                  <Card>
                    <CardHeader>
                      <strong>Tài khoản nguồn</strong>
                    </CardHeader>
                    <CardBody>
                      <FormGroup row>
                        <Col md="3" className="d-flex p-3">
                          <Label htmlFor="select-account">Số tài khoản</Label>
                        </Col>
                        <Col xs="12" md="6">
                          <Input
                            type="select"
                            name="select-account"
                            onChange = {this.selectAccountChange}
                          >
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Số dư khả dụng</Label>
                        </Col>
                        <Col xs="12" md="3">
                          <Label>{this.state.balanceAccount} VNĐ</Label>
                        </Col>
                      </FormGroup>
                    </CardBody>
                    <CardHeader>
                      <strong>Thông tin người nhận</strong>
                    </CardHeader>
                      <CardBody>                          
                          <FormGroup row>
                            <Col md="3" className="d-flex p-3">
                              <Label htmlFor="selectReceiver">Tài khoản gợi ý</Label>
                            </Col>
                            <Col xs="12" md="6">
                              <Input
                                type="select"
                                name="selectReceiver"
                                id="selectReceiver"
                                onChange = {this.selectReceiverChange}
                              >
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3" className="d-flex p-3">
                              <Label htmlFor="numberReceiver">Số tài khoản</Label>
                            </Col>
                            <Col xs="12" md="6">
                              <Input
                                type="text"
                                name="numberReceiver"
                                onChange = {this.onChange}
                                value = {this.state.numberReceiver}
                              >
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="text-input">Chủ tài khoản:</Label>
                            </Col>
                            <Col xs="12" md="3">
                              <Label>{this.state.nameReceiver}</Label>
                            </Col>
                          </FormGroup>
                      </CardBody>
                      <CardHeader>
                        <strong>THÔNG TIN CHUYỂN TIỀN</strong>
                      </CardHeader>                                  
                      <CardBody>
                        <FormGroup row>
                          <Col md="3" className="d-flex p-3">
                            <Label htmlFor="money">Số tiền chuyển</Label>
                          </Col>
                          <Col xs="12" md="6">
                            <Input
                              type="number"
                              name="money"
                              onChange = {this.onChange}
                              value = {this.state.money}
                            >
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="3" className="d-flex p-3">
                            <Label htmlFor="message">Nội dung chuyển</Label>
                          </Col>
                          <Col xs="12" md="6">
                            <Input
                              type="text"
                              name="message"
                              onChange = {this.onChange}
                              value = {this.state.message}
                            >
                            </Input>
                          </Col>
                        </FormGroup>                          
                      </CardBody>
                      <CardHeader>
                          <strong>PHÍ THANH TOÁN</strong>
                      </CardHeader>
                      <CardBody>
                        <FormGroup row>
                          <Col md="3" className="d-flex p-3">
                            <Label htmlFor="method">Hình thức thanh toán phí</Label>
                          </Col>
                          <Col xs="12" md="6">
                            <Input
                              type="select"
                              name="method"
                              onChange = {this.onChange}
                              value = {this.state.method}
                            >
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="text-input">Phí thanh toán</Label>
                          </Col>
                          <Col xs="12" md="3">
                            <Label>3000 VNĐ</Label>
                          </Col>
                        </FormGroup>                          
                      </CardBody>
                    </Card>                
                {/* {Chuyển tiền}*/}
                <br/>
                <div style = {{textAlign: 'center'}}>
                  <Button>XÁC NHẬN</Button>
                </div>
              </Form>
        
        </div>
            
      </div>
      );
    }

}