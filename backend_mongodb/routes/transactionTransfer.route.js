const express = require("express");
const moment = require("moment");
const axios = require('axios');
const User = require("../models/user.model");
const Account = require("../models/account.model");
const Otp = require('../models/otp.model');
var nodemailer = require("nodemailer");

const router = express.Router();

// Biến toàn cục
var time = 0;
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "secondwebnc2020@gmail.com",
    pass: "infymt6620",
  },
});


// Chuyển khoản nội bộ (cùng ngân hàng)
router.post("/internal", async function(req, res){
      const {user_id} = req.tokenPayload;

      //const _account = await Account.findOne({user_id: user_id});
      const _user = await User.findOne({user_id: user_id});
      const code = Math.floor(Math.random() * 999999) + 100000;
      let email = _user.email;
      let fullname = _user.fullname;

      var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'secondwebnc2020@gmail.com',
        to: email,
        subject: '[Xác nhận OTP]',
        text: 'Tin nhắn từ ngân hàng Go ',
        html: `<div>
                  Xin chào ${fullname},
                  <br><br>
                  Vừa có một yêu cầu giao dịch từ bạn ở ngân hàng chúng tôi. <br>
                  Dưới đây là mã OTP có thời hạn 10 phút : <br>
                  <h2>${code}</h2><br>
                  Nếu người yêu cầu không phải bạn, xin bỏ qua email này.
                  <br><br>
                  Trân trọng
              </div>`
    }

    transporter.sendMail(mainOptions, function(err, info){
      if (error) {
        res.status(500).send({status: "ERROR", message: "Không thể gửi message. " + error});

      } else {
         
        let sender_account_number = (sender_account_number1 == "")?req.body.sender_account_number2:req.body.sender_account_number1;
        time = moment().valueOf();
        // Lưu OTP vào CSDL
        const _body = {
          user_id: user_id,
          email: email,
          code: code,
          time: time,
          sender_account_number: sender_account_number,
          receiver_account_number: req.body.receiver_account_number,
          sender_bank_code: "GO",
          receive_bank_code: "GO",     
          money: req.body.money,
          transaction_fee: 0, 
          type_fee: req.body.type_fee,    //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. Thực ra phí là 0
          message: req.body.message
      } 
      let newOtp = Otp( _body);
      const ret = await newOtp.save();

      res.status(200).send({status: "ERROR", message: "Đã gửi đến email"});
      }
    });
});

router.post("/internal/confirm", async function(req, res){
    const time1 = moment().valueOf();

    if(time1 - time > process.env.OTP_EXPIRE)
    {
        res.status(400).send({message: "OTP hết hạn"});
    }else{
        // Xác nhận OTP
        const {user_id} = req.tokenPayload;
        const code = await Otp.findOne({user_id : user_id, time : time});
        
        if(code){

        }else{
          res.status(500).send({message: "Không tồn tại OTP"});
        }

        if(req.body.otp == code){
            
        }
    }

});

// Chuyển khoản liên ngân hàng
router.post("/external", async function(req, res){
      const {user_id} = req.tokenPayload;

      //const _account = await Account.findOne({user_id: user_id});
      const _user = await User.findOne({user_id: user_id});
      const code = Math.floor(Math.random() * 999999) + 100000;
      let email = _user.email;
      let fullname = _user.fullname;

      var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'secondwebnc2020@gmail.com',
        to: email,
        subject: '[Xác nhận OTP]',
        text: 'Tin nhắn từ ngân hàng Go ',
        html: `<div>
                  Xin chào ${fullname},
                  <br><br>
                  Vừa có một yêu cầu giao dịch từ bạn ở ngân hàng chúng tôi. <br>
                  Dưới đây là mã OTP có thời hạn 10 phút : <br>
                  <h2>${code}</h2><br>
                  Nếu người yêu cầu không phải bạn, xin bỏ qua email này.
                  <br><br>
                  Trân trọng
              </div>`
    }

    transporter.sendMail(mainOptions, function(err, info){
      if (error) {
        res.status(500).send({status: "ERROR", message: "Không thể gửi message. " + error});

      } else {
        
        let sender_account_number = (sender_account_number1 == "")?req.body.sender_account_number2:req.body.sender_account_number1;
        time = moment().valueOf();

        // Lưu OTP vào CSDL
        const _body = {
          user_id: user_id,
          email: email,
          code: code,
          time: time,
          sender_account_number: sender_account_number,
          receiver_account_number: req.body.receiver_account_number,
          sender_bank_code: "GO",
          receive_bank_code: req.body.receive_bank_code,     
          money: req.body.money,
          transaction_fee: 0, 
          type_fee: req.body.type_fee,    //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. Thực ra phí là 0
          message: req.body.message
      } 
      let newOtp = Otp( _body);
      const ret = await newOtp.save();

      res.status(200).send({status: "ERROR", message: "Đã gửi đến email"});
      }
    });
});

router.post("/external/confirm", async function(req, res){
  
});

module.exports = router;