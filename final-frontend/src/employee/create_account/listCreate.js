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
    Form,
    Button,
    TabPane,
    TabContent
} from "reactstrap";
import {GiHistogram} from "react-icons/gi";

export default class CreateForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 0,
            username: '',
            password: '',
            fullname: '',
            birthday: '',
            phone: '',
            email: '',
            customer_username: '',
            customer_account: ''
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange = async (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    createCustomer = async (e) => {
        e.preventDefault()
        DB.refreshToken()

        // Axios
        const reqBody = {
            username: this.state.username,
            password: this.state.password,
            fullname: this.state.fullname,
            birthday: this.state.birthday,
            phone: this.state.phone,
            email: this.state.email,
        }
        const response = await connector.post(`/user/employee/create-customer`, reqBody).then((response) => {
            console.log("response", response);
            if (response.data.message == 'Tạo thành công') {
                // Chuyển qua tab thông báo
                this.setState({activeTab: 1,customer_username: response.data.username, customer_account: response.data.account_number})
            } else {
                alert('Tạo thất bại!');
            }
        }, (error) => {
            console.log("Error! Tạo mới khách hàng: ", error.response);
            alert('Tạo thất bại!');
        });
    }

    render() { // Loại giao dịch
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
                            }>Tạo tài khoản</strong>
                        </Label>
                    </Col>
                </FormGroup>
                <TabContent activeTab={
                    this.state.activeTab
                }>
                    <TabPane tabId={0}>                        
                        <Form onSubmit={
                            this.createCustomer
                        }>
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
                                <strong></strong>
                            </CardHeader>
                                <CardHeader>
                                    <strong>Thông tin đăng nhập</strong>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label htmlFor="username">Tên đăng nhập</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input type="text" name="username"
                                                onChange={
                                                    this.onChange
                                                }
                                                value={
                                                    this.state.username
                                            }></Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label htmlFor="password">Mật khẩu</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input type="password" name="password"
                                                onChange={
                                                    this.onChange
                                                }
                                                value={
                                                    this.state.password
                                            }></Input>
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                                <CardHeader>
                                    <strong>Thông tin khách hàng</strong>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label htmlFor="fullname">Tên khách hàng</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input type="text" name="fullname"
                                                onChange={
                                                    this.onChange
                                                }
                                                value={
                                                    this.state.fullname
                                            }></Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label htmlFor="birthday">Ngày sinh</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input type="date" name="birthday"
                                                onChange={
                                                    this.onChange
                                                }
                                                value={
                                                    this.state.birthday
                                            }></Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label htmlFor="phone">Số điện thoại</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input type="text" name="phone"
                                                onChange={
                                                    this.onChange
                                                }
                                                value={
                                                    this.state.phone
                                            }></Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label htmlFor="email">Email</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input type="text" name="email"
                                                onChange={
                                                    this.onChange
                                                }
                                                value={
                                                    this.state.email
                                            }></Input>
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                            </Card>
                            <br/>
                            <div style={
                                {textAlign: 'center'}
                            }>
                                <Button disabled={false}>THÊM KHÁCH HÀNG</Button>
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
                                <strong>Ghi nhận thông tin</strong>
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
                                            }>Tạo mới khách hàng thành công</b>
                                        </Label>
                                        <br/>
                                        <Label>• Tài khoản đăng nhập: 
                                            <b style={
                                                    {
                                                        fontFamily: 'Segoe UI',
                                                        fontSize: '15px',
                                                        color: 'blue'
                                                    }
                                                }>
                                                {` ${this.state.customer_username}`}</b>
                                        </Label>                                        
                                        <br/><Label>• Số tài khoản: 
                                            <b style={
                                                    {
                                                        fontFamily: 'Segoe UI',
                                                        fontSize: '15px',
                                                        color: 'blue'
                                                    }
                                                }>
                                                {` ${this.state.customer_account}`}</b>
                                        </Label>                                        
                                        <br/>
                                        <Label>Quay lại
                                            <a style={
                                                    {
                                                        fontFamily: 'Segoe UI',
                                                        fontSize: '15px',
                                                        color: 'blue'
                                                    }
                                                }
                                                href={'/'}>
                                                {' trang chủ'}</a>
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
