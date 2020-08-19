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
    Input,
    Button
} from "reactstrap";
import {GiHistogram} from "react-icons/gi";
import { BsSearch } from "react-icons/bs";


export default class TransactionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 0,
            listBanks: DB.listBanks(),
            bank_code: 'All',
            start: '',
            end: '',
            loaded: false,
            lasttime: new Date().getTime(),
            transAll: [],
            type: 1,
            total_money: 0
        }
        this.onChange = this.onChange.bind(this);
        this.selectBankChange = this.selectBankChange.bind(this);
    }

    onChange = async (e) => {
        this.setState({[e.target.name]: e.target.value})
        // Nếu sự kiện ở thẻ Input Account Receiver thì thay đổi giá trị Name Receiver và làm rỗng thẻ gợi ý
        if (e.target.name == "numberCustomer") {
            // Call axios
            // Xóa rỗng nameReceiver
            // this.setState({nameReceiver: ''});
        }
    }

    selectBankChange(e) {
        const bankSelected = e.target.value;
        // Set state
        this.setState({bank_code: bankSelected})
    }


    filter = async (e) => {
        DB.refreshToken();

        const reqBody = {
            start: this.state.start,
            end: this.state.end,
            bank_code: this.state.bank_code
        }
        const response = await connector.post(`/transaction/admin2/`, reqBody).then((response) => {
            if (response.data.status == 'OK') {
                console.log("response", response);
                let transAll = [];
                let total_money = 0;
                response.data.data.forEach(item => {
                    transAll = transAll.concat([{
                        transaction_id: item.transaction_id,
                        sender_account_number: item.sender_account_number,
                        receiver_account_number: item.receiver_account_number,
                        sender_bank_code: item.sender_bank_code,
                        receive_bank_code: item.receive_bank_code,
                        money: item.money,
                        message: item.message, // Nội dung cần chuyển, Ví dụ: "gửi trả nợ cho ông A"
                        created_at: item.created_at
                    }]);
                    total_money += item.money;
                })
                
                this.setState({transAll: transAll, total_money: total_money})
            }
        }, (error) => {
            console.log("Error! Infor: ", error.response);
            // alert('Lỗi xảy ra viewTrans admin');
        })
    }


    render() { // Loại giao dịch
        

        // Lịch sử giao dịch
        let stt = 1;

        // Return
        return (
            <div className="animated fadeIn">
                <FormGroup row>
                    <Col md="12" className="d-flex p-3">
                        <Label htmlFor="numberCustomer"><GiHistogram style={
                                {
                                    fontSize: '24px',
                                    marginLeft: '10px'
                                }
                            }/><strong style={
                                {
                                    marginLeft: '30px',
                                    fontFamily: 'Segoe UI',
                                    fontSize: '20px',
                                    textDecoration: 'underline overline'
                                }
                            }>Lịch sử giao dịch</strong>
                        </Label>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="2" className="d-flex p-3">                        
                        <Label style={
                                {marginLeft: '30px'}
                            }
                            htmlFor="selectBank">
                            <b>Ngân hàng đối tác</b>
                        </Label>
                    </Col>
                    <Col xs="3" md="3">
                        <Input type="select" name="selectBank" id="selectBank"
                            onChange={
                                this.selectBankChange
                        }>
                            {
                            [{
                                bankCode: "All",
                                name: "Tất cả",
                                type: "",
                                secretKey: ""
                            }].concat(this.state.listBanks).map((item, index) => {
                                if (item.bankCode != 'GO') 
                                    return (
                                        <option value={
                                            item.bankCode
                                        }>
                                            {
                                            item.name
                                        }</option>
                                    );                             


                            })
                        } </Input>
                    </Col>
                    <Col md="1" className="d-flex p-3">
                        <Label style={
                                {marginLeft: '30px'}
                            }
                            htmlFor="start">
                            <b>Từ</b>
                        </Label>
                    </Col>
                    <Col xs="2" md="2">
                        <Input type="date" name="start"
                            onChange={
                                this.onChange
                            }
                            value={
                                this.state.start
                        }></Input>
                    </Col>
                    <Col md="1" className="d-flex p-3">
                        <Label style={
                                {marginLeft: '30px'}
                            }
                            htmlFor="end">
                            <b>Đến</b>
                        </Label>
                    </Col>
                    <Col xs="2" md="2">
                        <Input type="date" name="end"
                            onChange={
                                this.onChange
                            }
                            value={
                                this.state.end
                        }></Input>
                    </Col>
                    <Col xs="1" md="1">
                    <button style = {{padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '3px', backgroundColor: 'white',  color: 'black',  border: '3px solid #435d7d', marginLeft: '20px'}} onClick = {this.filter}>
                            <BsSearch/>
                        </button>
                    </Col>
                </FormGroup>
                

                <Card style={
                    {borderStyle: 'none'}
                }>
                    <CardBody style={
                        {
                            borderStyle: 'ridge',
                            borderColor: '#435d7d'
                        }
                    }>
                        <Label style={
                                {marginLeft: '3px'}
                            }
                            htmlFor="selectBank">
                            <b>{`Tổng số tiền giao dịch: ${DB.moneyToString(this.state.total_money)} VNĐ`}</b>
                        </Label>
                        <Row>
                            <Col>
                                <Table responsive bordered>
                                    <thead>
                                    <tr style = {{backgroundColor: '#435d7d', color: 'white'}}>
                                            <th>#</th>
                                            <th>Số giao dịch</th>
                                            <th>Tài khoản gửi</th>
                                            <th>Tài khoản nhận</th>
                                            <th>Số tiền</th>
                                            <th>Thời gian</th>
                                            <th>Nội dung</th>
                                        </tr>
                                    </thead>
                                    <tbody> {
                                        this.state.transAll.map((item, index) => {
                                            if (item.sender_bank_code == 'GO') 
                                            {
                                                return (
                                                    <tr style = {{backgroundColor: '#e6bdae'}}>
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
                                                                }
                                                                href=
                                                                {'/transaction/detail?id=' + item.transaction_id}>
                                                                {
                                                                'trans_' + item.transaction_id
                                                            }</a>
                                                        </td>
                                                        <td>{
                                                            item.sender_account_number
                                                        }</td>
                                                        <td>{
                                                            item.receiver_account_number
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
                                                )
                                            }
                                            else
                                            {
                                                return (
                                                    <tr style = {{backgroundColor: '#b3d3ea'}}>
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
                                                                }
                                                                href=
                                                                {'/transaction/detail?id=' + item.transaction_id}>
                                                                {
                                                                'trans_' + item.transaction_id
                                                            }</a>
                                                        </td>
                                                        <td>{
                                                            item.sender_account_number
                                                        }</td>
                                                        <td>{
                                                            item.receiver_account_number
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
                                                )
                                            }                                           
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
