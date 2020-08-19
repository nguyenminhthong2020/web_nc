import React from 'react';
import DB from '../database/index';
import {connector} from "./../../callAxios";
import {AiOutlineDelete} from "react-icons/ai";
import {MdPayment} from "react-icons/md";
import {FcAddDatabase} from "react-icons/fc"
import {FaRegEdit} from "react-icons/fa";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    Col,
    Row,
    Table,
    CardBody,
    CardHeader,
    TabContent,
    TabPane,
    NavItem,
    NavLink,
    Nav
} from "reactstrap";
import {lightBaseTheme} from 'material-ui/styles';

export default class debtsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 0,
            activeAddTab: 0,
            activePayTab: 0,
            numberReceiver: null,
            nameReceiver: '',
            money: null,
            message: '',
            code: '125765',
            time: Date('05052020'),
            listDebts1: [],
            listDebts2: [],
            listReceivers: [],
            loaded: false,
            lasttime: new Date().getTime(),
            codeTransaction1: '',
            idTransaction1: null,
            codeTransaction2: '',
            idTransaction2: null,
            notify_message: '',
            otp_id: '',
            otp: '',
            email: '',
            notify_id: '',
            debt_id_pay: ''
        }
        this.onChange = this.onChange.bind(this);
        this.selectReceiverChange = this.selectReceiverChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.ActionAdd = this.ActionAdd.bind(this);
        this.getDatabase = this.getDatabase.bind(this);
        this.actionDelete1 = this.actionDelete1.bind(this);

    }
    onChange = async (e) => {
        this.setState({[e.target.name]: e.target.value})
        // Nếu sự kiện ở thẻ Input Account Receiver thì thay đổi giá trị Name Receiver và làm rỗng thẻ gợi ý
        if (e.target.name == "numberReceiver") { // Call axios
            const response = await connector.get(`/account/${
                e.target.value
            }`, {}).then((response) => {
                console.log("response", response);
                let nameReceiver = '';
                if (response.data.status == 'OK') {
                    nameReceiver = response.data.fullname;
                }
                // Lưu vào state
                this.setState({nameReceiver: nameReceiver})
            }, (error) => {
                console.log("Error! Infor: ", error.response);
            });

            // value = 0 ứng với option gợi ý (dòng 155)
            document.getElementById('selectReceiver').value = '0';
        }
    }

    selectReceiverChange = async (e) => {
        const numberReceiver = e.target.value;
        let nameReceiver;
        // Call axios
        const response = await connector.get(`/account/${numberReceiver}`, {}).then((response) => {
            console.log("response", response);
            if (response.data.status == 'OK') {
                nameReceiver = response.data.fullname;
            }
            // Lưu vào state
            this.setState({nameReceiver: nameReceiver, numberReceiver: numberReceiver})
        }, (error) => {
            console.log("Error! Infor: ", error.response);
        });
    }

    setActiveTab(val) {
        this.setState({activeTab: val})
    }

    actionPay = async (debt_id) => { // Open form
        const {formID} = document.forms;
        formID.reset();

        // Gửi yêu cầu để lấy mã OTP cho form Pay
        const reqBody = {
            debt_id: `${debt_id}`
        }
        const response = await connector.post(`/transfer-debt`, reqBody).then((response) => {
            console.log("response", response);
            if (response.data.status == 'OK') {
                this.setState({activePayTab: 0, otp_id: response.data.data.otp_id, email: response.data.data.email, otp: '', debt_id_pay: debt_id});
                document.getElementById('formPay').style.display = "block";
                window.scrollTo(0, 300);
            }
        }, (error) => {
            console.log("Error! Lấy OTP thanh toán nhắc nợ: ", error.response);
        });
    }

    ActionCancelPayForm(e) {
        e.preventDefault();
        document.getElementById('formPay').style.display = "none";
        // document.getElementById('main').style.display = "block";
    }

    submitPayForm = async (e) => {
        e.preventDefault();

        // Xử lí
        const {email, otp_id} = this.state;
        const reqBody = {
            otp: this.state.otp,
            debt_id : this.state.debt_id_pay
        }
        connector.interceptors.request.use(function (config) {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                config.headers["x-access-token"] = accessToken;
                config.headers["otp_id"] = otp_id;
                config.headers["email"] = email;
            }
            console.log(config);
            return config;
        }, function (error) {
            console.log(error);
            return Promise.reject(error);
        });
        const response = await connector.post(`/transfer-debt/confirm`, reqBody).then((response) => {
            console.log("response", response);
            if (response.data.status == 'DONE') { // Chuyển sang màn hình giao dịch thành công
                this.setState({activePayTab: 1, notify_id: response.data.notify_id});
                window.scrollTo(0, 0);
            } else {
                alert('Giao dịch thất bại');
            }
        }, (error) => {
            document.getElementById('formPay').style.display = "none";
            console.log("Error transfer debt! Infor: ", error.response);
        });
    }

    actionDelete1 = async (idTransaction, codeTransaction) => { // Open form
        const {formID} = document.forms;
        formID.reset();
        document.getElementById('formDelete1').style.display = "block";

        // Lấy giá trị STK
        this.setState({idTransaction1: idTransaction, codeTransaction1: codeTransaction, notify_message: ''});
        document.getElementById('formDelete1').focus();

    }

    ActionCancelDeleteForm1(e) {
        e.preventDefault();
        document.getElementById('formDelete1').style.display = "none";
        // document.getElementById('main').style.display = "block";
    }

    submitDeleteForm1 = async (e) => {
        e.preventDefault()
        // Thực hiện sửa tên gợi nhớ
        // alert(this.state.numberReceiver);
        const reqBody = {
            notify_message: this.state.notify_message
        }

        const response = await connector.post(`/debt/delete1/${
            this.state.idTransaction1
        }`, reqBody).then((response) => {
            console.log("response", response);
            if (response.data.status == 'OK') { // Show message
                alert('Xóa thành công!');
            } else {
                // alert('Xóa thất bại!');
            }
        }, (error) => {
            console.log("Error! Xóa nhắc nợ: ", error.response);
        });

        this.getDatabase();
        // Đóng form
        document.getElementById('formDelete1').style.display = "none";
    }

    actionDelete2 = async (idTransaction, codeTransaction) => { // Open form
        const {formID} = document.forms;
        formID.reset();
        document.getElementById('formDelete2').style.display = "block";

        // Lấy giá trị STK
        this.setState({idTransaction2: idTransaction, codeTransaction2: codeTransaction, notify_message: ''});
        document.getElementById('formDelete2').focus();

    }

    ActionCancelDeleteForm2(e) {
        e.preventDefault();
        document.getElementById('formDelete2').style.display = "none";
        // document.getElementById('main').style.display = "block";
    }

    submitDeleteForm2 = async (e) => {
        e.preventDefault()
        // Thực hiện sửa tên gợi nhớ
        // alert(this.state.numberReceiver);
        const reqBody = {
            notify_message: this.state.notify_message
        }

        const response = await connector.post(`/debt/delete2/${
            this.state.idTransaction2
        }`, reqBody).then((response) => {
            console.log("response", response);
            if (response.data.status == 'OK') { // Show message
                alert('Xóa thành công!');
            } else {
                // alert('Xóa thất bại!');
            }
        }, (error) => {
            console.log("Error! Xóa nhắc nợ: ", error.response);
        });

        this.getDatabase();
        // Đóng form
        document.getElementById('formDelete2').style.display = "none";
    }

    ActionAdd(e) {
        e.preventDefault();
        // Mở và xóa rỗng form thêm nhắc nợ
        this.setState({activeAddTab: 0, numberReceiver: '', nameReceiver : '', money: null, message : ''});
        const {formID} = document.forms;
        formID.reset();
        document.getElementById('formAdd').style.display = "block";
        document.getElementById('formAdd').focus();
    }

    submitForm = async (e) => {
        e.preventDefault()
        // Thực hiện gửi nhắc nợ
        const reqBody = {
            debtor_account_number: this.state.numberReceiver,
            money: this.state.money,
            message: this.state.message
        }
        const response = await connector.post(`/debt/create`, reqBody).then((response) => {
            console.log("response", response);
            if (response.data.status == 'OK') {
                this.setState({code: response.data.debt_id})
            }
        }, (error) => {
            console.log("Error! Gửi nhắc nợ: ", error.response);
        });

        // Cập nhật dữ liệu
        this.getDatabase();

        // Chuyển qua màn hình thông báo
        this.setState({activeAddTab: 1});
    }


    ActionCancelForm(e) {
        e.preventDefault();
        document.getElementById('formAdd').style.display = "none";
        // document.getElementById('main').style.display = "block";

    }

    getDatabase = async (e) => { // Refresh token để gọi backend trước
        if (new Date().getTime() > this.state.lasttime + 5 * 1000 || this.state.loaded == false) {
            this.setState({loaded: true, lasttime: new Date().getTime()})
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

                // Lưu vào state
                this.setState({listReceivers: listReceivers})
            }, (error) => {
                console.log("Error! Infor: ", error.response);
            });
            const response1 = await connector.get("/debt/view1", {}).then((response) => {
                console.log("response", response);
                let listDebts1 = [];
                response.data.forEach(element => {
                    listDebts1 = listDebts1.concat([{
                            id: element.debt_id,
                            code: element._id,
                            number: element.debtor_account_number,
                            name: element.debtor_fullname,
                            money: element.money,
                            content: element.message,
                            time: element.created_at
                        }]);
                });

                // Lưu vào state
                this.setState({listDebts1: listDebts1})
            }, (error) => {
                console.log("Error! Infor: ", error.response);
            });
            const response2 = await connector.get("/debt/view2", {}).then((response) => {
                console.log("response", response);
                let listDebts2 = [];
                response.data.forEach(element => {
                    listDebts2 = listDebts2.concat([{
                            id: element.debt_id,
                            code: element._id,
                            number: element.creditor_account_number,
                            name: element.creditor_fullname, // lỗi thiếu db, đúng ra là creditor_fullname
                            money: element.money,
                            content: element.message,
                            time: element.created_at
                        }]);
                });

                // Lưu vào state
                this.setState({listDebts2: listDebts2})
            }, (error) => {
                console.log("Error! Infor: ", error.response);
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
            <div>
                <div id={'main'}>
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
                            <strong>Quản lý nhắc nợ</strong>
                        </CardHeader>
                        <CardBody style={
                            {
                                borderStyle: 'ridge',
                                borderColor: '#435d7d'
                            }
                        }>
                            <FormGroup row>
                                <Col xs="12" md="6">
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink active={
                                                    this.state.activeTab === 0
                                                }
                                                onClick={
                                                    () => this.setActiveTab(0)
                                            }>
                                                <b style={
                                                    {
                                                        fontFamily: 'Segoe UI',
                                                        fontSize: '15px'
                                                    }
                                                }>Nhắc nợ đã tạo</b>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink active={
                                                    this.state.activeTab === 1
                                                }
                                                onClick={
                                                    () => this.setActiveTab(1)
                                            }>
                                                <b style={
                                                    {
                                                        fontFamily: 'Segoe UI',
                                                        fontSize: '15px'
                                                    }
                                                }>Nhắc nợ đã nhận</b>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Col>
                                <Col>
                                    <button onClick={
                                            this.ActionAdd
                                        }
                                        style={
                                            {
                                                position: 'absolute',
                                                right: '20px',
                                                fontSize: '30px'
                                            }
                                    }><FcAddDatabase/></button>
                                </Col>
                            </FormGroup>
                            <TabContent activeTab={
                                this.state.activeTab
                            }>
                                <TabPane tabId={0}>
                                    <Row>
                                        <Col>
                                            <Table responsive bordered>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Chủ khoản</th>
                                                        <th>Số tài khoản</th>
                                                        <th>Số tiền</th>
                                                        <th>Nội dung</th>
                                                        <th style={
                                                            {width: '12%'}
                                                        }></th>
                                                    </tr>
                                                </thead>
                                                <tbody> {
                                                    this.state.listDebts1.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">
                                                                    <a href={
                                                                            "/debt-detail?id=" + item.id
                                                                        }
                                                                        style={
                                                                            {
                                                                                fontSize: '15px',
                                                                                color: '#6c757d',
                                                                                textDecorationLine: 'underline'
                                                                            }
                                                                    }>
                                                                        {
                                                                        item.id
                                                                    }</a>
                                                                </th>
                                                                <td> {
                                                                    item.name
                                                                }</td>
                                                                <td> {
                                                                    item.number
                                                                }</td>
                                                                <td> {
                                                                    item.money
                                                                }</td>
                                                                <td> {
                                                                    item.content
                                                                }</td>
                                                                <td style={
                                                                    {textAlign: 'center'}
                                                                }>
                                                                    <button onClick={
                                                                            () => {
                                                                                this.actionDelete2(item.id, item.code)
                                                                            }
                                                                        }
                                                                        style={
                                                                            {
                                                                                fontSize: '18px',
                                                                                marginLeft: '7px'
                                                                            }
                                                                    }><AiOutlineDelete/></button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                } </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId={1}>
                                    <Row>
                                        <Col>
                                            <Table responsive bordered>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Chủ khoản</th>
                                                        <th>Số tài khoản</th>
                                                        <th>Số tiền</th>
                                                        <th>Nội dung</th>
                                                        <th style={
                                                            {width: '12%'}
                                                        }></th>
                                                    </tr>
                                                </thead>
                                                <tbody> {
                                                    this.state.listDebts2.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">
                                                                    <a href={
                                                                            "/debt-detail?id=" + item.id
                                                                        }
                                                                        style={
                                                                            {
                                                                                fontSize: '15px',
                                                                                color: '#6c757d',
                                                                                textDecorationLine: 'underline'
                                                                            }
                                                                    }>
                                                                        {
                                                                        item.id
                                                                    }</a>
                                                                </th>
                                                                <td> {
                                                                    item.name
                                                                }</td>
                                                                <td> {
                                                                    item.number
                                                                }</td>
                                                                <td> {
                                                                    item.money
                                                                }</td>
                                                                <td> {
                                                                    item.content
                                                                }</td>
                                                                <td style={
                                                                    {textAlign: 'center'}
                                                                }>
                                                                    <button onClick={
                                                                            () => this.actionPay(item.id)
                                                                        }
                                                                        style={
                                                                            {
                                                                                fontSize: '18px',
                                                                                marginRight: '7px'
                                                                            }
                                                                    }><MdPayment/></button>
                                                                    <button value={
                                                                            item.id
                                                                        }
                                                                        onClick={
                                                                            () => this.actionDelete1(item.id, item.code)
                                                                        }
                                                                        style={
                                                                            {
                                                                                fontSize: '18px',
                                                                                marginLeft: '7px'
                                                                            }
                                                                    }><AiOutlineDelete/></button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                } </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </div>
                <div id={'formAdd'}
                    style={
                        {
                            display: 'none',
                            border: '2px solid green',
                            borderRadius: '5px',
                            padding: '2em',
                            width: '80%',
                            textAlign: 'center',
                            backgroundColor: 'white',
                            position: 'absolute',
                            zIndex: '1',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)'
                        }
                }>
                    <TabContent activeTab={
                        this.state.activeAddTab
                    }>
                        <TabPane tabId={0}>
                            <Card style={
                                {
                                    backgroundColor: 'green',
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: '18px'
                                }
                            }>
                                <strong style={
                                    {fontSize: '22px'}
                                }>GỬI NHẮC NỢ</strong>
                            </Card>
                            <br/>
                            <Form id={'formID'}
                                onSubmit={
                                    this.submitForm
                            }>
                                <Card>
                                    <CardHeader>
                                        <strong>Thông tin người nhận</strong>
                                    </CardHeader>
                                    <CardBody>
                                        <FormGroup row>
                                            <Col md="3" className="d-flex p-3">
                                                <Label htmlFor="selectReceiver">Tài khoản gợi ý</Label>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <Input type="select" name="selectReceiver" id="selectReceiver"
                                                    onChange={
                                                        this.selectReceiverChange
                                                }>
                                                    {
                                                    [{
                                                            remind_name: "Chọn tài khoản gợi nhớ",
                                                            number: 0,
                                                            bankCode: '0'
                                                        }].concat(this.state.listReceivers).map((item, index) => {
                                                        if (item.bankCode == "GO" || item.remind_name == "Chọn tài khoản gợi nhớ") 
                                                            return(index == 0) ? (
                                                                <option value={
                                                                    item.number
                                                                }>
                                                                    {
                                                                    item.remind_name
                                                                }</option>
                                                            ) : (
                                                                <option value={
                                                                    item.number
                                                                }>
                                                                    {
                                                                    item.number + ' '
                                                                }
                                                                    - {
                                                                    item.remind_name
                                                                }</option>
                                                            );
                                                        

                                                    })
                                                } </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3" className="d-flex p-3">
                                                <Label htmlFor="numberReceiver">Số tài khoản</Label>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <Input type="text" name="numberReceiver"
                                                    onChange={
                                                        this.onChange
                                                    }
                                                    value={
                                                        this.state.numberReceiver
                                                }></Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3" className="d-flex">
                                                <Label>Chủ tài khoản</Label>
                                            </Col>
                                            <Col xs="12" md="5">
                                                <Label> {
                                                    this.state.nameReceiver
                                                }</Label>
                                            </Col>
                                        </FormGroup>
                                    </CardBody>
                                    <CardHeader>
                                        <strong>THÔNG TIN NHẮC NỢ</strong>
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
                                        <FormGroup row>
                                            <Col md="3" className="d-flex p-3">
                                                <Label htmlFor="message">Nội dung nhắc nợ</Label>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <Input type="text" name="message"
                                                    onChange={
                                                        this.onChange
                                                    }
                                                    value={
                                                        this.state.message
                                                }></Input>
                                            </Col>
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                                {/* {Gửi nhắc nợ}*/}
                                <br/>
                                <div style={
                                    {textAlign: 'center'}
                                }>
                                    <Button type={'submit'}
                                        disabled={
                                            this.state.nameReceiver == '' || this.state.money == null || this.state.money == ''
                                    }>GỬI NHẮC NỢ</Button>
                                    <Button onClick={
                                            this.ActionCancelForm
                                        }
                                        style={
                                            {marginLeft: '5px'}
                                    }>ĐÓNG</Button>
                                </div>
                            </Form>
                        </TabPane>
                        <TabPane tabId={1}>
                            <Card style={
                                {
                                    backgroundColor: 'green',
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: '18px'
                                }
                            }>
                                <strong style={
                                    {fontSize: '22px'}
                                }>Chi tiết giao dịch</strong>
                            </Card>
                            <br/>
                            <Form onSubmit={
                                    this.submitForm
                                }
                                style={
                                    {textAlign: 'left'}
                            }>
                                <FormGroup>
                                    <Card>
                                        <CardBody>
                                            <Label>
                                                <b style={
                                                    {color: 'green'}
                                                }>Tình trạng</b>
                                            </Label>
                                            <br/>
                                            <Label>• Gửi nhắc nợ thành công</Label>
                                        </CardBody>
                                    </Card>
                                </FormGroup>
                                <FormGroup>
                                    <Card>
                                        <CardBody>
                                            <Label>
                                                <b style={
                                                    {color: 'green'}
                                                }>Thông tin giao dịch</b>
                                            </Label>
                                            <br/>
                                            <Label>• Mã giao dịch:
                                                <a href= {'/transaction/detail?id=' + this.state.code}>
                                                    <b style={
                                                        {fontSize: '13px'}
                                                    }>
                                                        {
                                                        ` ${
                                                            this.state.code
                                                        }`
                                                    }</b>
                                                </a>
                                            </Label>
                                            <br/>
                                            <Label>• {
                                                this.state.time
                                            }</Label>
                                        </CardBody>
                                    </Card>
                                </FormGroup>
                                <FormGroup>
                                    <Card>
                                        <CardBody>
                                            <Label>
                                                <b style={
                                                    {color: 'green'}
                                                }>Thông tin người nhận</b>
                                            </Label>
                                            <br/>
                                            <Label>• Số tài khoản: {
                                                this.state.numberReceiver
                                            }</Label>
                                            <br/>
                                            <Label>• Chủ tài khoản: {
                                                this.state.nameReceiver
                                            }</Label>
                                        </CardBody>
                                    </Card>
                                </FormGroup>
                                <FormGroup>
                                    <Card>
                                        <CardBody>
                                            <Label>
                                                <b style={
                                                    {color: 'green'}
                                                }>Thông tin nhắc nợ</b>
                                            </Label>
                                            <br/>
                                            <Label>• Số tiền: {
                                                `${
                                                    this.state.money
                                                } `
                                            }
                                                VNĐ</Label>
                                            <br/>
                                            <Label>• Nội dung nhắc nợ: {
                                                this.state.message
                                            }</Label>
                                        </CardBody>
                                    </Card>
                                </FormGroup>
                                {/* {Chuyển tiền}*/}
                                <br/>
                                <div style={
                                    {textAlign: 'center'}
                                }>
                                    <Button onClick={
                                            this.ActionCancelForm
                                        }
                                        style={
                                            {marginLeft: '5px'}
                                    }>ĐÓNG</Button>
                                </div>
                            </Form>
                        </TabPane>
                    </TabContent>
                </div>
                <div id={'formDelete1'}
                    style={
                        {
                            display: 'none',
                            border: '2px solid green',
                            borderRadius: '5px',
                            padding: '2em',
                            width: '80%',
                            textAlign: 'center',
                            backgroundColor: 'white',
                            position: 'absolute',
                            zIndex: '1',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)'
                        }
                }>
                    <Form id={'formID'}
                        onSubmit={
                            this.submitDeleteForm1
                    }>
                        <Card>
                            <CardHeader>
                                <b style={
                                    {
                                        fontStyle: 'italic',
                                        fontSize: '18px'
                                    }
                                }>Mã giao dịch: <u style={
                                    {
                                        color: 'red'
                                    }
                                }>{
                                    this.state.codeTransaction1
                                }</u></b>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3" className="d-flex p-3">
                                        <Label>Lời nhắn</Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Input type="text" name="notify_message"
                                            onChange={
                                                this.onChange
                                            }
                                            value={
                                                this.state.notify_message
                                        }></Input>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                        </Card>
                        {/* {Thêm người nhận}*/}
                        <br/>
                        <div style={
                            {textAlign: 'center'}
                        }>
                            <Button type={'submit'}
                                disabled={false}>GỬI</Button>
                            <Button onClick={
                                    this.ActionCancelDeleteForm1
                                }
                                style={
                                    {marginLeft: '5px'}
                            }>ĐÓNG</Button>
                        </div>
                    </Form>
                </div>
                <div id={'formDelete2'}
                    style={
                        {
                            display: 'none',
                            border: '2px solid green',
                            borderRadius: '5px',
                            padding: '2em',
                            width: '80%',
                            textAlign: 'center',
                            backgroundColor: 'white',
                            position: 'absolute',
                            zIndex: '1',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)'
                        }
                }>
                    <Form id={'formID'}
                        onSubmit={
                            this.submitDeleteForm2
                    }>
                        <Card>
                            <CardHeader>
                                <b style={
                                    {
                                        fontStyle: 'italic',
                                        fontSize: '18px'
                                    }
                                }>Mã giao dịch: <u style={
                                    {
                                        color: 'red'
                                    }
                                }>{
                                    this.state.codeTransaction2
                                }</u></b>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3" className="d-flex p-3">
                                        <Label>Lời nhắn</Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Input type="text" name="notify_message"
                                            onChange={
                                                this.onChange
                                            }
                                            value={
                                                this.state.notify_message
                                        }></Input>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                        </Card>
                        {/* {Thêm người nhận}*/}
                        <br/>
                        <div style={
                            {textAlign: 'center'}
                        }>
                            <Button type={'submit'}
                                disabled={false}>GỬI</Button>
                            <Button onClick={
                                    this.ActionCancelDeleteForm2
                                }
                                style={
                                    {marginLeft: '5px'}
                            }>ĐÓNG</Button>
                        </div>
                    </Form>
                </div>
                <div id={'formPay'}
                    style={
                        {
                            display: 'none',
                            border: '2px solid green',
                            borderRadius: '5px',
                            padding: '2em',
                            width: '80%',
                            textAlign: 'center',
                            backgroundColor: 'white',
                            position: 'absolute',
                            zIndex: '1',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)'
                        }
                }>
                    <TabContent activeTab={
                        this.state.activePayTab
                    }>
                        <TabPane tabId={0}>
                        <Form id={'formID'}
                        onSubmit={
                            this.submitPayForm
                    }>
                        <Card>
                            <CardHeader>
                                <b style={
                                    {
                                        fontStyle: 'italic',
                                        fontSize: '18px'
                                    }
                                }>Mã giao dịch: <u style={
                                    {
                                        color: 'red'
                                    }
                                }>{
                                    this.state.debt_id_pay
                                }</u></b>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3" className="d-flex p-3">
                                        <Label>OTP</Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Input type="text" name="otp"
                                            onChange={
                                                this.onChange
                                            }
                                            value={
                                                this.state.otp
                                        }></Input>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                        </Card>
                        {/* {Thêm người nhận}*/}
                        <br/>
                        <div style={
                            {textAlign: 'center'}
                        }>
                            <Button type={'submit'}
                                disabled={false}>GỬI</Button>
                            <Button onClick={
                                    this.ActionCancelPayForm
                                }
                                style={
                                    {marginLeft: '5px'}
                            }>ĐÓNG</Button>
                        </div>
                    </Form>
                    </TabPane>
                        <TabPane tabId={1}>
                            <Card style={
                                {
                                    backgroundColor: 'green',
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: '18px'
                                }
                            }>
                                <strong style={
                                    {fontSize: '22px'}
                                }>Chi tiết giao dịch</strong>
                            </Card>
                            <br/>
                            <Form onSubmit={
                                    this.submitForm
                                }
                                style={
                                    {textAlign: 'left'}
                            }>
                                <FormGroup>
                                    <Card>
                                        <CardBody>
                                            <Label>
                                                <b style={
                                                    {color: 'green'}
                                                }>Tình trạng</b>
                                            </Label>
                                            <br/>
                                            <Label>• Thanh toán nhắc nợ thành công</Label>
                                        </CardBody>
                                    </Card>
                                </FormGroup>
                                <FormGroup>
                                    <Card>
                                        <CardBody>
                                            <Label>
                                                <b style={
                                                    {color: 'green'}
                                                }>Thông tin giao dịch</b>
                                            </Label>
                                            <br/>
                                            <Label>• Notify ID:
                                                    <b style={
                                                        {fontSize: '13px'}
                                                    }>
                                                        {
                                                        ` ${
                                                            this.state.notify_id
                                                        }`
                                                    }</b>
                                            </Label>
                                            <br/>
                                            <Label>• {
                                                this.state.time
                                            }</Label>
                                        </CardBody>
                                    </Card>
                                </FormGroup>
                                <br/>
                                <div style={
                                    {textAlign: 'center'}
                                }>
                                    <Button onClick={
                                            this.ActionCancelPayForm
                                        }
                                        style={
                                            {marginLeft: '5px'}
                                    }>ĐÓNG</Button>
                                </div>
                            </Form>
                        </TabPane>
                    </TabContent>
                
                </div>
            </div>
        );
    }
}
