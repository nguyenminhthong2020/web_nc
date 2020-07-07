import React, { useState } from 'react';
import DB from './../database/index';
import {  } from 'reactstrap';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    Col,
    CardBody,
    CardHeader,
    TabContent,
    TabPane
  } from "reactstrap";

export default class TransferForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab: 0,
      current_password: '',
      new_password: '',
      retype_password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  } 

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Nhập thông tin giao dịch
  submitForm(e) {
    e.preventDefault()
    // Lấy ra mật khẩu thực = axios
    let true_passwpord = '12345';
    let result = '';
    // Kiểm tra điều kiện form
    if(this.state.new_password != this.state.retype_password) {
      result = 'Passwords do not match';
    }
    else if (this.state.current_password != true_passwpord) {
      result = 'Wrong password';
    }
    else {
      // Thực hiện đổi mật khẩu
      result = 'Success';
      // Chuyển qua trang thông báo đổi mật khẩu thành công
      this.setState({activeTab: 1});
      window.scrollTo(0, 0);
    }
    if (result != 'Success') {
      alert (result);
    }
  }

  render() {      
      return (
      <div>
        <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId={0}>
              <Card style={{borderStyle: 'none'}}>
                  <CardHeader style={{backgroundColor: '#435d7d', textAlign: 'center', color: 'white', fontSize: '18px'}}>
                      <strong>Đổi mật khẩu</strong>
                  </CardHeader>
                  </Card>          
              <br/>
              <Form onSubmit = {this.submitForm} >
                  <Card>                                
                      <CardBody>
                        <FormGroup row>
                          <Col md="3" className="d-flex p-3">
                            <Label htmlFor="current_password">Mật khẩu hiện tại</Label>
                          </Col>
                          <Col xs="12" md="6">
                            <Input
                              type="password"
                              name="current_password"
                              onChange = {this.onChange}
                              value = {this.state.current_password}
                            >
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="3" className="d-flex p-3">
                            <Label htmlFor="new_password">Mật khẩu mới</Label>
                          </Col>
                          <Col xs="12" md="6">
                            <Input
                              type="password"
                              name="new_password"
                              onChange = {this.onChange}
                              value = {this.state.new_password}
                            >
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="3" className="d-flex p-3">
                            <Label htmlFor="retype_password">Nhập lại mật khẩu mới</Label>
                          </Col>
                          <Col xs="12" md="6">
                            <Input
                              type="password"
                              name="retype_password"
                              onChange = {this.onChange}
                              value = {this.state.retype_password}
                            >
                            </Input>
                          </Col>
                        </FormGroup>                        
                      </CardBody>
                      </Card>                
                {/* {Chuyển tiền}*/}
                <br/>
                <div style = {{textAlign: 'center'}}>
                <Button disabled={this.state.current_password =='' || this.state.new_password == '' || this.state.retype_password == ''}>ĐỔI MẬT KHẨU</Button>
                </div>
              </Form>
            </TabPane>
            <TabPane tabId={1}>
              <Card style={{borderStyle: 'none'}}>
                  <CardHeader style={{backgroundColor: '#435d7d', textAlign: 'center', color: 'white', fontSize: '18px'}}>
                      <strong>Đổi mật khẩu</strong>
                  </CardHeader>
                  </Card>          
              <br/>
              <Form onSubmit = {this.confirmForm} >
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label><b style = {{color: 'green'}}>Đổi mật khẩu thành công</b></Label>
                            <br/>                        
                            <Label>• <a href = {'/'}>Quay về trang chủ</a></Label>
                        </CardBody>
                    </Card>
                </FormGroup>                
              </Form>
            </TabPane>            
            </TabContent>
          </div>      
      );
    }

}