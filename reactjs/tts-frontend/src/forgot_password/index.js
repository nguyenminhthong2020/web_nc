import React, {Component} from 'react';
import { connector } from "./../callAxios";
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
import {
  FormGroup,
  Label,
  CardBody,
  TabContent,
  TabPane,
  Card
} from "reactstrap";

// Authention
import fakeAuth from './../auth';

// Export
export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab: 0,
      username: '',
      status: ''
    }
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm(e) {
    e.preventDefault()
    const {username} = this.state
    if((username=='')) {
      alert('Vui lòng nhập tên đăng nhập/ email');
    }
    else{
      // Xử lí email tồn tại/ không tồn tại
      const isExist = true;
      if(isExist) {
        this.setState({
          status: 'Yêu cầu xử lí thành công. Vui lòng kiểm tra thông tin đăng nhập được gửi đến email.'
        })
      }
      else {
        this.setState({
          status: 'Tài khoản không tồn tại, vui lòng kiểm tra lại.'
        })
      }
      // Chuyển đến trang thông báo
      this.setState({activeTab: 1});
      window.scrollTo(0, 0);
    }
  }

  render() {
    return(
      <div>
      <title>Recovery</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/*===============================================================================================*/}	
        <link rel="icon" type="image/png" href="images/icons/favicon.ico" />        
        {/*===============================================================================================*/}
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={0}>
            <div className="limiter">
              <div className="container-page">
                <div className="wrap-body p-l-85 p-r-85 p-t-55 p-b-55">
                  <form onSubmit = {this.submitForm} className="login100-form validate-form flex-sb flex-w">
                    <span className="login100-form-title p-b-32">
                      THAY ĐỔI MẬT KHẨU
                    </span>
                    <span className="txt1 p-b-11">
                      Tên đăng nhập/ Email
                    </span>
                    <div className="wrap-input100 validate-input m-b-36">
                      <input className="input100" type="text" name="username" value = {this.state.username} onChange = {this.onChange}/>
                      <span className="focus-input100" />
                    </div>
                    <div style = {{textAlign: 'center !important'}} className="container-page-form-btn">
                      <button className="login100-form-btn">
                        Xác nhận 
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tabId={1}>
            <div className="limiter">
              <div className="container-page">
                <div className="wrap-body p-l-85 p-r-85 p-t-55 p-b-55">
                  <form onSubmit = {this.submitForm} className="login100-form validate-form flex-sb flex-w">
                    <span className="login100-form-title p-b-32">
                      THAY ĐỔI MẬT KHẨU
                    </span>
                    <FormGroup>
                      <Card>
                          <CardBody>
                              <Label><b style = {{color: 'green', fontFamily: 'Segoe UI'}}>Trạng thái</b></Label>
                              <br/>                        
                              <Label style = {{fontFamily: 'Segoe UI'}}>{this.state.status}</Label>
                              <br/>                        
                              <Label style = {{fontFamily: 'Segoe UI'}}>• Quay lại trang <a style = {{fontFamily: 'Segoe UI', fontSize: '15px', color: 'blue'}} href = {'/login'}><u>Đăng nhập</u></a>: </Label>
                          </CardBody>
                      </Card>
                    </FormGroup>
                    
                    
                  </form>
                </div>
              </div>
            </div>
          </TabPane>
        
        </TabContent>

        <div id="dropDownSelect1" />
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}      
    </div>
    )
  }
}