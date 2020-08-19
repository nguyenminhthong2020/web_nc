import React, {useState} from 'react';
import DB from './../database/index';
import {connector} from "./../../callAxios";
import {} from 'reactstrap';
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
    constructor(props) {
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
        this.setState({[e.target.name]: e.target.value})
    }

    // Nhập thông tin giao dịch
    submitForm = async (e) => {
        e.preventDefault()

        // Cập nhật lại token
        DB.refreshToken()

        let result = '';

        // Kiểm tra điều kiện form
        if (this.state.new_password != this.state.retype_password) {
            result = 'Mật khẩu nhập lại không khớp';
        } else { // Thực hiện đổi mật khẩu
            const reqBody = {
                password: this.state.current_password,
                newPassword: this.state.new_password
            }

            const response = await connector.post(`/user/change-password`, reqBody).then((response) => {
                console.log("response", response);
                if (response.data.message == 'Cập nhật thành công.') { // Show message
                    result = 'Đổi mật khẩu thành công';
                } else { //
                }
            }, (error) => {
                console.log("Error! Đổi mật khẩu: ", error.response);
                result = 'Sai mật khẩu hiện tại';
            });
        }

        // Hiển thị kết quả
        if (result != 'Đổi mật khẩu thành công') { // Báo lỗi
            alert(result);
        } else { // Chuyển qua trang thông báo đổi mật khẩu thành công
            this.setState({activeTab: 1});
            window.scrollTo(0, 0);
        }
    }

    render() {
        return (
            <div>
                <TabContent activeTab={
                    this.state.activeTab
                }>
                    <TabPane tabId={0}>
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
                                <strong>Đổi mật khẩu</strong>
                            </CardHeader>
                        </Card>
                        <br/>
                        <Form onSubmit={
                            this.submitForm
                        }>
                            <Card>
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label htmlFor="current_password">Mật khẩu hiện tại</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input type="password" name="current_password"
                                                onChange={
                                                    this.onChange
                                                }
                                                value={
                                                    this.state.current_password
                                            }></Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label htmlFor="new_password">Mật khẩu mới</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input type="password" name="new_password"
                                                onChange={
                                                    this.onChange
                                                }
                                                value={
                                                    this.state.new_password
                                            }></Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label htmlFor="retype_password">Nhập lại mật khẩu mới</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input type="password" name="retype_password"
                                                onChange={
                                                    this.onChange
                                                }
                                                value={
                                                    this.state.retype_password
                                            }></Input>
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                            </Card>
                            {/* {Chuyển tiền}*/}
                            <br/>
                            <div style={
                                {textAlign: 'center'}
                            }>
                                <Button disabled={
                                    this.state.current_password == '' || this.state.new_password == '' || this.state.retype_password == ''
                                }>ĐỔI MẬT KHẨU</Button>
                            </div>
                        </Form>
                    </TabPane>
                    <TabPane tabId={1}>
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
                                <strong>Đổi mật khẩu</strong>
                            </CardHeader>
                        </Card>
                        <br/>
                        <Form onSubmit={
                            this.confirmForm
                        }>
                            <FormGroup>
                                <Card>
                                    <CardBody>
                                        <Label>
                                            <b style={
                                                {color: 'green'}
                                            }>Đổi mật khẩu thành công</b>
                                        </Label>
                                        <br/>
                                        <Label>•
                                            <a href={'/'}>Quay về trang chủ</a>
                                        </Label>
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
