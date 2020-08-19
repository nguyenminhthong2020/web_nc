import React from "react";
import DB from "./../database/index";
import {connector} from "./../../callAxios";
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
import {
    useParams
  } from "react-router-dom";

export default class TransactionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 0,
            numberAccount: DB.listAccounts()[0].number,
            loaded: false,
            lasttime: new Date().getTime(),
            transReceive: [],
            type: 1,
            transSend: [],
            transDebt: [],
            activePage: 1
        }
        this.onChange = this.onChange.bind(this);
        this.selectTypeChange = this.selectTypeChange.bind(this);
        this.getDatabase = this.getDatabase.bind(this);

    }

    handlePageChange(pageNumber) {
      console.log(`active page is ${pageNumber}`);
      this.setState({activePage: pageNumber});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    selectTypeChange(e) {
        const typeSelected = e.target.value;
        let listTrans = [];

        if (typeSelected == 0) { // Mọi giao dịch
            // listTrans = this.state.transReceive.concat(this.state.transSend).concat(this.state.transDebt)
        }

        if (typeSelected == 1) { // Giao dịch nhận tiền
            listTrans = this.state.transReceive
        }

        if (typeSelected == 2) { // Giao dịch chuyển khoản
            listTrans = this.state.transSend
        }

        if (typeSelected == 3) { // Giao dịch thanh toán nhắc nợ
            listTrans = this.state.transDebt
        }

        this.setState({type: typeSelected})
    }

    getDatabase = async (e) => { // Refresh token để gọi backend trước
        if (new Date().getTime() > this.state.lasttime + 5 * 1000 || this.state.loaded == false) {
            this.setState({loaded: true, lasttime: new Date().getTime()})
            DB.refreshToken();

            // Call axios - transReceive
            const response = await connector.get("/transaction/receive", {}).then((response) => {
                console.log("response", response);
                let transReceive = [];
                response.data.forEach(element => {
                    transReceive = transReceive.concat([{
                            transaction_id: element.transaction_id,
                            type: 1,
                            typeName: 'Nhận tiền',
                            partner_account_number: element.sender_account_number,
                            money: element.money,
                            created_at: element.created_at,
                            message: element.message
                        }]);
                });

                // Lưu vào state
                this.setState({transReceive: transReceive})
            }, (error) => {
                console.log("Error listTransaction - Receive! Infor: ", error.response);
            });

            // Call axios - transSend
            const response2 = await connector.get("/transaction/send", {}).then((response) => {
                console.log("response", response);
                let transSend = [];
                response.data.forEach(element => {
                    transSend = transSend.concat([{
                            transaction_id: element.transaction_id,
                            type: 2,
                            typeName: 'Chuyển khoản',
                            partner_account_number: element.receiver_account_number,
                            money: element.money,
                            created_at: element.created_at,
                            message: element.message
                        }]);
                });

                // Lưu vào state
                this.setState({transSend: transSend})
            }, (error) => {
                console.log("Error listTransaction - Receive! Infor: ", error.response);
            });

            // Call axios - transDebt
            const response3 = await connector.get("/transaction/debt", {}).then((response) => {
                console.log("response", response);
                let transDebt = [];
                response.data.forEach(element => {
                    transDebt = transDebt.concat([{
                            transaction_id: element.transaction_id,
                            type: 3,
                            typeName: 'Nhắc nợ',
                            partner_account_number: element.creditor_account_number,
                            money: element.money,
                            created_at: element.created_at,
                            message: ''
                        }]);
                });

                // Lưu vào state
                this.setState({transDebt: transDebt})
            }, (error) => {
                console.log("Error listTransaction - Receive! Infor: ", error.response);
            });

        }
    }

    render() { // Realtime
        if (this.state.loaded == false) 
            this.getDatabase();
        setTimeout(function () {
            this.getDatabase();
        }.bind(this), 10 * 1000);

        // Tài khoản nguồn
        const listAccounts = DB.listAccounts().map((item, index) => {
            return (
                <option>{
                    item.number
                }
                    - {
                    item.type
                }</option>
            );
        });

        // Loại giao dịch
        const listType = [
            {
                type: 0,
                typeName: 'Tất cả'
            }, {
                type: 1,
                typeName: 'Giao dịch nhận tiền'
            }, {
                type: 2,
                typeName: 'Giao dịch chuyển khoản'
            }, {
                type: 3,
                typeName: 'Thanh toán nhắc nợ'
            }
        ];

        // Lịch sử giao dịch
        let stt = 1;
        const listTransactions = DB.listTransactions();

        // Return
        return (
            <div className="animated fadeIn">
                <Card style={
                    {borderStyle: 'none'}
                }>
                    <CardHeader style={
                        {
                            backgroundColor: '#435d7d',
                            textAlign: 'center',
                            color: 'white',
                            fontSize: '18px'
                        }
                    }>
                        <strong>Chi tiết giao dịch</strong>
                    </CardHeader>
                    <CardBody style={
                        {
                            borderStyle: 'ridge',
                            borderColor: '#435d7d'
                        }
                    }>
                        <FormGroup row>
                            <Col md="3" className="d-flex p-3">
                                <Label htmlFor="select-account"></Label>
                            </Col>
                            <Col xs="12" md="6">
                                <Input type="select" name="select-account"
                                    onChange={
                                        this.selectTypeChange
                                }>
                                    {
                                    listType.map((item, index) => {
                                      if(item.type != 0)
                                        return (
                                            <option value={
                                                item.type
                                            }>
                                                {
                                                item.typeName
                                            }</option>
                                        );
                                    })
                                } </Input>
                            </Col>
                        </FormGroup>
                        <Row>
                            <Col>
                                <Table responsive bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Số giao dịch</th>
                                            <th>Loại giao dịch</th>
                                            <th>Đối tác</th>
                                            <th>Số tiền</th>
                                            <th>Thời gian</th>
                                            <th>Khác</th>
                                        </tr>
                                    </thead>
                                    <tbody> {                                      
                                        this.state.transReceive.concat(this.state.transSend).concat(this.state.transDebt)
                                        .map((item, index) => {
                                          if(item.type == this.state.type || this.state.type == 0)
                                                return (
                                                    <tr>
                                                        <th scope="row">
                                                            {
                                                            stt++
                                                        }</th>
                                                        <td>
                                                            <a style={
                                                        {
                                                            fontFamily: 'Segoe UI',
                                                            fontSize: '16px'
                                                        }
                                                    } href= {'/transaction/detail?id=' + item.transaction_id}>
                                                                {
                                                                'trans_' + item.transaction_id
                                                            }</a>
                                                        </td>
                                                        <td style = {{color: item.type == 2 ? 'red' : item.type == 1 ? 'green' : 'blue'}}><b>{
                                                            item.typeName
                                                        }</b></td>
                                                        <td>{
                                                            item.partner_account_number
                                                        }</td>
                                                        <td>{
                                                            item.money
                                                        }</td>
                                                        <td>{
                                                            item.created_at
                                                        }</td>
                                                        <td>{
                                                            item.message
                                                        }</td>
                                                    </tr>
                                                );                                         
                                        })
                                    } </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
