const express = require("express");
const moment = require("moment");
const axios = require("axios");
// const md5 = require("md5");
const NodeRSA = require("node-rsa");
const User = require("../models/user.model");
const Account = require("../models/account.model");
const Otp = require("../models/otp.model");
const Transaction = require("../models/TransactionHistory.model");
const ListReceiver = require('../models/listReceiver.model');

var nodemailer = require("nodemailer");
const config = require("../config/default.json");
const process1 = require("../config/process.config");

const router = express.Router();

// Chuyển khoản nội bộ (cùng ngân hàng)
// Body gửi lên có receiver_account_number, money, message, type_fee
router.post("/internal/receiver_account_number", async function (req, res) {
  const { user_id } = req.tokenPayload;

  const _account = await Account.findOne({user_id: user_id});

  const _user = await User.findOne({ user_id: user_id });
  const code = Math.floor(Math.random() * 999999) + 100000;
  let email = _user.email;
  let fullname = _user.fullname;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "secondwebnc2020@gmail.com",
      pass: "infymt6620",
    },
  });

  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "secondwebnc2020@gmail.com",
    to: email,
    subject: "[Xác nhận OTP]",
    text: "Tin nhắn từ ngân hàng Go ",
    html: `<div>
                  Xin chào ${fullname},
                  <br><br>
                  Vừa có một yêu cầu giao dịch từ bạn ở ngân hàng chúng tôi. <br>
                  Dưới đây là mã OTP có thời hạn 10 phút : <br>
                  <h2>${code}</h2><br>
                  Nếu người yêu cầu không phải bạn, xin bỏ qua email này.
                  <br><br>
                  Trân trọng
              </div>`,
  };

  transporter.sendMail(mainOptions, function (error, info) {
    if (error) {
      res
        .status(500)
        .send({ status: "ERROR", message: "Không thể gửi message. " + error });
    } else {
      
      const time = moment().valueOf();
      // Lưu OTP vào CSDL
      const _body = {
        user_id: user_id,
        email: email,
        code: code,
        time: time,
        sender_account_number: _account.account_number,
        receiver_account_number: req.body.receiver_account_number,
        sender_bank_code: "GO",
        receive_bank_code: "GO",
        money: req.body.money,
        transaction_fee: 0,
        type_fee: req.body.type_fee, //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. Thực ra phí là 0
        message: req.body.message
      };
      // let newOtp = Otp( _body);
      // const ret = await newOtp.save();

      Otp.create(_body, async (err, result) => {
        if (err) {
          return res.status(500).send({ status: "ERROR", message: err });
        } else {
          return res
            .status(200)
            .send({
              status: "OK",
              data: { 
                otp_id: result.otp_id, 
                email: result.email, 
                time: result.time
               },
            });
        }
      });
    }
  });
});


// Chuyển khoản nội bộ (cùng ngân hàng)
// Body gửi lên có remind_name, money, message, type_fee
router.post("/internal/remind_name", async function (req, res) {
  const { user_id } = req.tokenPayload;
  
  const _account = await Account.findOne({user_id: user_id});

  const _user = await User.findOne({ user_id: user_id });
  const code = Math.floor(Math.random() * 999999) + 100000;
  let email = _user.email;
  let fullname = _user.fullname;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "secondwebnc2020@gmail.com",
      pass: "infymt6620",
    },
  });

  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "secondwebnc2020@gmail.com",
    to: email,
    subject: "[Xác nhận OTP]",
    text: "Tin nhắn từ ngân hàng Go ",
    html: `<div>
                  Xin chào ${fullname},
                  <br><br>
                  Vừa có một yêu cầu giao dịch từ bạn ở ngân hàng chúng tôi. <br>
                  Dưới đây là mã OTP có thời hạn 10 phút : <br>
                  <h2>${code}</h2><br>
                  Nếu người yêu cầu không phải bạn, xin bỏ qua email này.
                  <br><br>
                  Trân trọng
              </div>`,
  };

  transporter.sendMail(mainOptions, async function (error, info) {
    if (error) {
      res
        .status(500)
        .send({ status: "ERROR", message: "Không thể gửi message. " + error });
    } else {
      
      const _receive = await ListReceiver.findOne({user_id: user_id, remind_name: req.body.remind_name});
      const time = moment().valueOf();
      // Lưu OTP vào CSDL
      const _body = {
        user_id: user_id,
        email: email,
        code: code,
        time: time,
        sender_account_number: _account.account_number,
        receiver_account_number: _receive.receiver_account_number,
        sender_bank_code: "GO",
        receive_bank_code: "GO",
        money: req.body.money,
        transaction_fee: 0,
        type_fee: req.body.type_fee, //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. Thực ra phí là 0
        message: req.body.message
      };
      // let newOtp = Otp( _body);
      // const ret = await newOtp.save();

      Otp.create(_body, async (err, result) => {
        if (err) {
          return res.status(500).send({ status: "ERROR", message: err });
        } else {
          return res
            .status(200)
            .send({
              status: "OK",
              data: { otp_id: result.otp_id, email: result.email, time: result.time},
            });
        }
      });
    }
  });
});


