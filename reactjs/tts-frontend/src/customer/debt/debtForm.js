import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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
      numberReceiver: null,
      nameReceiver: '',
      money: null,
      message: '',
      code: '125765',
      time: Date('05052020')
    }
    this.onChange = this.onChange.bind(this);
    this.selectReceiverChange = this.selectReceiverChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    // Nếu sự kiện ở thẻ Input Account Receiver thì thay đổi giá trị Name Receiver và làm rỗng thẻ gợi ý
    if(e.target.name == "numberReceiver") {
      let nameReceiver = '';
      DB.listReceivers().forEach(element => {
        if(element.number == e.target.value && element.bankCode == "GO") {
          nameReceiver = element.name;
        }
      });
      this.setState({
        // Cập nhật Name Receiver
        nameReceiver : nameReceiver
      })
      // value = 0 ứng với option gợi ý (dòng 155)
      document.getElementById('selectReceiver').value = '0';
    }
  }

  selectReceiverChange(e) {
    const receiverSelected = e.target.value;
    let res = {
      name: "",
      number: ""
    };
    DB.listReceivers().forEach(element => {
      if(element.number == receiverSelected) {
        res = {
          name: element.name,
          number: element.number
        }
      }
    });
    this.setState({
      nameReceiver : res.name
    })
    this.setState({
      numberReceiver : res.number
    })
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

  ActionAdd(e) {
    e.preventDefault();
    document.getElementById('formAdd').style.display = "block";
    // document.getElementById('main').style.display = "none";
    document.getElementById('formAdd').focus();

  }

  submitForm(e) {
    e.preventDefault()
    this.setState({activeTab: 1});

    // Thực hiện chuyển tiền
      /* Code here */

    // Thông báo xử lí thành công/ thất bại và chuyển trang
      /* Code here */
  }

  ActionCancelForm(e) {
    e.preventDefault();
    document.getElementById('formAdd').style.display = "none";
    // document.getElementById('main').style.display = "block";

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
      
      // Người nhận
      var DB_listReceivers = [
        {
          number: "0",
          name: "Chọn tài khoản gợi nhớ",
          bankCode: "0"
        }];
      Array.prototype.push.apply(DB_listReceivers, DB.listReceivers());
      const listReceivers = DB_listReceivers
        .map((item, index) => {
          if (item.bankCode == "GO" || item.name == "Chọn tài khoản gợi nhớ")
          return (index==0)
          ?(
            <option value = {item.number}>{item.name}</option>
          )
          :(
            <option value = {item.number}>{item.name} - {item.number}</option>
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
        <div id = {'main'}>
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
              <Col><button onClick = {this.ActionAdd} style = {{position: 'absolute', right: '20px', fontSize: '30px'}}><FcAddDatabase/></button></Col>
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
        <div id = {'formAdd'} style = {{
          display: 'none',
          border: '2px solid green',
          borderRadius: '5px',
          padding: '2em',
          width: '80%',
          textAlign: 'center',
          backgroundColor: 'white',
          position: 'absolute',
          zIndex: '1',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          }}>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={0}>
                <Card style={{backgroundColor: 'green', textAlign: 'center', color: 'white', fontSize: '18px'}}>
                  <strong style={{fontSize: '22px'}}>GỬI NHẮC NỢ</strong>
                </Card>          
                <br/>              
                <Form onSubmit = {this.submitForm}>
                  <Card>
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
                            >{listReceivers}
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
                          <Col md="3" className="d-flex p-3">
                            <Label>Chủ tài khoản</Label>
                          </Col>
                          <Col xs="12" md="3">
                            <Label>{this.state.nameReceiver}</Label>
                          </Col>
                        </FormGroup>
                    </CardBody>
                    <CardHeader>
                        <strong>THÔNG TIN NHẮC NỢ</strong>
                      </CardHeader>                                  
                      <CardBody>
                        <FormGroup row>
                          <Col md="3" className="d-flex p-3">
                            <Label htmlFor="money">Số tiền</Label>
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
                            <Label htmlFor="message">Nội dung nhắc nợ</Label>
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
                  </Card>                
                {/* {Chuyển tiền}*/}
                <br/>
                <div style = {{textAlign: 'center'}}>
                  <Button type = {'submit'} disabled={this.state.nameReceiver =='' || this.state.money == null || this.state.money == ''}>GỬI NHẮC NỢ</Button>
                  <Button onClick = {this.ActionCancelForm} style = {{marginLeft: '5px'}}>ĐÓNG</Button>
                </div>
              </Form>        
              </TabPane>
              <TabPane tabId={1}>
                <Card style={{backgroundColor: 'green', textAlign: 'center', color: 'white', fontSize: '18px'}}>
                  <strong style={{fontSize: '22px'}}>Chi tiết giao dịch</strong>
                </Card>          
                <br/>             
                <Form onSubmit = {this.submitForm} style = {{textAlign: 'left'}}>
                  <FormGroup>
                    <Card>
                        <CardBody>
                            <Label><b style = {{color: 'green'}}>Tình trạng</b></Label>
                            <br/>                       
                            <Label>• Gửi nhắc nợ thành công</Label>
                        </CardBody>
                    </Card>                  
                  </FormGroup>
                  <FormGroup>
                    <Card>
                        <CardBody>
                            <Label><b style = {{color: 'green'}}>Thông tin giao dịch</b></Label>
                            <br/>                       
                            <Label>• Mã giao dịch: <a href = {'/transaction/detail?id=' + this.state.code}>{this.state.code}</a></Label>
                            <br/>
                            <Label>• {this.state.time}</Label>                            
                        </CardBody>
                    </Card>                  
                  </FormGroup>
                  <FormGroup>
                      <Card>
                          <CardBody>
                              <Label><b style = {{color: 'green'}}>Thông tin người nhận</b></Label>       
                              <br/>                       
                              <Label>• Số tài khoản: {this.state.numberReceiver}</Label>
                              <br/>
                              <Label>• Chủ tài khoản: {this.state.nameReceiver}</Label>
                          </CardBody>
                      </Card>                  
                  </FormGroup>
                  <FormGroup>
                    <Card>
                        <CardBody>
                            <Label><b style = {{color: 'green'}}>Thông tin nhắc nợ</b></Label>
                            <br/>                       
                            <Label>• Số tiền: {this.state.money} VNĐ</Label>
                            <br/>
                            <Label>• Nội dung nhắc nợ: {this.state.message}</Label>                            
                        </CardBody>
                    </Card>                  
                </FormGroup>
                {/* {Chuyển tiền}*/}
                <br/>
                <div style = {{textAlign: 'center'}}>
                  <Button onClick = {this.ActionCancelForm} style = {{marginLeft: '5px'}}>ĐÓNG</Button>
                </div>
              </Form>        
              </TabPane>            
            </TabContent>
        </div>      
      </div>
      );
    }

}