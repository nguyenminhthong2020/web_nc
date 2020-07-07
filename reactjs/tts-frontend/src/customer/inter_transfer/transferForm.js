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
    this.state = {
      activeTab: 0,
      numberAccount: DB.listAccounts()[0].number,
      balanceAccount: DB.listAccounts()[0].balance,
      bankReceiver: DB.listBanks()[0].name,
      bankCodeReceiver: DB.listBanks()[0].bankCode,
      numberReceiver: null,
      nameReceiver: '',
      money: null,
      message: '',
      method: DB.listMethods()[0].type,
      otp : '',
    }
    this.onChange = this.onChange.bind(this);
    this.selectAccountChange = this.selectAccountChange.bind(this);
    this.selectReceiverChange = this.selectReceiverChange.bind(this);
    this.selectBankChange = this.selectBankChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.confirmForm = this.confirmForm.bind(this);
  } 

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    // Nếu sự kiện ở thẻ Input Account Receiver thì thay đổi giá trị Name Receiver và làm rỗng thẻ gợi ý
    if(e.target.name == "numberReceiver") {
      let nameReceiver = '';
      DB.listReceivers().forEach(element => {
        if(element.number == e.target.value && element.bankCode == this.state.bankCodeReceiver) {
          nameReceiver = element.name;
        }
      });
      this.setState({
        // Cập nhật Name Receiver
        nameReceiver : nameReceiver
      })
      // value = 0 ứng với option gợi ý (dòng 201)
      document.getElementById('selectReceiver').value = '0';
    }
  }

  selectAccountChange(e) {
    const accountSelected = e.target.value;
    let Account = '';
    DB.listAccounts().forEach(element => {
      if(`${element.number} - ${element.type}` == accountSelected) {
        Account = {
          balance: element.balance,
          number: element.number
        };
      }
    });
    this.setState({
      balanceAccount : Account.balance
    })
    this.setState({
      numberAccount : Account.number
    })
  }

  selectReceiverChange(e) {
    const receiverSelected = e.target.value;
    let res = {
      name: "",
      number: "",
      bankCode: ""
    };
    DB.listReceivers().forEach(element => {
      if(element.number == receiverSelected) {
        res = {
          name: element.name,
          number: element.number,
          bankCode: element.bankCode
        }
      }
    });
    this.setState({
      bankCodeReceiver : res.bankCode
    })
    this.setState({
      nameReceiver : res.name
    })
    this.setState({
      numberReceiver : res.number
    })
    
    // Đổi giá trị thẻ select ngân hàng
    document.getElementById('bankName').value = res.bankCode;
  }

  selectBankChange(e) {
    const bankSelected = e.target.value;
    let res = '';
    DB.listBanks().forEach(element => {
      if(element.bankCode == bankSelected) {
        res = {
          name: element.name,
          type: element.type,
          secretKey: element.secretKey,
          bankCode: element.bankCode
        }
      }
    });
    this.setState({
      bankReceiver : res.name
    })
    this.setState({
      bankCodeReceiver : res.bankCode
    })
    // Clean tài khoản người nhận
    this.setState({
      numberReceiver : ''
    })
    this.setState({
      nameReceiver : ''
    })
    
  }

  // Nhập thông tin giao dịch
  submitForm(e) {
    e.preventDefault()
    // Kiểm tra các thông tin có hợp lệ?
      /* Code here */

    // Mở form xác nhận
    this.setState({activeTab: 1});
    window.scrollTo(0, 0);
  }

  // Xác nhận OTP
  confirmForm(e) {
    e.preventDefault()
    // Tạo mã OTP
      /* Code here */

    // Kiểm tra mã OTP có hợp lệ
      /* Code here */

    // Thực hiện chuyển tiền
      /* Code here */

    // Thông báo xử lí thành công/ thất bại và chuyển trang
      /* Code here */
    this.setState({activeTab: 2});
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
      const listBanks = DB.listBanks()    
        .map((item, index) => {
          return (
            <option  value = {item.bankCode}>{item.name}</option>
          );
        });
      var DB_listReceivers = [
        {
          number: "0",
          name: "Chọn tài khoản gợi nhớ",
          bankCode: "0"
        }];
      Array.prototype.push.apply(DB_listReceivers, DB.listReceivers());
      const listReceivers = DB_listReceivers
        .map((item, index) => {
          if(item.bankCode != "GO")
          return (index==0)
          ?(
            <option value = {item.number}>{item.name}</option>
          )
          :(
            <option value = {item.number}>{item.name} - {item.number}</option>
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
              <Card style={{borderStyle: 'none'}}>
                  <CardHeader style={{backgroundColor: '#435d7d', textAlign: 'center', color: 'white', fontSize: '18px'}}>
                      <strong>Chuyển tiền liên ngân hàng</strong>
                  </CardHeader>
                  </Card>          
              <br/>
              <Form onSubmit = {this.submitForm} >
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
                          >{listAccounts}
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label>Số dư khả dụng</Label>
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
                              >{listReceivers}
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3" className="d-flex p-3">
                              <Label htmlFor="bankName">Ngân hàng</Label>
                            </Col>
                            <Col xs="12" md="6">
                              <Input
                                type="select"
                                name="bankName"
                                id="bankName"
                                onChange = {this.selectBankChange}
                              >{listBanks}
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
                                id="numberReceiver"
                                onChange = {this.onChange}
                                value = {this.state.numberReceiver}
                              >
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label>Chủ tài khoản:</Label>
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
                            >{listTypes}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="3">
                            <Label>Phí thanh toán</Label>
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
                <Button disabled={this.state.nameReceiver =='' || this.state.money == null || this.state.money == ''}>XÁC NHẬN</Button>
                </div>
              </Form>
            </TabPane>
            <TabPane tabId={1}>
              <Card style={{borderStyle: 'none'}}>
                  <CardHeader style={{backgroundColor: '#435d7d', textAlign: 'center', color: 'white', fontSize: '18px'}}>
                      <strong>Xác nhận</strong>
                  </CardHeader>
                  </Card>          
              <br/>
              <Form onSubmit = {this.confirmForm} >
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label><b style = {{color: 'green'}}>TÀI KHOẢN NGUỒN</b></Label>
                            <br/>                        
                            <Label>• Tài khoản nguồn: {this.state.numberAccount}</Label>
                            <br/>
                            <Label>• Số dư khả dụng: {this.state.balanceAccount} VNĐ</Label>
                        </CardBody>
                    </Card>
                </FormGroup>                
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label><b style = {{color: 'green'}}>THÔNG TIN NGƯỜI NHẬN</b></Label>       
                            <br/>
                            <Label>• Ngân hàng: {this.state.bankReceiver}</Label>
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
                            <Label><b style = {{color: 'green'}}>THÔNG TIN CHUYỂN TIỀN</b></Label>
                            <br/>                       
                            <Label>• Số tiền chuyển: {this.state.money} VNĐ</Label>
                            <br/>
                            <Label>• Nội dung chuyển: {this.state.message}</Label>                            
                        </CardBody>
                    </Card>                  
                </FormGroup>
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label><b style = {{color: 'green'}}>HÌNH THỨC THANH TOÁN PHÍ</b></Label>
                            <br/>                                           
                            <Label>• {this.state.method}</Label>
                            <br/>
                            <Label>• Phí thanh toán: 3000 VNĐ</Label>
                        </CardBody>
                    </Card>                    
                </FormGroup>
                <FormGroup>
                    <Card>
                    <CardHeader>
                        <strong>XÁC THỰC OTP</strong>
                    </CardHeader>
                    <CardBody>
                      <FormGroup row>
                        <Col md="3" className="d-flex p-3">
                          <Label htmlFor="otp">Mã OTP</Label>
                        </Col>
                        <Col xs="12" md="6">
                          <Input
                            type="text"
                            name="otp"
                            onChange = {this.onChange}
                            value = {this.state.otp}
                          >
                          </Input>
                        </Col>
                      </FormGroup>                                                                           
                    </CardBody>
                    </Card>                  
                </FormGroup>
                {/* {Chuyển tiền}*/}
                <div style = {{textAlign: 'center'}}>
                  <Button>XÁC NHẬN</Button>
                </div>
              </Form>
            </TabPane>
            <TabPane tabId={2}>
              <Card style={{borderStyle: 'none'}}>
                  <CardHeader style={{backgroundColor: '#435d7d', textAlign: 'center', color: 'white', fontSize: '18px'}}>
                      <strong>Thông tin giao dịch</strong>
                  </CardHeader>
                  </Card>          
              <br/>
              <Form onSubmit = {this.confirmForm} >
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label><b style = {{color: 'green'}}>Giao dịch thành công</b></Label>
                            <br/>                        
                            <Label>• Mã giao dịch: <a href = {'/transaction/detail?id=' + this.state.numberAccount}>{this.state.numberAccount}</a></Label>
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