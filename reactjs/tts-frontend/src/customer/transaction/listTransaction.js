import React from "react";
import DB from "./../database/index";
import {
  Card,
  Col,
  Row,
  Table,
  CardBody,
  CardHeader,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export default class TransactionForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab: 0,
      numberAccount: DB.listAccounts()[0].number
    }
    this.onChange = this.onChange.bind(this);
    this.selectAccountChange = this.selectAccountChange.bind(this);    
  } 

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
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
      numberAccount : Account.number
    })
  }

  render() {
      // Tài khoản nguồn
      const listAccounts = DB.listAccounts()  
        .map((item, index) => {
          return (
          <option>{item.number} - {item.type}</option>
          );
        });

      // Lịch sử giao dịch
      let stt = 1;
      const listTransactions = DB.listTransactions()    
      .map((item, index) => {
        if(item.number == this.state.numberAccount)
        return (
          <tr>
            <th scope="row">{stt++}</th>            
            <td><a href = {'/transaction/detail?id=' + item.code}>{item.code}</a></td>
            <td>{item.type}</td>
            <td>{item.partnerAcconut}</td>
            <td>{item.money}</td>
            <td>{item.time}</td>
            <td>{item.message}</td>            
          </tr>
        );
      });
      
      // Return
      return (
        <div className="animated fadeIn">
        <Card style={{borderStyle: 'none'}}>
          <CardHeader style={{backgroundColor: '#435d7d', textAlign: 'center', color: 'white', fontSize: '18px'}}>
            <strong>Lịch sử giao dịch</strong>
          </CardHeader>
          <CardBody style={{borderStyle: 'ridge', borderColor: '#435d7d'}}>
            <FormGroup row>
              <Col md="3" className="d-flex p-3">
                <Label htmlFor="select-account"></Label>
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
            <Row>
              <Col>
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Mã giao dịch</th>
                      <th>Loại giao dịch</th>
                      <th>Đối tác</th>
                      <th>Số tiền</th>
                      <th>Thời gian</th>
                      <th>Khác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listTransactions}
                  </tbody>
                </Table>                
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
