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

export default class RechargeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 1,
            username: '',
            account_number: '',
            money: '',
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange = async (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    useAccountNumber = async (e) => {
        this.setState({activeTab: 1})
    }

    useUsername = async (e) => {
        this.setState({activeTab: 2})
    }

    rechargeCustomer = async (e) => {
        e.preventDefault()
        DB.refreshToken()

        // Axios
        const reqBody = {
            username: this.state.username,
            account_number: this.state.account_number,
            money: this.state.money,
            type: this.state.activeTab,
        }
        const response = await connector.post(`/account/edit`, reqBody).then((response) => {
            console.log("response", response);
            // if (response.data.message == 'Tạo thành công') {
            if (true) {
                // Chuyển qua tab thông báo
                alert(response.data.status);
                this.setState({activeTab: 3})
            } else {
                alert('Nạp tài khoản thất bại!');
            }
        }, (error) => {
            console.log("Error! Nạp tài khoản khách hàng: ", error.response);
            alert('Lỗi nạp tài khoản thất bại!');
        });
    }

    render() {

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
                            }>Nạp tài khoản</strong>
                        </Label>
                    </Col>
                </FormGroup>
                <TabContent activeTab={
                    this.state.activeTab
                }>
                    <TabPane tabId={1}>
                    
                        <Form onSubmit={
                            this.rechargeCustomer
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
                                    <strong>Thông tin tài khoản</strong>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label htmlFor="account_number">Số tài khoản</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input type="text" name="account_number"
                                                onChange={
                                                    this.onChange
                                                }
                                                value={
                                                    this.state.account_number
                                            }></Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label style={
                                                    {
                                                        fontFamily: 'Segoe UI',
                                                        fontSize: '15px',
                                                        color: 'blue'
                                                    }
                                                } onClick={this.useUsername} htmlFor=""><b><i>Nạp bằng tên đăng nhập</i></b></Label>
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                                <CardHeader>
                                    <strong>Thông tin giao dịch</strong>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label htmlFor="money">Số tiền</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input type="number" name="money"
                                                onChange={
                                                    this.onChange
                                                }
                                                value={
                                                    this.state.money
                                            }></Input>
                                        </Col>
                                    </FormGroup>                                   
                                </CardBody>
                            </Card>
                            <br/>
                            <div style={
                                {textAlign: 'center'}
                            }>
                                <Button disabled={false}>NẠP TÀI KHOẢN</Button>
                            </div>
                        </Form>
                    </TabPane>
                    <TabPane tabId={2}>                    
                        <Form onSubmit={
                            this.rechargeCustomer
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
                                    <strong>Thông tin tài khoản</strong>
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
                                            <Label style={
                                                    {
                                                        fontFamily: 'Segoe UI',
                                                        fontSize: '15px',
                                                        color: 'blue'
                                                    }
                                                } onClick={this.useAccountNumber} htmlFor=""><b><i>Nạp bằng số tài khoản</i></b></Label>
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                                <CardHeader>
                                    <strong>Thông tin giao dịch</strong>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="3" className="d-flex p-3">
                                            <Label htmlFor="money">Số tiền</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input type="number" name="money"
                                                onChange={
                                                    this.onChange
                                                }
                                                value={
                                                    this.state.money
                                            }></Input>
                                        </Col>
                                    </FormGroup>                                   
                                </CardBody>
                            </Card>
                            <br/>
                            <div style={
                                {textAlign: 'center'}
                            }>
                                <Button disabled={false}>NẠP TÀI KHOẢN</Button>
                            </div>
                        </Form>
                    </TabPane>                     
                    <TabPane tabId={3}>
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
                                <strong>Nạp tài khoản</strong>
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
                                            }>Nạp tài khoản khách hàng thành công</b>
                                        </Label>
                                        <br/>
                                        <Label>• Quay lại
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
