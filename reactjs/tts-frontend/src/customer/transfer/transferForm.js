import React, { useState } from 'react';
import DB from './../database/index';
import {  } from 'reactstrap';
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
    TabPane
  } from "reactstrap";

export default class TransferForm extends React.Component {
  constructor(props){
    super(props)
    let LoggedIn = false;
    this.state = {
      username: '',
      password: '',
      isOpen: true,
      activeTab: 0,
      selectAccount: DB.listAccounts()[0].balance,
      LoggedIn,
    }
    this.onChange = this.onChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  } 

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  } 

  selectChange(e) {
    const accountSelected = e.target.value;
    let balanceOfAccount = '';
    DB.listAccounts().forEach(element => {
      if(`${element.number} - ${element.type}` == accountSelected) {
        balanceOfAccount = element.balance;
      }
    });
    this.setState({
      [e.target.name] : balanceOfAccount
    })
  }

  submitForm(e) {
    e.preventDefault()
    const {username, password} = this.state
    //login magic!
    this.setState({activeTab: 1});
    window.scrollTo(0, 0);
  }
  render() {
      // Tài khoản nguồn
      const listAccounts = DB.listAccounts()  
        .map((item, index) => {
          return (
          <option>{item.number} - {item.type}</option>
          );
        });
        
      // Người nhận      
        const listReceivers = DB.listReceivers()    
          .map((item, index) => {
            return (
              <option>{item.name} - {item.number}</option>
            );
          });
      // Thanh toán phí
        const listType = [
            {
                type: "Người chuyển trả"
            },
            {
                type: "Người nhận trả"

            }
          ]      
        const listTypes = listType    
          .map((item, index) => {
            return (
              <option>{item.type}</option>
            );
          });
      return (
      <div>
        <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId={0}>
              <Card>
                  <CardHeader  style={{backgroundColor: 'coral', textAlign: 'center'}}>
                      <strong>Chuyển tiền</strong>
                  </CardHeader>
                  </Card>          
              <br/>
              <Form onSubmit = {this.submitForm} >
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label for="exampleSelect"><b style = {{color: 'green'}}>TÀI KHOẢN NGUỒN</b></Label>
                            <Input onChange = {this.selectChange} type="select" name="selectAccount" id="exampleSelect" style = {{marginBottom: '5px'}}>
                            {listAccounts}
                            </Input>
                            <Label for="exampleSelect">* Số dư khả dụng: {this.state.selectAccount}</Label>
                        </CardBody>
                    </Card>
                </FormGroup>                
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label for="exampleSelect"><b style = {{color: 'green'}}>THÔNG TIN NGƯỜI NHẬN</b></Label>
                            <Input type="select" name="select" id="exampleSelect" style = {{marginBottom: '5px'}}>
                            {listReceivers}
                            </Input>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Số tài khoản</InputGroupText>
                                </InputGroupAddon>
                                <Input value = "660255001"/>
                            </InputGroup>
                            <Label for="exampleSelect">* Chủ tài khoản: Nguyễn Minh Thông</Label>
                        </CardBody>
                    </Card>                  
                </FormGroup>                
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label for="exampleSelect"><b style = {{color: 'green'}}>THÔNG TIN CHUYỂN TIỀN</b></Label>
                            <InputGroup style = {{marginBottom: '5px'}}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Số tiền chuyển</InputGroupText>
                                </InputGroupAddon>
                                <Input />
                            </InputGroup> 
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Nội dung chuyển</InputGroupText>
                                </InputGroupAddon>
                                <Input />
                            </InputGroup>                            
                        </CardBody>
                    </Card>                  
                </FormGroup>
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label for="exampleSelect"><b style = {{color: 'green'}}>HÌNH THỨC THANH TOÁN PHÍ</b></Label>
                            <Input type="select" name="select" id="exampleSelect" style = {{marginBottom: '5px'}}>
                            {listTypes}
                            </Input>
                            <Label for="exampleSelect">* Phí thanh toán: 3,300</Label>
                        </CardBody>
                    </Card>                    
                </FormGroup>    
                {/* {Chuyển tiền}*/}
                <Button>XÁC NHẬN</Button>
              </Form>
            </TabPane>
            <TabPane tabId={1}>
              <Card>
                <CardHeader  style={{backgroundColor: 'coral', textAlign: 'center'}}>
                    <strong>Xác nhận thanh toán</strong>
                </CardHeader>
              </Card>          
              <br/>
              <Form onSubmit = {this.submitForm} >
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label for="exampleSelect"><b style = {{color: 'green'}}>NEW TÀI KHOẢN NGUỒN</b></Label>
                            <Input type="select" name="select" id="exampleSelect" style = {{marginBottom: '5px'}}>
                            {listAccounts}
                            </Input>
                            <Label for="exampleSelect">* Số dư khả dụng: 500,000</Label>
                        </CardBody>
                    </Card>                    
                </FormGroup>                
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label for="exampleSelect"><b style = {{color: 'green'}}>THÔNG TIN NGƯỜI NHẬN</b></Label>
                            <Input type="select" name="select" id="exampleSelect" style = {{marginBottom: '5px'}}>
                            {listReceivers}
                            </Input>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Số tài khoản</InputGroupText>
                                </InputGroupAddon>
                                <Input value = "660255001"/>
                            </InputGroup>
                        </CardBody>
                    </Card>                  
                </FormGroup>
                
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label for="exampleSelect"><b style = {{color: 'green'}}>THÔNG TIN CHUYỂN TIỀN</b></Label>
                            <InputGroup style = {{marginBottom: '5px'}}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Số tiền chuyển</InputGroupText>
                                </InputGroupAddon>
                                <Input />
                            </InputGroup> 
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Nội dung chuyển</InputGroupText>
                                </InputGroupAddon>
                                <Input />
                            </InputGroup>                            
                        </CardBody>
                    </Card>                  
                </FormGroup>
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label for="exampleSelect"><b style = {{color: 'green'}}>HÌNH THỨC THANH TOÁN PHÍ</b></Label>
                            <Input type="select" name="select" id="exampleSelect" style = {{marginBottom: '5px'}}>
                            {listTypes}
                            </Input>
                            <Label for="exampleSelect">* Phí thanh toán: 3,300</Label>
                        </CardBody>
                    </Card>                    
                </FormGroup>    
                {/* {Chuyển tiền}*/}
                <Button>XÁC NHẬN</Button>
            </Form>
          </TabPane>
        </TabContent>
          </div>      
      );
    }

}