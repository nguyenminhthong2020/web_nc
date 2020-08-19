import React, {Component} from 'react';
import {connector} from "./../callAxios";
import './../vendor/bootstrap/css/bootstrap.min.css';
import './../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './../fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './../vendor/animate/animate.css';
import './../vendor/css-hamburgers/hamburgers.min.css';
import './../vendor/animsition/css/animsition.min.css';
import './../vendor/select2/select2.min.css';
import './../vendor/daterangepicker/daterangepicker.css';
import './../css/util.css';
import './../css/main.css';
import {
    FormGroup,
    Label,
    CardBody,
    TabContent,
    TabPane,
    Card,
    Button,
    Form,
    Input,
    Col,
    CardHeader
} from "reactstrap";

// Authention
import fakeAuth from './../auth';

// Export
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 0,
            username: '',
            newPassword: '',
            retypePassword: '',
            email: '',
            otp_id: '',
            otp: '',
            status: ''
        }
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    submitForm = async (e) => {
        e.preventDefault()
        const {username, email} = this.state

        const reqBody = {
            username: username,
            email: email
        }

        const response = await connector.post(`/auth/forgot-password`, reqBody).then((response) => {
            console.log("response", response);
            if (response.data.status == 'OK') { // Set state
                this.setState({activeTab: 1, otp_id: response.data.data.otp_id, email: response.data.data.email});
            } else { //
            }
        }, (error) => {
            console.log("Error! Quên mật khẩu: ", error.response);
        });
    }

    // Xác nhận OTP
    confirmForm = async (e) => {
        e.preventDefault()
        // Xử lí
        const {email, otp_id} = this.state;
        if (this.state.newPassword != this.state.retypePassword) {
            alert('Mật khẩu nhập lại không khớp')
        } else { // Call axios
            const reqBody = {
                code: this.state.otp,
                newPassword: this.state.newPassword
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
            const response = await connector.post(`/auth/forgot-password/confirm`, reqBody).then((response) => {
                console.log("response", response);
                if (response.data.status == 'PASS_CHANGED') { // Chuyển sang màn hình đổi mật khẩu thành công
                    this.setState({activeTab: 2});
                    window.scrollTo(0, 0);
                } else {
                    alert('Đổi mật khẩu thất bại.');
                }
            }, (error) => {
                console.log("Error! Infor: ", error.response);
            });
        }
    }

    render() {
        return (
            <div>
                <title>Recovery</title>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/> {/*===============================================================================================*/}
                <link rel="icon" type="image/png" href="images/icons/favicon.ico"/> {/*===============================================================================================*/}
                <div className="limiter">
                    <div className="container-page">
                        <div className="wrap-body-s p-l-85 p-r-85 p-t-55 p-b-55">
                            <TabContent activeTab={
                                this.state.activeTab
                            }>
                                <TabPane tabId={0}>
                                    <form onSubmit={
                                            this.submitForm
                                        }
                                        style = {{padding: '20px'}}
                                        className="login100-form validate-form flex-sb flex-w">
                                        <span className="login100-form-title p-b-32">
                                            QUÊN MẬT KHẨU
                                        </span>
                                        <span className="txt1 p-b-11">
                                            Tên đăng nhập
                                        </span>
                                        <div className="wrap-input100 validate-input m-b-36">
                                            <input className="input100" type="text" name="username"
                                                value={
                                                    this.state.username
                                                }
                                                onChange={
                                                    this.onChange
                                                }/>
                                            <span className="focus-input100"/>
                                        </div>

                                        <span className="txt1 p-b-11">
                                            Email
                                        </span>
                                        <div className="wrap-input100 validate-input m-b-36">
                                            <input className="input100" type="text" name="email"
                                                value={
                                                    this.state.email
                                                }
                                                onChange={
                                                    this.onChange
                                                }/>
                                            <span className="focus-input100"/>
                                        </div>
                                        <div style={
                                                {textAlign: 'center !important'}
                                            }
                                            className="container-page-form-btn">
                                            <button className="login100-form-btn">
                                                Xác nhận
                                            </button>
                                        </div>
                                    </form>

                                </TabPane>
                                <TabPane tabId={1}>
                                    <form onSubmit={
                                            this.confirmForm
                                        }
                                        style = {{padding: '20px'}}
                                        className="login100-form validate-form flex-sb flex-w">
                                        <span className="login100-form-title p-b-32">
                                            ĐỔI MẬT KHẨU
                                        </span>
                                        <span className="txt1 p-b-11">
                                            Mật khẩu mới
                                        </span>
                                        <div className="wrap-input100 validate-input m-b-36">
                                            <input className="input100" type="password" name="newPassword"
                                                value={
                                                    this.state.newPassword
                                                }
                                                onChange={
                                                    this.onChange
                                                }/>
                                            <span className="focus-input100"/>
                                        </div>
                                        <span className="txt1 p-b-11">
                                            Nhập lại mật khẩu mới
                                        </span>
                                        <div className="wrap-input100 validate-input m-b-36">
                                            <input className="input100" type="password" name="retypePassword"
                                                value={
                                                    this.state.retypePassword
                                                }
                                                onChange={
                                                    this.onChange
                                                }/>
                                            <span className="focus-input100"/>
                                        </div>

                                        <span className="txt1 p-b-11">
                                            OTP
                                        </span>
                                        <div className="wrap-input100 validate-input m-b-36">
                                            <input className="input100" type="text" name="otp"
                                                value={
                                                    this.state.otp
                                                }
                                                onChange={
                                                    this.onChange
                                                }/>
                                            <span className="focus-input100"/>
                                        </div>
                                        <div style={
                                                {textAlign: 'center !important'}
                                            }
                                            className="container-page-form-btn">
                                            <button className="login100-form-btn">
                                                Xác nhận
                                            </button>
                                        </div>
                                    </form>

                                </TabPane>
                                <TabPane tabId={2}>
                                    <form className="login100-form validate-form flex-sb flex-w" style = {{padding: '20px'}}>
                                        <Label>
                                            <a href='/login'>
                                                <b style={
                                                    {fontSize: '25px'}
                                                }>Đổi mật khẩu thành công!</b>
                                            </a>
                                        </Label>
                                        <FormGroup>
                                            <br/>
                                            <Label>
                                                <a href='/login'>
                                                    <i>
                                                        <b style={
                                                            {
                                                                color: 'green',
                                                                fontSize: '18px'
                                                            }
                                                        }>Đăng nhập</b>
                                                    </i>
                                                </a>
                                            </Label>

                                        </FormGroup>
                                    </form>
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>
                </div>
                <div id="dropDownSelect1"/> {/*===============================================================================================*/}
                {/*===============================================================================================*/}
                {/*===============================================================================================*/}
                {/*===============================================================================================*/}
                {/*===============================================================================================*/}
                {/*===============================================================================================*/}
                {/*===============================================================================================*/} </div>
        )
    }
}