// Trong header có 2 trường là otp_id, email (chính là kết quả từ API phía trên)
// Trong body có trường là code (req.body.code)
router.post("/internal/confirm", async function (req, res) {
  const time = moment().valueOf();
  const { user_id } = req.tokenPayload;
  const _otp_id = req.get("otp_id");
  const _email = req.get("email");
  const str = _email + "";

  if (!_otp_id) {
    return res
      .status(400)
      .send({ status_code: "NO_OTPID", message: "Thiếu otp_id" });
  } else {
    const _otp = await Otp.findOne({ otp_id: _otp_id, code: req.body.code});

    if (!_otp) {
      return res
        .status(404)
        .send({ status_code: "NO_OTP", message: "Không tìm thấy otp" });
    } else {
      if (time - _otp.time > config.auth.expireTime) {
        return res
          .status(400)
          .send({ status_code: "TIME_EXPIRE", message: "Otp hết hạn." });
      } else {
         
        if(str == "undefined")
            {
              return res
              .status(400)
              .send({ status_code: "INVALID_EMAIL", message: "Thiếu trường email" });
            }

        if(_email != _otp.email)
        {
          return res
          .status(400)
          .send({ status_code: "INVALID_EMAIL", message: "Email không hợp lệ" });
        }

        const accountSend = await Account.findOne({
          account_number: _otp.sender_account_number,
        });
        let balance1 = accountSend.balance;
        if (accountSend.balance < _otp.money) {
          return res
            .status(400)
            .send({
              status_code: "INVALID_MONEY",
              message: "Gửi tiền thất bại vì số tiền gửi vượt quá số dư tài khoản đang có",
            });
        } else {
            try{
                const accountReceive = await Account.findOne({
                  account_number: _otp.receiver_account_number,
                });
                let balance2 = accountReceive.balance;
                const ret1 = await Account.findOneAndUpdate(
                  {
                    account_number: _otp.sender_account_number,
                  },
                  {
                    balance: balance1 - _otp.money,
                  }
                );
                const ret2 = await Account.findOneAndUpdate(
                  {
                    account_number: _otp.receiver_account_number,
                  },
                  {
                    balance: balance2 + _otp.money,
                  }
                );
                // Update Transaction Model
                const _body1 = {
                  sender_account_number: _otp.sender_account_number,
                  receiver_account_number: _otp.receiver_account_number,
                  sender_bank_code: _otp.sender_bank_code,
                  receive_bank_code: _otp.receive_bank_code,
                  money: _otp.money,
                  transaction_fee: _otp.transaction_fee,
                  type_fee: _otp.type_fee, //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. Thực ra phí là 0
                  message: _otp.message, // Nội dung cần chuyển, Ví dụ: "gửi trả nợ cho ông A"
                  created_at: moment().format("YYYY-MM-DD HH:mm:ss").toString()
                };
                let newTransaction = Transaction(_body1);
                const ret3 = await newTransaction.save();
                return res.status(200).send({ status: "TRANSFERD", message: "Cập nhật thành công." });
            }catch(err){
                
              return res.status(500).send({ status: "ERROR", message: "Cập nhật thất bại." + err});
            }
          
          

        }
      }
    }
  }
});

