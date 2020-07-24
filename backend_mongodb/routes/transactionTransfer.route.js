const express = require("express");
const moment = require("moment");
const axios = require("axios");
// const md5 = require("md5");
const crypto = require('crypto');
const openpgp = require('openpgp');
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

// router.get('/internal/info-receiver/:receiver_account_number', async function(req, res){
    
// })

// router.get('/external/info-receiver/:receiver_account_number', async function(req, res){
  
// })


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
        transaction_fee: 3000,
        type_fee: req.body.type_fee, //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. Phí là 3000
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
        transaction_fee: 3000,
        type_fee: req.body.type_fee, //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. Phí là 3000
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


// Trong header có 3 trường là x-access-token, otp_id, email (chính là kết quả từ API phía trên)
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

        if(_otp.type_fee == "1")  // người gửi trả
        {
            let _m = _otp.money + 3000;
             if(accountSend.balance < _m)
               {
                return res
                .status(400)
                .send({
                  status_code: "INVALID_MONEY",
                  message: "Không thể gửi vì số dư không đủ."
                });
              }
        }

        if(_otp.type_fee == "0")   // người nhận trả
        {
             let _m1 = _otp.money - 3000;
             if(_m1 < 0)
               {
                return res
                .status(400)
                .send({
                  status_code: "INVALID_MONEY1",
                  message: "Tiền gửi quá ít (dưới 3000 VND) cho hình thức Người nhận trả phí."
                });
              }
        }

            try{
                
              let msend = 0;
              let mreceive = 0;

              if(_otp.type_fee == "1")
              {
                  msend = 3000;
              }
              if(_otp.type_fee == "0")
              {
                  mreceive = 3000;
              }

                const accountReceive = await Account.findOne({
                  account_number: _otp.receiver_account_number,
                });
                let balance2 = accountReceive.balance;
                const ret1 = await Account.findOneAndUpdate(
                  {
                    account_number: _otp.sender_account_number,
                  },
                  {
                    balance: balance1 - _otp.money - msend,
                  }
                );
                const ret2 = await Account.findOneAndUpdate(
                  {
                    account_number: _otp.receiver_account_number,
                  },
                  {
                    balance: balance2 + _otp.money - mreceive,
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
                  type_fee: _otp.type_fee, //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. 
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
});

// Tìm fullname từ receiver_account_number (với các đối tác)


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

          if(_otp.receive_bank_code == "partner34"){
            //console.log(req.body);
            const keypgp = "Infymt";
            const timepgp = moment().valueOf();
            const _bodypgp = {
               'accNum': _otp.receiver_account_number,
               'moneyAmount': _otp.money
            }
            const bodypgp = JSON.stringify(_bodypgp);
            const hashpgp = crypto.createHash('sha256').update(timepgp + bodypgp + keypgp).digest('hex');
            const codepgp = "GO";
            const datapgp = `${_otp.money},${_otp.receiver_account_number},${timepgp}`;
            const signaturepgp = await signData(datapgp);
            console.log(signaturepgp.split("\r\n").join("\\n"));
            
        
            const configAxios = {
                headers: {
                    "x-time": timepgp,
                    "x-partner-code": codepgp,
                    "x-hash": hashpgp,
                    "x-signature-pgp": signaturepgp.split("\r\n").join("\\n")
                }
            };
            
            const postBody = {
              'accNum': _otp.receiver_account_number,
              'moneyAmount': _otp.money
           }
        
            axios.post('https://banking34.herokuapp.com/api/transfer/update', postBody, configAxios)
            .then(async function (response){

              // let reply = response.data.reply;
              // console.log("\n"+reply);
              const ret4pgp = await Account.findOneAndUpdate(
                {
                  account_number: _otp.sender_account_number,
                },
                {
                  balance: balance1 - _otp.money,
                }
              );
              
                  // Update Transaction Model
              const _body1pgp = {
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
              
              let newTransactionpgp = Transaction(_body1pgp);
              const ret5pgp = await newTransactionpgp.save();

              return res.status(200).send({status: "OK"});
                
            }).catch(function (error){
                console.log(error.response.data);
                return res.send(error.response.data);
            });
          }

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
              SourceAccountNumber: SourceAccountNumber,
              SourceAccountName: _user.fullname,
              Amount: _otp.money,
              Message: _otp.message,
              iat: t
            };
           
            const encrypted = key.encrypt(text, "base64");
            const signature = key1.sign(text, 'base64');
            // console.log("\n"+encrypted);
            // console.log("\n"+signature);
            //const url = "https://bank25.herokuapp.com/api/partner/account-bank/recharge";

            let reqBody = {
              'Encrypted': encrypted,
              'Signed': signature,
            }
            
            axios({
              method: 'post',
              url: 'https://bank25.herokuapp.com/api/partner/account-bank/destination-account/recharge',
              data: reqBody
            }).then(async function (response) {
                //const str2 = JSON.stringify(response.data);
                //const strTest = response.data.TenKhachHang + "";

                let reply = response.data.reply;
                console.log("\n"+reply);
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
                
              })
              .catch(function (err) {
                //  return res.status(500).send({ status: "ERROR", message: err.response.data});

                // const str_response = JSON.stringify(err.response.data);
                // return res.status(500).send({status: "ERROR", message: str_response});
                console.log("\n"+"huhu, error roi" + "\n");
                return res.status(500).send({ status: err.response.status, message: err.response.data});
              })

            // axios
            //   .post(url, {
            //     data: {
            //       "Encrypted": encrypted,
            //       "Signed": signature
            //     },
            //   }).then(async (response) => {
            //     let reply = response.data.reply;
            //     console.log("\n"+reply);
            //     const ret4 = await Account.findOneAndUpdate(
            //       {
            //         account_number: _otp.sender_account_number,
            //       },
            //       {
            //         balance: balance1 - _otp.money,
            //       }
            //     );
                
            //         // Update Transaction Model
            //     const _body1 = {
            //       sender_account_number: _otp.sender_account_number,
            //       receiver_account_number: _otp.receiver_account_number,
            //       sender_bank_code: _otp.sender_bank_code,
            //       receive_bank_code: _otp.receive_bank_code,
            //       money: _otp.money,
            //       transaction_fee: _otp.transaction_fee,
            //       type_fee: _otp.type_fee, //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. Thực ra phí là 0
            //       message: _otp.message, // Nội dung cần chuyển, Ví dụ: "gửi trả nợ cho ông A"
            //       created_at: moment().format("YYYY-MM-DD HH:mm:ss").toString()
            //     };
                
            //     let newTransaction = Transaction(_body1);
            //     const ret5 = await newTransaction.save();
  
            //     return res.status(200).send({status: "OK", message: reply});
                
            //   }).catch((error) => {
            //     const str_response = JSON.stringify(error.response.data);
            //     return res.status(500).send({status: "ERROR", message: str_response});
            //   });
          }
          


          
          
        }
      }
    }
  }
});

