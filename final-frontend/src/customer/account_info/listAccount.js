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
            listAccounts: [],
            listSavingAccounts: [],
            loaded: false,
            lasttime: new Date().getTime()
        }
        this.getDatabase = this.getDatabase.bind(this);
    }

    getDatabase = async (e) => { // Refresh token để gọi backend trước
        if (new Date().getTime() > this.state.lasttime + 5 * 1000 || this.state.loaded == false) {
            this.setState({loaded: true, lasttime: new Date().getTime()})
            DB.refreshToken();
            // Accounts
            const response = await connector.get("/account", {}).then((response) => {
                console.log("response", response);
                const listAccounts = [{
                        number: response.data.rows.account_number,
                        balance: response.data.rows.balance,
                        type: "Tài khoản thanh toán"
                    }];

                // Lưu vào state
                this.setState({listAccounts: listAccounts})
            }, (error) => {
                console.log("Error! Infor: ", error.response);
                const loi = 'Lỗi xảy ra. accessToken: ';
                const str = loi.concat(localStorage.getItem("accessToken"));
            });

            // SavingAccounts
            const response1 = await connector.get("/account-saving", {}).then((response) => {
                console.log("response", response);
                const listSavingAccounts = [{
                        number: response.data.rows.saving_account_number,
                        balance: response.data.rows.balance,
                        type: "Tài khoản tiết kiệm"
                    }];

                // Lưu vào state
                this.setState({listSavingAccounts: listSavingAccounts})
            }, (error) => {
                console.log("Error! Infor: ", error.response);
                const loi = 'Lỗi xảy ra. accessToken: ';
                const str = loi.concat(localStorage.getItem("accessToken"));
            });
        }
    }

    render = () => { // Realtime
        if (this.state.loaded == false)
            this.getDatabase();
        setTimeout(function () {
            this.getDatabase();
        }.bind(this), 10 * 1000);

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
                                        this.state.listAccounts.concat(this.state.listSavingAccounts).map((item, index) => {
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
                                                        DB.moneyToString(item.balance).concat(" VNĐ")
                                                    }</td>
                                                    <td> {
                                                        item.type
                                                    }</td>
                                                </tr>
                                            )
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