// Chuyển khoản liên ngân hàng
// Body gửi lên có receiver_account_number, receive_bank_code, money, message, type_fee
router.post("/external/receiver_account_number", async function (req, res) {
  const { user_id } = req.tokenPayload;

  const _account = await Account.findOne({user_id: user_id});
  const _user = await User.findOne({ user_id: user_id });
  const code = Math.floor(Math.random() * 999999) + 100000;
  let email = _user.email;
  let fullname = _user.fullname;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "secondwebnc2020@gmail.com",
      pass: "infymt6620",
    },
  });

  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "secondwebnc2020@gmail.com",
    to: email,
    subject: "[Xác nhận OTP]",
    text: "Tin nhắn từ ngân hàng Go ",
    html: `<div>
                  Xin chào ${fullname},
                  <br><br>
                  Vừa có một yêu cầu giao dịch từ bạn ở ngân hàng chúng tôi. <br>
                  Dưới đây là mã OTP có thời hạn 10 phút : <br>
                  <h2>${code}</h2><br>
                  Nếu người yêu cầu không phải bạn, xin bỏ qua email này.
                  <br><br>
                  Trân trọng
              </div>`,
  };

  transporter.sendMail(mainOptions, function (error, info) {
    if (error) {
      res
        .status(500)
        .send({ status: "ERROR", message: "Không thể gửi message. " + error });
    } else {
      //let receiver_account_number = (receiver_account_number1 == "") ? req.body.receiver_account_number2 : req.body.receiver_account_number1;
      
      const time = moment().valueOf();
      // Lưu OTP vào CSDL
      const _body = {
        user_id: user_id,
        email: email,
        code: code,
        time: time,
        sender_account_number: _account.account_number,
        receiver_account_number: req.body.receiver_account_number+"",
        sender_bank_code: "GO",
        receive_bank_code: req.body.receive_bank_code,
        money: req.body.money,
        transaction_fee: 0,
        type_fee: req.body.type_fee, //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. Thực ra phí là 0
        message: req.body.message
      };
      // let newOtp = Otp( _body);
      // const ret = await newOtp.save();

      Otp.create(_body, async (err, result) => {
        if (err) {
          return res.status(500).send({ status: "ERROR", message: err });
        } else {
          return res
            .status(200)
            .send({
              status: "OK",
              data: { otp_id: result.otp_id, email: result.email, time: result.time },
            });
        }
      });
    }
  });
});

// Chuyển khoản liên ngân hàng
// Body gửi lên có remind_name, receive_bank_code, money, message, type_fee
router.post("/external/remind_name", async function (req, res) {
  const { user_id } = req.tokenPayload;

  const _account = await Account.findOne({user_id: user_id});
  const _user = await User.findOne({ user_id: user_id });
  const code = Math.floor(Math.random() * 999999) + 100000;
  let email = _user.email;
  let fullname = _user.fullname;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "secondwebnc2020@gmail.com",
      pass: "infymt6620",
    },
  });

  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "secondwebnc2020@gmail.com",
    to: email,
    subject: "[Xác nhận OTP]",
    text: "Tin nhắn từ ngân hàng Go ",
    html: `<div>
                  Xin chào ${fullname},
                  <br><br>
                  Vừa có một yêu cầu giao dịch từ bạn ở ngân hàng chúng tôi. <br>
                  Dưới đây là mã OTP có thời hạn 10 phút : <br>
                  <h2>${code}</h2><br>
                  Nếu người yêu cầu không phải bạn, xin bỏ qua email này.
                  <br><br>
                  Trân trọng
              </div>`,
  };

  transporter.sendMail(mainOptions, async function (error, info) {
    if (error) {
      res
        .status(500)
        .send({ status: "ERROR", message: "Không thể gửi message. " + error });
    } else {
      //let receiver_account_number = (receiver_account_number1 == "") ? req.body.receiver_account_number2 : req.body.receiver_account_number1;
      
      const _receive = await ListReceiver.findOne({user_id: user_id, remind_name: req.body.remind_name});

      const time = moment().valueOf();
      // Lưu OTP vào CSDL
      const _body = {
        user_id: user_id,
        email: email,
        code: code,
        time: time,
        sender_account_number: _account.account_number,
        receiver_account_number: _receive.receiver_account_number,
        sender_bank_code: "GO",
        receive_bank_code: req.body.receive_bank_code,
        money: req.body.money,
        transaction_fee: 0,
        type_fee: req.body.type_fee, //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. Thực ra phí là 0
        message: req.body.message
      };
      // let newOtp = Otp( _body);
      // const ret = await newOtp.save();

      Otp.create(_body, async (err, result) => {
        if (err) {
          return res.status(500).send({ status: "ERROR", message: err });
        } else {
          return res
            .status(200)
            .send({
              status: "OK",
              data: { otp_id: result.otp_id, email: result.email, time: result.time },
            });
        }
      });
    }
  });
});