async function signData(data){
  const privateKeyArmored =  "-----BEGIN PGP PRIVATE KEY BLOCK-----\nVersion: Keybase OpenPGP v1.0.0\nComment: https://keybase.io/crypto\n\nxcFGBF8aoccBBADGn4k3t0Z8b7j6V9MbFig8fTztkC5j0ca1zqkus/APqGl8WIXh\nSYGUPbQln50BAHjPe7Z6PngS631UQZuXhw7YkD+//83lL/904vKRumAU0264FtmY\nHl+JFBlt9HA6kSdIdDXNAn0czuyRjAwvJyEwMuVRMI5locPUYktyGX12gwARAQAB\n/gkDCOBybl7J++qoYHEiYOrqX7ZBp1Zgae/8ujcT6ORNkQu8FDacTzmwI5JTr5jv\nTAfqsz0D1kPsMBqtUpeF9FBQEM17+7n3kET38heMhEHw8s2blSYjD3ALtItn6hqS\ngzfHXQDoE65ZZVuDvOSBqupI0NOZ5PAnBO/qIrKAE1ccVSbV0k+TeGlHN5Gdj/Tg\n6zcMIBNfYvvU++kZLj8wqbtNJ9cQuRc3MlACPdxgOykqOcnKYFuazMV0F75JDwUo\n3f/BuMql3QOs1iE/uPbBJySJGi93VmTpwqAsIbLRrjbNQqygaqVo8NSc0a3+HDyb\nfkqzCRK64UA28+nIAOwnLRgNrTGsr7zRSQsOhvDMaBwl3ruCnBQErj1X5wBiPZ+p\n02qoSFtIUxXC+xUUxTKfCjuiyvNRK3Edb3ZKjfTUeKD+r6lRtlpmH0sJp1fJdmL0\ng9C6RaRqPsqFKOIzO3uwe+uI49VLaXOqUZRwWVxRbDtg8AG3EIV5E2nNJEluZnlt\ndCA8c29uZ29rdS5taW5odGhvbmdAZ21haWwuY29tPsKtBBMBCgAXBQJfGqHHAhsv\nAwsJBwMVCggCHgECF4AACgkQM5LXOGDOqkzSbAP/cdzjf6+OuqGUKu8mtRg5q3z8\nyagYCMbxxBiybfkLCfEGD2FjTGmxAHb3pzdNJmFRVFgaqwkox/5GkLLoWNe+FwAI\nJCTFI2V/9xfkM+ZYTCINIQuBJ/3W1jb76i9OqXLBFh3whh5ncXDXeP5EKqcgr3wI\nRzkaiUqiF6oxVWEUkebHwUYEXxqhxwEEAMw+fFgJH2whfhJjYBapEpgcDBDxl/gs\np7gn9BmWVaeYSHhWHH38pSEI2HGlqbGpZ0gmlUEeUk6Ky+V0E2+SKlorgu6o8h6O\njfNHKVPwCYq6fBXTarInSbTsJpZH80sh2JyXLOXT9u/05ya9/nvK60XHIXLJaHt4\nQ+70okOw/nwTABEBAAH+CQMI7FBKAWIfRFxghD7x0mXEDEjNi7XTNVW5fuBJV6EP\nelQzjrZIXgGyC7RYK0YEAEzAqgFr3/ZEitavsUNAJbmVF4RG7iGv/T6/KXb2BsuG\neGQ4Q6XCFprtT/6OTCR4XyXmQ8uqttAee5HBHUhx11V41SilPEP6NCql5MBGFQUN\nMhnIqkYnrBXMeJLvjiHGRd6MrfEHJxxgJxiA3MoYZPODpv34ltnbm31hZ82Ss9U6\nOsAvgZTntXY+6ISnBIHFSSuqbqJUPlRZuY3jcn7Xko/A/kdYimIk7b6AJBiQPqE0\nQ8/UoFHiO4jnxumhQrdrVZ7mOm9ZGHiWPRmPAgPtKK9j84UMMpUwxaQMU5cThg/d\n4nzICJSEXBqB2JGV3iOBYtc5PK9MhOwp+xZW8x4HaAqmR8OH/HdPfy/tboRWHLZt\n3OZ2Bidzmqp2klnGKhFHWlzfdQy4KwZHBmIr61ZD0clhQT1GvFwadtwIOb6sK1bd\nQV9JKUj7isLAgwQYAQoADwUCXxqhxwUJDwmcAAIbLgCoCRAzktc4YM6qTJ0gBBkB\nCgAGBQJfGqHHAAoJEEHCfTt8WL8QFjwEAMbXs54/bKxPK90JCXrnOJLzFt9lVqIL\ndqLz0IfAORBV33CjytOIewF3nPcTDg8pNagqoPPTbNt8kVIYejXcxL2UOmJTyaNI\nLPS+EJ7yFlwwCTTpV9N2k/5IkT41g/ftRkDYRh+QbhAyzkXOInK4glDpEjRomDwT\nGvi2eNJ8HEwVvLUD/jTLNOdbDvn0Ec69YslTjKuU4lgcE1BAaE5t989ZtElyBcCK\nEZkNlV6pbXhHGgS02+jCzjyzYtA7vKvfhYWWDooTChAapuIsk1x9cEtZwoThtHCi\nnBhVjI47A+FTW7V0lZ3fTnzGd5rQegwyA2NFEyi7N0ORB7Tt2Z/qtuYhUeT1x8FG\nBF8aoccBBADPlmZHz3BPUroQs22kivgIqDIqzde+Xyx4f1cD9lgXtQrVNgpLJg12\nVBZhYlLSnMO2iaVN5Nz9A8cI2QLQVf/rqcwMbrbbDGY00HWdiO324j4SVNi2S5qd\n+khytWdRf+IaLrKeuKpF+A2LC5SeLBFcVXnoZyOXQO9V5Hn8MOpaYQARAQAB/gkD\nCLGrEBg6pl+3YIGYr6f8TklnPYwu0onaxHN0k/eCQRj1x1KJSTHhqp+AxDBOWe2A\nNb+NpgDb6ytkF85mR0EP7cqvUklpJrT6HZ9s/7XA19i4TKbCCMJqFhO2TY51Two/\nxXe5P8N8cnF4VUQ+RKNmRhEuiNEiDyGVvOYDj2ercCbVWw/RkAZQgStq9JC/6kA0\nc6IN8Acz4MoGZZzIgT6ivigT34PYjR9oI6eeTRoOkI/SMbSz80SwO5JZi604Z2ND\n93FBbeMypReVvjrswX75OPK3nnUEuA/Vd1ZJ6W2iOFpr9TatamkljBnesaAibSd4\nrAvWdFUnGN/ywDt1foo8qfa8L/LCXc3Bk45CZvgZcQ7y9lLDlVALdNqQut8mYwkm\nLpruXy/laVQNk0QzpjI4RRmfczrm/jS37aADBxQzBWrpyx6vxhY3O619X5Wtn7iv\nvkHHAhfpG6Flc9fBMkJlza3HGPtBaPDAP5iSyFGn38eJ+wDxSJvCwIMEGAEKAA8F\nAl8aoccFCQ8JnAACGy4AqAkQM5LXOGDOqkydIAQZAQoABgUCXxqhxwAKCRBSGLfy\nKIi9F7e/BACAunLBaSWQx8Bo5com0VPmaa+0XNJWYjJicgXkefoLv7smXbaTf4Js\nVvoKzx+PcCixFUPdMeQAY4UTi3gph/KXl+wPLPI/y4Qv9KpBO7dZHkCDxFXNslC/\nlD5Ci6B8saZOGciEPXKBUAWQGqWfMCPfwPwlDoaaV2/Frnwbg5qDcjQ9BACEIxhx\npEYuzMb+GcrvYMa8ibLl8s/Q+0iNcHCJ68Q65VselAlJQHfYSh/Jh7Clv711PsQ9\nCI9AILEOBWG0/XBPjZX1f8+X8QYsqmLkoI61kQqj0peA5hNax5in9uBfhu+APoUf\n+Ezi18dPgc6HvDNO/cwtlJzwxISgzwi4aKix5Q==\n=Xibg\n-----END PGP PRIVATE KEY BLOCK-----"; // encrypted private key
  const passphrase = "12345"; // what the private key is encrypted with

  const { keys: [privateKey] } =  await openpgp.key.readArmored(privateKeyArmored);
  await privateKey.decrypt(passphrase);

  const {data: text} = await openpgp.sign({
      message: openpgp.cleartext.fromText(data), // CleartextMessage or Message object
      privateKeys: [privateKey]                             // for signing
  });
  return text;
};

module.exports = router;
