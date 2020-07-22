import React from "react";
import DB from './../database/index';
import {connector} from "./../../callAxios";
import {AiOutlineDelete} from "react-icons/ai";
import {FaRegEdit} from "react-icons/fa";
import {
    Card,
    Col,
    Row,
    Table,
    CardBody,
    CardHeader
} from "reactstrap";

export default class receiversComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listReceivers: null
        }
        this.getDatabase = this.getDatabase.bind(this);
        this.actionEdit = this.actionEdit.bind(this);
        this.actionDelete = this.actionDelete.bind(this);
    }

    actionEdit(e) {
        e.preventDefault();
        alert('Chỉnh sửa thông tin');
    }

    actionDelete(e) {
        e.preventDefault();
        alert('Xóa người nhận');
    }

    getDatabase = async (e) => { // Refresh token để gọi backend trước
        DB.refreshToken();
        // Call axios
        const response = await connector.get("/list-receiver1", {}).then((response) => {
            console.log("response", response);
            let listReceivers = [];
            response.data.forEach(element => {
                listReceivers = listReceivers.concat([{
                        remind_name: element.remind_name,
                        number: element.receiver_account_number,
                        bankCode: element.bank_code
                    }]);
            });

            // Dữ liệu dạng thẻ html
            const html = listReceivers.map((item, index) => {
                return (<tr>
                    <th scope="row"> {
                        index + 1
                    }</th>
                    <td> {
                        item.number
                    }</td>
                    <td> {
                        item.remind_name
                    }</td>
                    <td> {
                        item.bankCode
                    }</td>
                    <td style={
                        {textAlign: 'center'}
                    }>
                        <button onClick={
                                this.actionEdit
                            }
                            style={
                                {
                                    fontSize: '24px',
                                    marginRight: '10px'
                                }
                        }><FaRegEdit/></button>
                        <button onClick={
                                this.actionDelete
                            }
                            style={
                                {
                                    fontSize: '24px',
                                    marginLeft: '10px'
                                }
                        }><AiOutlineDelete/></button>
                    </td>
                </tr>)
            })
            // Lưu vào state
            this.setState({listReceivers: html})
        }, (error) => {
            console.log("Error! Infor: ", error.response);
            alert('Lỗi xảy ra!');
        });
    }
    render = () => { // Lấy dữ liệu từ backend đưa vào trong state
        this.getDatabase();

        // Tải lên giao diện
        return (<div className="animated fadeIn">
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
                    <strong>Danh sách tài khoản người nhận</strong>
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
                                        <th>Tên gợi nhớ</th>
                                        <th>Ngân hàng</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody> {
                                    this.state.listReceivers
                                } </tbody>
                            </Table>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>);
    }
}