// Trong header có một trường là otp_id (chính là kết quả từ API phía trên)
// Trong body có trường là code (req.body.code)
router.post("/external/confirm", async function (req, res) {
  const time = moment().valueOf();
  const { user_id } = req.tokenPayload;
  
  const _otp_id = req.get("otp_id");
  const _email = req.get("email");
  const str = _email + "";

  if (!_otp_id) {
    return res
      .status(400)
      .send({ status_code: "NO_OTPID", message: "Thiếu otp_id" });
  } else {
    const _otp = await Otp.findOne({ otp_id: _otp_id , code: req.body.code});

    if (!_otp) {
      return res
        .status(404)
        .send({ status_code: "NO_OTP", message: "Không tìm thấy otp" });
    } else {
      if (time - _otp.time > config.auth.expireTime) {
        return res
          .status(400)
          .send({ status_code: "TIME_EXPIRE", message: "Otp hết hạn." });
      } else {
        if(str == "undefined")
            {
              return res
              .status(400)
              .send({ status_code: "INVALID_EMAIL", message: "Thiếu trường email" });
            }
            
        if(_email != _otp.email)
        {
          return res
          .status(400)
          .send({ status_code: "INVALID_EMAIL", message: "Email không hợp lệ" });
        }


        const accountSend = await Account.findOne({
          account_number: _otp.sender_account_number,
        });
        let balance1 = accountSend.balance;
        if (accountSend.balance < _otp.money) {
          return res
            .status(400)
            .send({
              status_code: "INVALID_MONEY",
              message: "Số tiền gửi vượt quá số dư tài khoản đang có",
            });
        } else {

          if(_otp.receive_bank_code == "25Bank"){
            const str = process1.partnerRSA.RSA_PUBLICKEY;
            const strPri = process1.ourkey.RSA_PRIVATEKEY;

            var DestinationAccountNumber = parseInt(_otp.receiver_account_number);
            var SourceAccountNumber = parseInt(_otp.sender_account_number);
             
            const _user = await User.findOne({user_id: user_id});
  
            const key = new NodeRSA(str);
            const key1 = new NodeRSA(strPri);

            const t = moment().valueOf();
            const text = {
              BankName: "GO",
              DestinationAccountNumber: DestinationAccountNumber,     
              SourceAccountName: _user.fullname,
              SourceAccountNumber: SourceAccountNumber,
              Amount: _otp.money,
              Message: _otp.message,
              iat: t,
            };
            const encrypted = key.encrypt(text, "base64");
            const signature = key1.sign(text, 'base64');
  
            const url = "https://bank25.herokuapp.com/api/partner/account-bank/recharge";
   
            axios
              .post(url, {
                data: {
                  "Encrypted": encrypted,
                  "Signed": signature
                },
              }).then(async (response) => {
                let reply = response.data.reply;
                
                const ret4 = await Account.findOneAndUpdate(
                  {
                    account_number: _otp.sender_account_number,
                  },
                  {
                    balance: balance1 - _otp.money,
                  }
                );
                
                    // Update Transaction Model
                const _body1 = {
                  sender_account_number: _otp.sender_account_number,
                  receiver_account_number: _otp.receiver_account_number,
                  sender_bank_code: _otp.sender_bank_code,
                  receive_bank_code: _otp.receive_bank_code,
                  money: _otp.money,
                  transaction_fee: _otp.transaction_fee,
                  type_fee: _otp.type_fee, //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. Thực ra phí là 0
                  message: _otp.message, // Nội dung cần chuyển, Ví dụ: "gửi trả nợ cho ông A"
                  created_at: moment().format("YYYY-MM-DD HH:mm:ss").toString()
                };
  
                let newTransaction = Transaction(_body1);
                const ret5 = await newTransaction.save();
  
                return res.status(200).send({status: "OK", message: reply});
                
              }).catch((error) => {
                const str_response = JSON.stringify(error.response.data);
                return res.status(500).send({status: "ERROR", message: str_response});
              });
          }
          


          
          
        }
      }
    }
  }
});

module.exports = router;
