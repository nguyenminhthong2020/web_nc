const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const randToken = require('rand-token');
const moment = require("moment");
// const axios = require("axios");
//const md5 = require("md5");
const User = require("../models/user.model");
//const Account = require("../models/account.model");
const Otp = require("../models/otp.model");
var nodemailer = require("nodemailer");
const config = require("../config/default.json");
//const process1 = require("../config/process.config");
// const jwt_decode = require('jwt-decode');
const createError = require('http-errors');


const authModel = require('../models/auth.model');
// const userModel = require('../models/user.model');
// const User = require('../models/user.model');
const UserFreshToken = require('../models/userRefreshToken.model');

const router = express.Router();


async function updateRefreshToken(user_id, token){
  await UserFreshToken.findOneAndDelete({user_id: user_id});
  let ret = await UserFreshToken.create({
      user_id: user_id,  
      refresh_token: token
    });
    return ret;
}
async function verifyRefreshToken(user_id, token){
  const rows = await UserFreshToken.findOne({user_id: user_id, refresh_token: token});
  if (!rows)
    return false;

  return true;
}
/**
 * login
 */
router.post('/login', async (req, res) => {
  // req.body = {
  //   "username": "admin",
  //   "password": "admin"
  // }
  const ret = await authModel.login(req.body);
  if (ret === null) {
    return res.json({
      authenticated: false
    })
  }
  const user_id = ret.user_id;

  const accessToken = generateAccessToken(user_id);
  const refreshToken = generateRefreshToken(user_id);

  await updateRefreshToken(user_id, refreshToken);
 

  res.json({
    // authenticated: true,
    accessToken,
    refreshToken
  })
})


/**
 * refresh token
 */

// if (error.name === 'TokenExpiredError')
router.post('/refresh', async (req, res) => {
  // req.body = {
  //   accessToken,
  //   refreshToken
  // }

  // const { user_id } = jwt_decode(req.body.accessToken);
  jwt.verify(req.body.accessToken, config.auth.secret, { ignoreExpiration: true }, async function (err, payload) {
    const { user_id } = payload;
    //console.log(payload);
    const ret = await verifyRefreshToken(user_id, req.body.refreshToken);
    if (ret === false) {
      throw createError(400, 'Invalid refresh token.');
    }

    const accessToken = generateAccessToken(user_id);
    res.json({ accessToken });
  })
});


// Quên mật khẩu 
// body gửi lên có username và email
router.post('/forgot-password', async function(req, res){
      //const _account = await Account.findOne({user_id: user_id});
      const _user = await User.findOne({ username: req.body.username, email: req.body.email });
      if(!_user)
      {
        return res.status(400).send({
          message: `Không tồn tại người dùng thỏa username và email vừa nhập`
        });
      }

      const code = Math.floor(Math.random() * 999999) + 100000;
      let id = _user.user_id;
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
                      Vừa có một thông báo quên mật khẩu từ bạn ở ngân hàng chúng tôi. <br>
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
            user_id: id,
            email: email,
            code: code,
            time: time,
            message: "Quên mật khẩu"
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

// body gửi lên có code, newPassword
// header có otp_id và email (kết quả trả về của API trên)
router.post("/forgot-password/confirm", async function(req, res){
        
      const time = moment().valueOf();
      const _otp_id = req.get("otp_id");
      const _email = req.get("email");
      const str = _email + "";

      if (!_otp_id) {
        return res
          .status(400)
          .send({ status_code: "NO_OTPID", message: "Thiếu otp_id" });
      } else {
        const _otp = await Otp.findOne({ otp_id: _otp_id,  code: req.body.code});

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
            
            const newPasswordHash = bcrypt.hashSync(req.body.newPassword, 8);
            const ret2 = await User.findOneAndUpdate({user_id: _otp.user_id}, {password: newPasswordHash});
            
            
            if (ret2) {
              return res.status(200).send({ status: "PASS_CHANGED", message: "Cập nhật thành công." });
                 
              }else{
                return res.status(500).send({ status: "ERROR", message: "Cập nhật thất bại." });
              }

            

          }
        }
      }
});


const generateAccessToken = user_id => {
  const payload = { user_id };
  const accessToken = jwt.sign(payload, config.auth.secret, {
    expiresIn: config.auth.expiresIn
  });

  return accessToken;
}

const generateRefreshToken = user_id => {
  const payload = { user_id };
  const accessToken = jwt.sign(payload, config.auth.secret, {
    expiresIn: config.auth.expiresIn2
  });

  return accessToken;
}

module.exports = router;