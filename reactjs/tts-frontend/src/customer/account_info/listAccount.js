import React from "react";
import DB from "./../database/index";
import {connector} from "./../../callAxios";
import {
    Card,
    Col,
    Row,
    Table,
    CardBody,
    CardHeader
} from "reactstrap";

export default class accountsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listAccounts: null,
            loaded: false,
            timeout: new Date().getTime() + 5 * 1000
        }
        this.getDatabase = this.getDatabase.bind(this);
    }

    getDatabase = async (e) => { // Refresh token để gọi backend trước
        this.setState({loaded: true});
        DB.refreshToken();
        // Call axios
        const response = await connector.get("/account", {}).then((response) => {
            console.log("response", response);
            const listAccounts = [{
                    number: response.data.rows.account_number,
                    balance: response.data.rows.balance,
                    type: "Tài khoản thanh toán"
                }];

            // Dữ liệu dạng thẻ html
            const html = listAccounts.map((item, index) => {
                return (
                    <tr>
                        <th scope="row">
                            {
                            index + 1
                        }</th>
                        <td> {
                            item.number
                        }</td>
                        <td> {
                            item.balance
                        }</td>
                        <td> {
                            item.type
                        }</td>
                    </tr>
                )
            })
            // Lưu vào state
            this.setState({listAccounts: html})
        }, (error) => {
            console.log("Error! Infor: ", error.response);
            alert('Lỗi xảy ra!');
        });
    }

    render = () => { // Realtime
        if (new Date().getTime() > this.state.timeout || this.state.loaded == false) {
            this.setState({
                timeout: new Date().getTime() + 5 * 1000
            });
            this.getDatabase();
        } else {
            setTimeout(function () {
                this.setState({loaded: true});
            }.bind(this), 5000);
        }

        // Tải lên giao diện
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
                        <strong>Danh sách tài khoản</strong>
                    </CardHeader>
                    <CardBody style={
                        {
                            borderStyle: 'ridge',
                            borderColor: '#435d7d'
                        }
                    }>
                        <Row>
                            <Col>
                                <Table responsive bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Số tài khoản</th>
                                            <th>Số dư</th>
                                            <th>Loại tài khoản</th>
                                        </tr>
                                    </thead>
                                    <tbody> {
                                        this.state.listAccounts
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
