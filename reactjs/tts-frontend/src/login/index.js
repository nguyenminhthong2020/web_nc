import React, {Component} from 'react';
import axios from "axios";
import './vendor/bootstrap/css/bootstrap.min.css';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './vendor/animate/animate.css';
import './vendor/css-hamburgers/hamburgers.min.css';
import './vendor/animsition/css/animsition.min.css';
import './vendor/select2/select2.min.css';
import './vendor/daterangepicker/daterangepicker.css';
import './css/util.css';
import './css/main.css';

// Authention
import fakeAuth from './../auth';

// Export
export default class Login extends Component {
    constructor(props) {
        super(props)
        let LoggedIn = false;
        this.state = {
            username: '',
            password: '',
            LoggedIn
        }
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    submitForm(e) {
        e.preventDefault()
        const {username, password} = this.state
        // login magic!
        const reqBody = {
            'username': username,
            'password': password
        }

        axios({method: 'post', url: 'https://tts-bank.herokuapp.com/auth/login', data: reqBody}).then(function (response) {
            if (response.data.authenticated == false) {
                alert('Sai thong tin dang nhap');
            } else { // Store token
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                // Authen
                if (response.data.role === 0 || response.data.role === 1 || response.data.role === 2) {
                    fakeAuth.authenticate(response.data.role);
                }
                // Redirect page
                window.location.href = '/';
            }
        }).catch(function (error) { //
            console.log("err123", error.response);
            alert(345);
        })
        // connector.interceptors.request.use.apply.apply
    }

    render() {
        return (<div>
            <title>Login TTS-Banking</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/> {/*===============================================================================================*/}
            <link rel="icon" type="image/png" href="images/icons/favicon.ico"/> {/*===============================================================================================*/}
            <div className="limiter">
                <div className="container-page">
                    <div className="wrap-body p-l-85 p-r-85 p-t-55 p-b-55">
                        <form onSubmit={
                                this.submitForm
                            }
                            className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title p-b-32">
                                ĐĂNG NHẬP
                            </span>
                            <span className="txt1 p-b-11">
                                Tên đăng nhập
                            </span>
                            <div className="wrap-input100 validate-input m-b-36" data-validate="Username is required">
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
                                Mật khẩu
                            </span>
                            <div className="wrap-input100 validate-input m-b-12" data-validate="Password is required">
                                <span className="btn-show-pass">
                                    <i className="fa fa-eye"/>
                                </span>
                                <input className="input100" type="password" name="password"
                                    value={
                                        this.state.password
                                    }
                                    onChange={
                                        this.onChange
                                    }/>
                                <span className="focus-input100"/>
                            </div>
                            <div className="flex-sb-m w-full p-b-48">
                                <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
                                    <label className="label-checkbox100" htmlFor="ckb1">
                                        Lưu tài khoản
                                    </label>
                                </div>
                                <div>
                                    <a href="/recovery" className="txt3">
                                        Quên mật khẩu?
                                    </a>
                                </div>
                            </div>
                            <div className="container-page-form-btn">
                                <button className="login100-form-btn">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="dropDownSelect1"/> {/*===============================================================================================*/}
            {/*===============================================================================================*/}
            {/*===============================================================================================*/}
            {/*===============================================================================================*/}
            {/*===============================================================================================*/}
            {/*===============================================================================================*/}
            {/*===============================================================================================*/} </div>)
    }
}
