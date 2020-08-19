import React, {Component} from 'react';
import DB from '../database/index';
import {connector} from "./../../callAxios";

import './../../css/style.css';
import './../../css/flaticon.css';
import './../../css/magnific-popup.css';
import './../../css/owl.theme.default.min.css';
import './../../css/animate.css';

export default class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            lasttime: new Date().getTime(),
            listNotifies: [],
            hasNewNotify: 0
        }
        this.getDatabase = this.getDatabase.bind(this);

    }

    getDatabase = async (e) => { // Refresh token để gọi backend trước
        if (new Date().getTime() > this.state.lasttime + 5 * 1000 || this.state.loaded == false) {
            this.setState({loaded: true, lasttime: new Date().getTime()})
            DB.refreshToken();
            // Lấy danh sánh thông báo
            const response = await connector.post(`/notify2/all/`, {}).then((response) => {
                console.log("response", response);
                    let listNotifies = [];
                    let hasNewNotify = 0;
                    response.data.rows.forEach(element => {
                        const notify_type = element.notify_type;
                        let notify_content = '';
                        if (element.is_view == 0)
                        {
                            hasNewNotify += 1;
                        }
                        if (notify_type == '0')
                        {
                            notify_content = `${element.sender_fullname} (${element.sender_account_number}) đã hủy nhắc nợ của bạn.`;
                        }
                        if (notify_type == '1')
                        {
                            notify_content = `${element.sender_fullname} (${element.sender_account_number}) đã thanh toán nhắc nợ của bạn.`;
                        }
                        listNotifies = listNotifies.concat([{
                            notify_id: element.notify_id,
                            sender_account_number: element.sender_account_number,
                            sender_fullname : element.sender_fullname,
                            receiver_account_number: element.receiver_account_number,
                            receiver_fullname: element.receiver_fullname,
                            message: element.message,
                            created_at: element.created_at,
                            notify_type: element.notify_type,
                            is_view: element.is_view,
                            notify_content: notify_content
                        }]);
                });
                // Lưu vào state
                this.setState({listNotifies: listNotifies, hasNewNotify: hasNewNotify})
            }, (error) => {
                console.log("Error! Infor: ", error.response);
                const loi = 'Lỗi xảy ra. accessToken: ';
                const str = loi.concat(localStorage.getItem("accessToken"));
            });
        }
    }
    render() {
        if (this.state.loaded == false) 
            this.getDatabase();
        
        setTimeout(function () {
            this.getDatabase();
        }.bind(this), 5 * 1000);
        return (
            <div>
                <title>TTS - iBanking</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <div className="container-fluid px-md-5  pt-4 pt-md-5">
                    <div className="row justify-content-between">
                        <div className="col-md-8 order-md-last">
                            <div className="row">
                                <div className="col-md-6 text-center">
                                    <a className="navbar-brand" href="/"
                                        style={
                                            {fontSize: '45px'}
                                    }>
                                        <small>Ngân hàng trực tuyến nW</small>TTS
                                        <span>iB@nking</span>
                                    </a>
                                </div>
                                <div className="col-md-6 d-md-flex justify-content-end mb-md-0 mb-3">
                                    <form action="#" className="searchform order-lg-last">
                                        <div className="form-group d-flex">
                                            <input type="text" className="form-control pl-3" placeholder="Tìm kiếm"/>
                                            <button type="submit" className="form-control search"><span className="fa fa-search"/></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="social-media">
                                <p className="mb-0 d-flex">
                                    <a href="#" className="d-flex align-items-center justify-content-center">
                                        <span className="fa fa-facebook">
                                            <i className="sr-only">Facebook</i>
                                        </span>
                                    </a>
                                    <a href="#" className="d-flex align-items-center justify-content-center">
                                        <span className="fa fa-twitter">
                                            <i className="sr-only">Twitter</i>
                                        </span>
                                    </a>
                                    <a href="#" className="d-flex align-items-center justify-content-center">
                                        <span className="fa fa-instagram">
                                            <i className="sr-only">Instagram</i>
                                        </span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light" id="ftco-navbar">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="fa fa-bars"/>
                            Menu
                        </button>
                        <div className="collapse navbar-collapse" id="ftco-nav">
                            <ul className="navbar-nav m-auto">
                                <li className="nav-item active">
                                    <a href="/" className="nav-link">
                                        <span style={
                                                {fontSize: '22px'}
                                            }
                                            className="fa fa-home home-size"></span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/account_info" className="nav-link">Thông tin tài khoản/ Thẻ</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/transfer" className="nav-link">Chuyển tiền</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/debt" className="nav-link">Nhắc nợ</a>
                                </li>                                
                                <li className="nav-item">
                                    <a href="/transaction" className="nav-link">Lịch sử giao dịch</a>
                                </li>                                
                                <li className="nav-item">
                                    <a href="/notify" className="nav-link"  style = {this.state.hasNewNotify?{color: "red"}:{color: "black"}}>
                                        {
                                        this.state.hasNewNotify ? `Thông báo mới (${this.state.hasNewNotify})` : `Thông báo mới (${this.state.hasNewNotify})`}</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/logout" className="nav-link">Đăng xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
