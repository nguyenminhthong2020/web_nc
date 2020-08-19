import React, {useState} from 'react';
import DB from './../database/index';
import {connector} from "./../../callAxios";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Card,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
    CardBody,
    CardHeader,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Collapse,
    TabContent,
    TabPane
} from "reactstrap";
import {MdNote} from 'react-icons/md';

export default class TransferForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listAccounts: [],
            listReceivers: [],
            loaded: false,
            lasttime: new Date().getTime(),
            activeTab: 0,
            numberAccount: '',
            balanceAccount: 0,
            numberReceiver: null,
            nameReceiver: '',
            remindReceiver: '',
            money: 0,
            message: '',
            method: 0,
            otp: '',
            otp_id: '',
            email: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.selectAccountChange = this.selectAccountChange.bind(this);
        this.selectReceiverChange = this.selectReceiverChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.confirmForm = this.confirmForm.bind(this);
        this.getDatabase = this.getDatabase.bind(this);
    }

    onChange = async (e) => {
        this.setState({[e.target.name]: e.target.value})

        // Nếu sự kiện ở thẻ Input Account Receiver thì thay đổi giá trị Name Receiver và làm rỗng thẻ gợi ý
        if (e.target.name == "numberReceiver") { // value = 0 ứng với option gợi ý
            document.getElementById('selectReceiver').value = '0';
            // Xóa rỗng nameReceiver
            this.setState({nameReceiver: ''});
        }
    }

    onKeyDown = async (e) => {
        if (e.key === 'Enter') { // Call axios
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
                alert('Lỗi xảy ra ở transForm.js 70!');
            });

            // value = 0 ứng với option gợi ý (dòng 155)
            document.getElementById('selectReceiver').value = '0';
        }
    }

    selectAccountChange(e) {
        const accountSelected = e.target.value;
        let Account = '';
        DB.listAccounts().forEach(element => {
            if (`${
                element.number
            } - ${
                element.type
            }` == accountSelected) {
                Account = {
                    balance: element.balance,
                    number: element.number
                };
            }
        });
        this.setState({balanceAccount: Account.balance})
        this.setState({numberAccount: Account.number})
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
            alert('Lỗi xảy ra!');
        });
    }

    // Nhập thông tin giao dịch
    submitForm = async (e) => {
        e.preventDefault()
        // Kiểm tra các thông tin có hợp lệ?
        let isValid = true;
        if (this.state.balanceAccount < this.state.money) 
            isValid = false;
        


        // Nếu thông tin hợp lệ -> xử lí
        if (isValid) { // Call axios
            const reqBody = {
                receiver_account_number: this.state.numberReceiver,
                money: this.state.money,
                message: this.state.message,
                type_fee: this.state.method == 1 ? "1" : "0"
            }
            const response = await connector.post(`/transfer/internal/receiver_account_number`, reqBody).then((response) => {
                console.log("response", response);
                if (response.data.status == 'OK') { // Lưu vào state
                    this.setState({activeTab: 1, otp_id: response.data.data.otp_id, email: response.data.data.email});

                    // Mở form xác nhận
                    window.scrollTo(0, 0);
                } else {
                    alert('Giao dịch thất bại.');
                }
            }, (error) => {
                console.log("Error! Infor: ", error.response);
            });
        } else {
            alert('Vui lòng kiểm tra lại thông tin giao dịch.')
        }
    }

    // Xác nhận OTP
    confirmForm = async (e) => {
        e.preventDefault()
        // Xử lí
        const {email, otp_id} = this.state;
        if (1) { // Call axios
            const reqBody = {
                code: this.state.otp
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
            const response = await connector.post(`/transfer/internal/confirm`, reqBody).then((response) => {
                console.log("response", response);
                if (response.data.status == 'TRANSFERD') { // Chuyển sang màn hình giao dịch thành công
                    this.setState({activeTab: 2});
                    window.scrollTo(0, 0);
                } else {
                    alert('Giao dịch thất bại.');
                }
            }, (error) => {
                console.log("Error! Infor: ", error.response);
            });
        } else {
            alert('Vui lòng kiểm tra lại thông tin giao dịch.')
        }
    }

    // Lưu thông tin người nhận
    actionSave(e) { // Open
        e.preventDefault()
        const {formID} = document.forms;
        formID.reset();
        document.getElementById('formSave').style.display = "block";
        document.getElementById('formSave').focus();
    }

    ActionCancelSaveForm(e) {
        e.preventDefault();
        document.getElementById('formSave').style.display = "none";
        // document.getElementById('main').style.display = "block";
    }

    SubmitSaveForm = async (e) => {
        e.preventDefault();

        // Kiểm tra người nhận đã có trong danh sách chưa?
        let isExist = false;
        this.state.listReceivers.forEach(element => {
            if (element.number == this.state.numberReceiver) 
                isExist = true;
            

        })

        // Xử lí điều kiện
        if (isExist) { // Thông báo nếu đã có trong danh sách
            alert('Tài khoản đã có trong danh sách người nhận');
            document.getElementById('formSave').style.display = "none";
        } else { // Thực hiện tạo người nhận
            const type = this.state.remindReceiver == '' ? 1 : 2;
            const reqBody = {
                bank_code: "GO",
                receiver_account_number: this.state.numberReceiver,
                remind_name: this.state.remindReceiver,
                type: type
            }
            const response = await connector.post(`list-receiver1`, reqBody).then((response) => {
                console.log("response", response);
                if (response.data.message == 'thêm thành công') {
                    alert('Thêm thành công!');
                }
            }, (error) => {
                console.log("Error! Gửi thêm người nhận: ", error.response);
                alert('Lỗi gửi thêm người nhận!');
            });

            // Đóng form
            document.getElementById('formSave').style.display = "none";
        }
    }

    getDatabase = async (e) => { // Refresh token để gọi backend trước
        if (new Date().getTime() > this.state.lasttime + 5 * 1000 || this.state.loaded == false) {
            this.setState({loaded: true, lasttime: new Date().getTime()})
            DB.refreshToken();
            // Call axios - listAccounts
            const response = await connector.get("/account", {}).then((response) => {
                console.log("response", response);
                const listAccounts = [{
                        number: response.data.rows.account_number,
                        balance: response.data.rows.balance,
                        type: "Tài khoản thanh toán"
                    }];

                // Lưu vào state
                this.setState({listAccounts: listAccounts, numberAccount: response.data.rows.account_number, balanceAccount: response.data.rows.balance})
            }, (error) => {
                console.log("Error! Infor: ", error.response);
                const loi = 'Lỗi xảy ra. accessToken: ';
                const str = loi.concat(localStorage.getItem("accessToken"));
            });

            // Call axios - listReceivers
            const response1 = await connector.get("/list-receiver1", {}).then((response) => {
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
                alert('Lỗi xảy ra!');
            });
        }
    }

    render() { // Realtime
        if (this.state.loaded == false)
            this.getDatabase();
        setTimeout(function () {
            this.getDatabase();
        }.bind(this), 10 * 1000);

        // Người nhận
        // Thanh toán phí
        const listType = [
            {
                type: 1,
                note: "Người chuyển trả"
            }, {
                type: 0,
                note: "Người nhận trả"

            }
        ]
        const listTypes = listType.map((item, index) => {
            return (
                <option value={
                    item.type
                }>
                    {
                    item.note
                }</option>
            );
        });
        return (
            <div>
                <div id={'main'}>
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
                                    <strong>Chuyển tiền</strong>
                                </CardHeader>
                            </Card>
                            <br/>
                            <Form onSubmit={
                                this.submitForm
                            }>
                                <Card>
                                    <CardHeader>
                                        <strong>Tài khoản nguồn</strong>
                                    </CardHeader>
                                    <CardBody>
                                        <FormGroup row>
                                            <Col md="3" className="d-flex p-3">
                                                <Label htmlFor="select-account">Số tài khoản</Label>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <Input type="select" name="select-account"
                                                    onChange={
                                                        this.selectAccountChange
                                                }>
                                                    {
                                                    this.state.listAccounts.map((item, index) => {
                                                        return (
                                                            <option>{
                                                                item.number
                                                            }
                                                                - {
                                                                item.type
                                                            }</option>
                                                        );
                                                    })
                                                } </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="text-input">Số dư khả dụng</Label>
                                            </Col>
                                            <Col xs="12" md="3">
                                                <Label>{
                                                    DB.moneyToString(this.state.balanceAccount).concat(" VNĐ")
                                                }</Label>
                                            </Col>
                                        </FormGroup>
                                    </CardBody>
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
                                                    onKeyDown={
                                                        this.onKeyDown
                                                    }
                                                    value={
                                                        this.state.numberReceiver
                                                }></Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="text-input">Chủ tài khoản:</Label>
                                            </Col>
                                            <Col xs="12" md="3">
                                                <Label>{
                                                    this.state.nameReceiver
                                                }</Label>
                                            </Col>
                                        </FormGroup>
                                    </CardBody>
                                    <CardHeader>
                                        <strong>THÔNG TIN CHUYỂN TIỀN</strong>
                                    </CardHeader>
                                    <CardBody>
                                        <FormGroup row>
                                            <Col md="3" className="d-flex p-3">
                                                <Label htmlFor="money">Số tiền chuyển</Label>
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
                                                <Label htmlFor="message">Nội dung chuyển</Label>
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
                                    <CardHeader>
                                        <strong>PHÍ THANH TOÁN</strong>
                                    </CardHeader>
                                    <CardBody>
                                        <FormGroup row>
                                            <Col md="3" className="d-flex p-3">
                                                <Label htmlFor="method">Hình thức thanh toán phí</Label>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <Input type="select" name="method"
                                                    onChange={
                                                        this.onChange
                                                    }
                                                    value={
                                                        this.state.method
                                                }>
                                                    {listTypes} </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="text-input">Phí thanh toán</Label>
                                            </Col>
                                            <Col xs="12" md="3">
                                                <Label>3.000 VNĐ</Label>
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
                                        this.state.nameReceiver == '' || this.state.money == null || this.state.money == ''
                                    }>XÁC NHẬN</Button>
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
                                    <strong>Xác nhận</strong>
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
                                                }>TÀI KHOẢN NGUỒN</b>
                                            </Label>
                                            <br/>
                                            <Label>• Tài khoản nguồn: {
                                                this.state.numberAccount
                                            }</Label>
                                            <br/>
                                            <Label>• Số dư khả dụng: {
                                                DB.moneyToString(this.state.balanceAccount).concat(" VNĐ")
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
                                                }>THÔNG TIN NGƯỜI NHẬN</b>
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
                                                }>THÔNG TIN CHUYỂN TIỀN</b>
                                            </Label>
                                            <br/>
                                            <Label>• Số tiền chuyển: {
                                                DB.moneyToString(this.state.money).concat(" VNĐ")
                                            }</Label>
                                            <br/>
                                            <Label>• Nội dung chuyển: {
                                                this.state.message
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
                                                }>HÌNH THỨC THANH TOÁN PHÍ</b>
                                            </Label>
                                            <br/>
                                            <Label>• {
                                                this.state.method
                                            }</Label>
                                            <br/>
                                            <Label>• Phí thanh toán: 3.000 VNĐ</Label>
                                        </CardBody>
                                    </Card>
                                </FormGroup>
                                <FormGroup>
                                    <Card>
                                        <CardHeader>
                                            <strong>XÁC THỰC OTP</strong>
                                        </CardHeader>
                                        <CardBody>
                                            <FormGroup row>
                                                <Col md="3" className="d-flex p-3">
                                                    <Label htmlFor="otp">Mã OTP</Label>
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
                                </FormGroup>
                                {/* {Chuyển tiền}*/}
                                <div style={
                                    {textAlign: 'center'}
                                }>
                                    <Button>XÁC NHẬN</Button>
                                </div>
                            </Form>
                        </TabPane>
                        <TabPane tabId={2}>
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
                                    <strong>Thông tin giao dịch</strong>
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
                                                }>Giao dịch thành công</b>
                                            </Label>
                                            <br/>
                                            <Label>{'• Mã giao dịch: '}
                                                <a style={
                                                        {
                                                            fontFamily: 'Segoe UI',
                                                            fontSize: '15px',
                                                            color: 'blue'
                                                        }
                                                    }
                                                    href=
                                                    {'/transaction/detail?id=' + this.state.numberAccount}>
                                                    {
                                                    this.state.numberAccount
                                                }</a>
                                            </Label>
                                            <br/>
                                            <Label>{''}
                                                <b style={
                                                        {
                                                            fontFamily: 'Segoe UI',
                                                            fontSize: '15px',
                                                            color: 'red'
                                                        }
                                                    }
                                                    onClick={
                                                        this.actionSave
                                                }>
                                                    {'• Lưu thông tin người nhận'}</b>
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
                <div id={'formSave'}
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
                            this.SubmitSaveForm
                    }>
                        <Card>
                            <CardHeader>
                                <b style={
                                    {
                                        fontStyle: 'italic',
                                        fontSize: '18px',
                                        color: 'red'
                                    }
                                }>Số tài khoản: {
                                    this.state.numberReceiver
                                }</b>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3" className="d-flex p-3">
                                        <Label>Tên gợi nhớ</Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Input type="text" name="remindReceiver"
                                            onChange={
                                                this.onChange
                                            }
                                            value={
                                                this.state.remindReceiver
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
                                disabled={false}>THÊM NGƯỜI NHẬN</Button>
                            <Button onClick={
                                    this.ActionCancelSaveForm
                                }
                                style={
                                    {marginLeft: '5px'}
                            }>ĐÓNG</Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
