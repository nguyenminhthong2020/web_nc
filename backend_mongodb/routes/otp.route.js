// const express = require("express");
// const moment = require("moment");
// // const axios = require('axios');
// const User = require("../models/user.model");
// const Account = require("../models/account.model");
// const Otp = require('../models/otp.model');
// var nodemailer = require("nodemailer");
// var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "secondwebnc2020@gmail.com",
//       pass: "infymt6620",
//     },
// });

// // const {generateOTP, sendOTPMail} = require('../utils/util');
// // const router = require("./listReceiver.route");

// const router = express.Router();
// // Phát sinh otp và gửi đến mail
// router.post("/", async function(req, res){
//     const {user_id} = req.tokenPayload;

//         //const _account = await Account.findOne({user_id: user_id});
//         const _user = await User.findOne({user_id: user_id});
//         const code = Math.floor(Math.random() * 999999) + 100000;
//         let email = _user.email;
//         let fullname = _user.fullname;

//         var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
//           from: 'secondwebnc2020@gmail.com',
//           to: email,
//           subject: '[Xác nhận OTP]',
//           text: 'Tin nhắn từ ngân hàng Go ',
//           html: `<div>
//                      Xin chào ${fullname},
//                      <br><br>
//                      Vừa có một yêu cầu giao dịch từ bạn ở ngân hàng chúng tôi. <br>
//                      Dưới đây là mã OTP có thời hạn 10 phút : <br>
//                      <h2>${code}</h2><br>
//                      Nếu người yêu cầu không phải bạn, xin bỏ qua email này.
//                      <br><br>
//                      Trân trọng
//                 </div>`
//       }

//       transporter.sendMail(mainOptions, function(err, info){
//         if (error) {
//           res.status(500).send({status: "ERROR", message: "Không thể gửi message. " + error});

//         } else {

//           // Lưu OTP vào CSDL
//           const _body = {
//             email: email,
//             code: code,
//             time: moment().valueOf()
//         } 
//         let newOtp = Otp( _body);
//         const ret = await newOtp.save();

//         res.status(200).send({status: "ERROR", message: "Đã gửi đến email"});
//         }
//       });
// })

// // Xác minh OTP và gọi API thực hiện giao dịch
// module.exports = router;