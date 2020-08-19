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
    Button,
    Form
} from "reactstrap";
import {GiHistogram} from "react-icons/gi";
import {AiOutlineDelete} from "react-icons/ai";
import {FaRegEdit} from "react-icons/fa";
import {FcAddDatabase} from "react-icons/fc";


export default class EmployeeForm extends React.Component {
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
            listEmployees: [],
            type: 1,
            user_id: '',
            username: '',
            retype_username: '',
            password: '',
            retype_password: '',
            birthday: '',
            fullname: '',
            phone: '',
            email: ''
        }
        this.onChange = this.onChange.bind(this);
        this.getDatabase = this.getDatabase.bind(this);
        this.actionEdit = this.actionEdit.bind(this);
        this.actionDelete = this.actionDelete.bind(this);
        this.ActionAdd = this.ActionAdd.bind(this);
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

    actionEdit = async (user_id, fullname, phone, email) => { // Open form
        const {formID} = document.forms;
        formID.reset();
        document.getElementById('formEdit').style.display = "block";

        // Lấy giá trị STK
        this.setState({user_id: user_id, fullname: fullname, phone: phone, email: email});
        document.getElementById('formEdit').focus();
    }

    actionDelete = async (user_id, username) => { // Open form
        const {formID} = document.forms;
        formID.reset();
        document.getElementById('formDelete').style.display = "block";

        // Lấy giá trị STK
        this.setState({user_id: user_id, username: username, retype_username: ''});
        document.getElementById('formDelete').focus();
    }

    ActionAdd(e) {
        e.preventDefault();

        // Reset state
        this.setState({
            user_id: '',
            username: '',
            retype_username: '',
            password: '',
            retype_password: '',
            birthday: '',
            fullname: '',
            phone: '',
            email: ''
        });

        // Open form
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

    ActionCancelDeleteForm(e) {
        e.preventDefault();
        document.getElementById('formDelete').style.display = "none";
        // document.getElementById('main').style.display = "block";
    }

    submitForm = async (e) => {
        e.preventDefault()

        // Kiểm tra tài khoản đã có trong DB chưa?
        let isExist = false;
        this.state.listEmployees.forEach(element => {
            if (element.username == this.state.username) 
                isExist = true;
            
        })

        // Kiểm tra mật khẩu nhập lại có trùng khớp?
        let isMatch = true;
        if (this.state.password != this.state.retype_password) 
            isMatch = false;        

        // Xử lí điều kiện
        if (isExist || ! isMatch) { // Thông báo nếu đã có trong DB hay không khớp mật khẩu
            if (isExist) {
                alert('Tài khoản đã tồn tại');
            } else {
                alert('Mật khẩu nhập lại không khớp');
            }
        } else { // Thực hiện tạo nhân viên
            const reqBody = {
                username: this.state.username,
                password: this.state.password,
                fullname: this.state.fullname,
                birthday: this.state.birthday,
                phone: this.state.phone,
                email: this.state.email
            }
            const response = await connector.post(`user/admin/create-employee`, reqBody).then((response) => {
                console.log("response", response);
                if (response.data.message == 'Tạo thành công') {
                    alert('Thêm thành công!');
                }
            }, (error) => {
                console.log("Error! Thêm nhân viên: ", error.response);
                alert('Lỗi thêm nhân viên!');
            });

            // Đóng form
            this.getDatabase();
            document.getElementById('formAdd').style.display = "none";
        }
    }

    submitEditForm = async (e) => {
        e.preventDefault()
        // Thực hiện sửa tên gợi nhớ
        // alert(this.state.numberReceiver);
        const reqBody = {
            user_id: this.state.user_id,
            phone: this.state.phone,
            email: this.state.email
        }

        const response = await connector.post(`user/admin/edit-employee`, reqBody).then((response) => {
            console.log("response", response);
            if (response.data.message == 'update thành công') { //
            } else {
                alert('Chỉnh sửa nhân viên!');
            }
        }, (error) => {
            console.log("Error! Chỉnh sửa nhân viên: ", error.response);
            alert('Lỗi chỉnh sửa nhân viên!');
        });

        this.getDatabase();

        // Đóng form
        document.getElementById('formEdit').style.display = "none";
    }

    submitDeleteForm = async (e) => {
        e.preventDefault()
        // Kiểm tra lại đúng username
        if (this.state.username != this.state.retype_username) {
            alert('Nhập sai tên người dùng');
        } else {
            const reqBody = {
                user_id: this.state.user_id
            }

            const response = await connector.post(`user/admin/delete-employee`, reqBody).then((response) => {
                console.log("response", response);
                if (response.data.message == 'xóa thành công') { //
                } else {
                    alert('Xóa nhân viên!');
                }
            }, (error) => {
                console.log("Error! Xóa nhân viên: ", error.response);
                alert('Lỗi xóa nhân viên!');
            });
        }

        this.getDatabase();

        // Đóng form
        document.getElementById('formDelete').style.display = "none";
    }

    getDatabase = async (e) => { // Refresh token để gọi backend
        if (new Date().getTime() > this.state.lasttime + 5 * 1000 || this.state.loaded == false) {
            this.setState({loaded: true, lasttime: new Date().getTime()})
            DB.refreshToken();
            // Call axios
            const response = await connector.get("user/admin/list-employee", {}).then((response) => {
                console.log("response", response);
                let listEmployees = [];
                response.data.forEach(element => {
                    listEmployees = listEmployees.concat([{
                            user_id: element.user_id,
                            username: element.username,
                            password: element.password,
                            fullname: element.fullname,
                            birthday: element.birthday,
                            phone: element.phone,
                            email: element.email,
                            role: element.role,
                            created_at: element.created_at
                        }]);
                });

                // Lưu vào state
                this.setState({listEmployees: listEmployees})
            }, (error) => {
                console.log("Error! Infor: ", error.response);
            });
        }
    }


    render() { // Realtime
        if (this.state.loaded == false) 
            this.getDatabase();
        


        setTimeout(function () {
            this.getDatabase();
        }.bind(this), 10 * 1000);

        // Return
        return (
            <div>
                <div id="main" className="animated fadeIn">
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
                                }>Quản lý nhân viên</strong>
                            </Label>
                        </Col>
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

                            <Row>
                                <Col>
                                    <Table responsive bordered>
                                        <thead>
                                            <tr style={
                                                {
                                                    backgroundColor: '#435d7d',
                                                    color: 'white'
                                                }
                                            }>
                                                <th>#</th>
                                                <th>Tài khoản</th>
                                                <th>Tên</th>
                                                <th>Ngày sinh</th>
                                                <th>Số điện thoại</th>
                                                <th>Email</th>
                                                <th>Ngày khởi tạo</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody> {
                                            this.state.listEmployees.map((item, index) => {
                                                return (
                                                    <tr style={
                                                        {backgroundColor: ''}
                                                    }>
                                                        <th scope="row">
                                                            {
                                                            index + 1
                                                        }</th>
                                                        <td>{
                                                            item.username
                                                        }</td>
                                                        <td>{
                                                            item.fullname
                                                        }</td>
                                                        <td>{
                                                            item.birthday
                                                        }</td>
                                                        <td>{
                                                            item.phone
                                                        }</td>
                                                        <td>{
                                                            item.email
                                                        }</td>
                                                        <td>{
                                                            item.created_at
                                                        }</td>
                                                        <td style={
                                                            {textAlign: 'center'}
                                                        }>
                                                            <button onClick={
                                                                    () => {
                                                                        this.actionEdit(item.user_id, item.fullname, item.phone, item.email)
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
                                                                        this.actionDelete(item.user_id, item.username)
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
                    <Form id={'formID'}
                        onSubmit={
                            this.submitForm
                    }>
                        <Card>
                            <CardHeader>
                                <strong>Thông tin nhân viên</strong>
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
                                <FormGroup row>
                                    <Col md="3" className="d-flex p-3">
                                        <Label htmlFor="retype_password">Nhập lại mật khẩu</Label>
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
                                <FormGroup row>
                                    <Col md="3" className="d-flex p-3">
                                        <Label htmlFor="fullname">Tên nhân viên</Label>
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
                        {/* {Thêm người nhận}*/}
                        <br/>
                        <div style={
                            {textAlign: 'center'}
                        }>
                            <Button type={'submit'}
                                disabled={
                                    this.state.username == '' || this.state.password == ''
                            }>TẠO TÀI KHOẢN NHÂN VIÊN</Button>
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
                                }>
                                    {
                                    this.state.fullname
                                }</b>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3" className="d-flex p-3">
                                        <Label>Số điện thoại</Label>
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
                                        <Label>Email</Label>
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
                <div id={'formDelete'}
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
                            this.submitDeleteForm
                    }>
                        <Card>
                            <CardHeader>
                                <b style={
                                    {
                                        fontStyle: 'italic',
                                        fontSize: '18px',
                                        color: 'red'
                                    }
                                }>
                                    {
                                    "Xóa tài khoản " + this.state.username + "?"
                                }</b>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3" className="d-flex p-3">
                                        <Label>Nhập lại số tài khoản</Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Input type="text" name="retype_username"
                                            onChange={
                                                this.onChange
                                            }
                                            value={
                                                this.state.retype_username
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
                                disabled={false}>XÓA TÀI KHOẢN</Button>
                            <Button onClick={
                                    this.ActionCancelDeleteForm
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
