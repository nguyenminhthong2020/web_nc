import React from "react";
import DB from './../database/index';
import {connector} from "./../../callAxios";
import {AiOutlineDelete} from "react-icons/ai";
import {FaRegEdit} from "react-icons/fa";
import {FcAddDatabase} from "react-icons/fc";
import {
    Card,
    Col,
    Row,
    Table,
    CardBody,
    CardHeader,
    FormGroup,
    TabContent,
    TabPane,
    Form,
    Label,
    Input,
    Button
} from "reactstrap";

export default class receiversComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listReceivers: [],
            listBanks: DB.listBanks(),
            loaded: false,
            lasttime: new Date().getTime(),
            nameReceiver2: '',
            numberReceiver: '1345',
            remindReceiver: '',
            bank_code: ''
        }
        this.onChange = this.onChange.bind(this);
        this.getDatabase = this.getDatabase.bind(this);
        this.actionEdit = this.actionEdit.bind(this);
        this.actionDelete = this.actionDelete.bind(this);
        this.ActionAdd = this.ActionAdd.bind(this);
        this.selectBankChange = this.selectBankChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
        // Nếu sự kiện ở thẻ Input Account Receiver thì thay đổi giá trị Name Receiver và làm rỗng thẻ gợi ý
        if (e.target.name == "numberReceiver5") {
            let nameReceiver = '';
            DB.listReceivers().forEach(element => {
                if (element.number == e.target.value && element.bankCode == "GO") {
                    nameReceiver = element.name;
                }
            });
            this.setState({ // Cập nhật Name Receiver
                nameReceiver: nameReceiver
            })
            // value = 0 ứng với option gợi ý (dòng 155)
            document.getElementById('selectReceiver').value = '0';
        }
    }

    selectBankChange(e) {
        const bankSelected = e.target.value;
        let res = '';
        DB.listBanks().forEach(element => {
            if (element.bankCode == bankSelected) {
                res = {
                    name: element.name,
                    type: element.type,
                    secretKey: element.secretKey,
                    bankCode: element.bankCode
                }
            }
        });
        this.setState({bank_code: res.bankCode})
    }

    actionEdit = async (number, name) => { // Open form
        const {formID} = document.forms;
        formID.reset();
        document.getElementById('formEdit').style.display = "block";

        // Lấy giá trị STK
        this.setState({numberReceiver: number, remindReceiver: name});
        document.getElementById('formEdit').focus();

    }

    actionDelete = async (number) => {
        // Lấy giá trị STK

        // Xóa
        const reqBody = {
            receiver_account_number: number
        }

        const response = await connector.post(`list-receiver1/delete`, reqBody).then((response) => {
            console.log("response", response);
            if (response.data.message == 'ok') {
                alert('Xóa thành công thành công!');
            }
        }, (error) => {
            console.log("Error! Xóa người nhận: ", error.response);
            alert('Lỗi xóa người nhận!');
        });

        this.getDatabase();

        // this.setState({numberReceiver: number});
    }

    ActionAdd(e) {
        e.preventDefault();

        // Reset form
        this.setState({numberReceiver: '', remindReceiver: ''});
        document.getElementById('formAdd').style.display = "block";
        document.getElementById('formAdd').focus();

    }

    ActionCancelForm(e) {
        e.preventDefault();
        document.getElementById('formAdd').style.display = "none";
        // document.getElementById('main').style.display = "block";
    }

    ActionCancelEditForm(e) {
        e.preventDefault();
        document.getElementById('formEdit').style.display = "none";
        // document.getElementById('main').style.display = "block";
    }


    submitForm = async (e) => {
        e.preventDefault()

        // Kiểm tra người nhận đã có trong danh sách chưa?
        let isExist = false;
        this.state.listReceivers.forEach(element => {
            if (element.number == this.state.numberReceiver) 
                isExist = true;
            

        })

        // Xử lí điều kiện
        if (isExist) { // Thông báo nếu đã có trong danh sách
            alert('Tài khoản đã có trong danh sách người nhận');
            document.getElementById('formAdd').style.display = "none";
        } else { // Thực hiện tạo người nhận
            const type = this.state.remindReceiver == '' ? 1 : 2;
            const reqBody = {
                bank_code: this.state.bank_code,
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
            document.getElementById('formAdd').style.display = "none";
        }
    }

    submitEditForm = async (e) => {
        e.preventDefault()
        // Thực hiện sửa tên gợi nhớ
        // alert(this.state.numberReceiver);
        const reqBody = {
            receiver_account_number: this.state.numberReceiver,
            remind_name: this.state.remindReceiver
        }

        const response = await connector.post(`list-receiver1/edit`, reqBody).then((response) => {
            console.log("response", response);
            if (response.data.message == 'ok') { // alert('Chỉnh sửa thành công!');
            }
        }, (error) => {
            console.log("Error! Chỉnh sửa người nhận: ", error.response);
            alert('Lỗi chỉnh sửa người nhận!');
        });

        this.getDatabase();

        // Đóng form
        document.getElementById('formEdit').style.display = "none";
    }

    getDatabase = async (e) => { // Refresh token để gọi backend
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
                alert('Lỗi xảy ra!');
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
                            <strong>Danh sách tài khoản người nhận</strong>
                        </CardHeader>
                        <CardBody style={
                            {
                                borderStyle: 'ridge',
                                borderColor: '#435d7d'
                            }
                        }>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <button onClick={
                                                this.ActionAdd
                                            }
                                            style={
                                                {
                                                    float: 'right',
                                                    padding: '',
                                                    fontSize: '30px'
                                                }
                                        }><FcAddDatabase/></button>
                                    </Col>
                                </Row>
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
                                                this.state.listReceivers.map((item, index) => {
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
                                                                item.remind_name
                                                            }</td>
                                                            <td> {
                                                                item.bankCode
                                                            }</td>
                                                            <td style={
                                                                {textAlign: 'center'}
                                                            }>
                                                                <button onClick={
                                                                        () => {
                                                                            this.actionEdit(item.number, item.remind_name)
                                                                        }
                                                                    }
                                                                    style={
                                                                        {
                                                                            fontSize: '24px',
                                                                            marginRight: '10px'
                                                                        }
                                                                }><FaRegEdit/></button>
                                                                <button onClick={
                                                                        () => {
                                                                            this.actionDelete(item.number)
                                                                        }
                                                                    }
                                                                    style={
                                                                        {
                                                                            fontSize: '24px',
                                                                            marginLeft: '10px'
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
                            </FormGroup>
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
                            top: '30%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)'
                        }
                }>
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
                                        <Label htmlFor="bankName">Ngân hàng</Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Input type="select" name="bankName" id="bankName"
                                            onChange={
                                                this.selectBankChange
                                        }>
                                            {
                                            this.state.listBanks.map((item, index) => {
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
                                disabled={false}>TẠO NGƯỜI NHẬN MỚI</Button>
                            <Button onClick={
                                    this.ActionCancelForm
                                }
                                style={
                                    {marginLeft: '5px'}
                            }>ĐÓNG</Button>
                        </div>
                    </Form>
                </div>
                <div id={'formEdit'}
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
                            this.submitEditForm
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
                                disabled={false}>CẬP NHẬT</Button>
                            <Button onClick={
                                    this.ActionCancelEditForm
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
