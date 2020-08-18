const express = require("express");
const moment = require("moment");
// const axios = require("axios");
// const md5 = require("md5");
// const NodeRSA = require("node-rsa");
const User = require("../models/user.model");
const Account = require("../models/account.model");
const ListDebt = require('../models/listDebt.model');
const Notify2 = require('../models/notify2.model');
const Otp = require("../models/otp.model");
const TransactionDebt = require("../models/transactionDebtHistory.model");
var nodemailer = require("nodemailer");
const config = require("../config/default.json");
// const process1 = require("../config/process.config");

const router = express.Router();


// body gửi lên gồm có debt_id (trong ListDebt)
router.post("/", async function (req, res) {
    const { user_id } = req.tokenPayload;
  
    //const _account = await Account.findOne({user_id: user_id});
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

        const _debt = await ListDebt.findOne({debt_id: req.body.debt_id});
        if(!_debt){
           return res.status(400).send({ status: "NO_DEBTID", message: "Không tồn tại debt_id"});
        }
        
        
        const time = moment().valueOf();
        // Lưu OTP vào CSDL
        const _body = {
          user_id: user_id,
          email: email,
          code: code,
          time: time,
          sender_account_number: _debt.debtor_account_number,
          receiver_account_number: _debt.creditor_account_number,
          sender_bank_code: "GO",
          receive_bank_code: "GO",
          money: _debt.money,
          transaction_fee: 0,
          type_fee: 1, 
          message: "Gửi trả nợ"
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
  // Trong body có trường là otp (req.body.otp), debt_id 
  router.post("/confirm", async function (req, res) {
    const time = moment().valueOf();
    const { user_id } = req.tokenPayload;
    const _otp_id = req.get("otp_id");
    const _email = req.get("email");
    const str = _email + "";
    console.log("\n1");
    if (!_otp_id) {
      return res
        .status(400)
        .send({ status_code: "NO_OTPID", message: "Thiếu otp_id" });
    } else {
      const _otp = await Otp.findOne({ otp_id: _otp_id });
      console.log("\n2");
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
          console.log("\n3");
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

           console.log("\n4");
          try {
                
  
              const accountReceive = await Account.findOne({
                account_number: _otp.receiver_account_number,
              });
              let balance2 = accountReceive.balance;
              console.log("\n5");
              const ret1 = await Account.findOneAndUpdate(
                {
                  account_number: _otp.sender_account_number,
                },
                {
                  balance: balance1 - _otp.money - 3000,
                }
              );
              console.log("\n6");
              const ret2 = await Account.findOneAndUpdate(
                {
                  account_number: _otp.receive_bank_code,
                },
                {
                  balance: balance2 + _otp.money,
                }
              );
              console.log("\n7");
              // Update Transaction Debt Model
              const _body1 = {
                  creditor_account_number: _otp.receiver_account_number,   // chủ nợ
                  debtor_account_number: _otp.sender_account_number,     // người nợ
                  money: _otp.money,
                  transaction_debt_fee: 0,
                 created_at: moment().format("YYYY-MM-DD HH:mm:ss").toString()
              };
    
              let newTransaction = TransactionDebt(_body1);
              const ret3 = await newTransaction.save();
              console.log("\n8");
              // Update List Debt Model
              const updateListDebt = await ListDebt.findOneAndUpdate(
                  {debt_id: req.body.debt_id},
                  {isActive: 0}
                  );
              
               // gửi notify 
               // Gửi bằng giao diện client màn hình notify 
                const _body3 = {
                  sender_account_number: updateListDebt.debtor_account_number,  
                  sender_fullname : updateListDebt.debtor_fullname, 
                  receiver_account_number: updateListDebt.creditor_account_number,
                  receiver_fullname: updateListDebt.creditor_fullname,
                  message: "Đã thanh toán nợ",  
                  notify_type : "3",   // thanh toán nhắc nợ
                  created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
              } 
              let newNoti = Notify2( _body3);
              const ret7 = await newNoti.save();
              console.log("\n8");
              return res.status(200).send({
                status: "DONE",
                message: "Đã thanh toán",
                notify2_id : ret7.notify2_id
            });

              // Gửi mail notify cho người nhắc :
              // const _userSecond = await User.findOne({user_id: updateListDebt.user_id});
              // const emailSecond = _userSecond.email;

              // var transporter = nodemailer.createTransport({
              //   service: "gmail",
              //   auth: {
              //     user: "secondwebnc2020@gmail.com",
              //     pass: "infymt6620",
              //   },
              // });
        
              // var mainOptions = {
              //   // thiết lập đối tượng, nội dung gửi mail
              //   from: "secondwebnc2020@gmail.com",
              //   to: emailSecond,
              //   subject: "[Xác nhận OTP]",
              //   text: "Tin nhắn từ ngân hàng Go ",
              //   html: `<div>
              //                   Xin chào ${updateListDebt.creditor_fullname},
              //                   <br><br>
              //                   Người nợ tên ${updateListDebt.debtor_fullname} đã thanh toán.
              //                   <br><br>
              //                   Trân trọng
              //               </div>`,
              // };
        
              // transporter.sendMail(mainOptions, function (error, info) {
              //   if (error) {
              //     res
              //       .status(500)
              //       .send({
              //         status: "ERROR",
              //         message: "Không thể gửi message. " + error,
              //       });
              //   } else {
              //       return res.status(200).send({
              //         status: "DONE",
              //         message: "Đã thanh toán"
              //     });
              //   }
              // });

                  // return res.status(200).send({status: "DONE", message: "Đã thanh toán"});
          }catch(err){
               
            return res.status(500).send({ status: "ERROR", message: "Thất bại." + err});
          }
  
          

          }

      }
    }
  });


module.exports = router;