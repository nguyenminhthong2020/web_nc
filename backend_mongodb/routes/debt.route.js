const express = require("express");
const moment = require("moment");
// const axios = require("axios");
// const md5 = require("md5");
// const NodeRSA = require("node-rsa");
const User = require("../models/user.model");
const Account = require("../models/account.model");
const Notify2 = require('../models/notify2.model');
const ListDebt = require("../models/listDebt.model");
// const { message } = require("openpgp");
// const Otp = require("../models/otp.model");
// const Transaction = require("../models/TransactionHistory.model");
var nodemailer = require("nodemailer");
// const config = require("../config/default.json");
// const process1 = require("../config/process.config");

const router = express.Router();

// load lên lần đầu danh sách những người mình đã nhắc nợ (để đem vào thẻ select)
router.get("/debtors", async function (req, res) {
  const { user_id } = req.tokenPayload;

  const list = await ListDebt.find({ user_id: user_id });

  res.status(200).send(list);
});

// Lấy thông tin người nợ
// params có debtor_account_number (tài khoản người nợ)
router.get("/get-account/:debtor_account_number", async function (req, res) {
  const { user_id } = req.tokenPayload;
  //const checkUser = await User.findOne({user_id: user_id});

  // if(checkUser.role == 0){
  //     res.status(400).send("Bạn không đủ thẩm quyền.");
  // }
  try {
    const rows = await Account.findOne({
      account_number: req.params.debtor_account_number,
    });
    if (!rows) {
      return res.status(400).send({
        status: "NO_ACCOUNT",
        message: "Không tồn tại tài khoản vừa nhập",
      });
    }

    const _user = User.findOne({ user_id: rows.user_id });

    return res.status(200).send({
      fullname: _user.fullname,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// Tạo nhắc nợ
// Trường hợp 1 :  body gửi lên gồm có debtor_account_number
// money, message
router.post("/create", async function (req, res) {
  const { user_id } = req.tokenPayload;

  const accountNum = await Account.findOne({
    account_number: req.body.debtor_account_number,
  });
  if (!accountNum) {
    return res
      .status(400)
      .send({
        status: "NO_ACCOUNT",
        message: "Không tồn tại người nợ có số tài khoản gửi đi",
      });
  } else {
    // creditor_account_number là chủ nợ, debtor_account_number là con nợ
    const x = await Account.findOne({ user_id: user_id });
    const _x = await User.findOne({ user_id: user_id });

    const _userDebtor = await User.findOne({ user_id: accountNum.user_id });

    const _body = {
      user_id: user_id,
      creditor_account_number: x.account_number, // chủ nợ
      creditor_fullname: _x.fullname, // tên chủ nợ
      debtor_account_number: accountNum.account_number, // người nợ
      debtor_username: _userDebtor.username,
      debtor_fullname: _userDebtor.fullname,
      money: req.body.money,
      message: req.body.message,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
      isTrue: 0, // Phải chờ xác nhận bên kia. 1: đúng (có nợ thật), 0: sai (ví dụ : gửi nhắc nợ nhầm người chẳng hạn)
      isActive: 1,
    };

    ListDebt.create(_body, async (err, result) => {
      if (err) {
        return res.status(500).send({ status: "ERROR", message: err });
      } else {
        return res.status(201).send({
          status: "OK",
          message: "Đã gửi nhắc nợ",
          debt_id: result.debt_id,
        });
      }
    });
  }
});

// Tạo nhắc nợ
// Trường hợp 2 :  body gửi lên gồm có debtor_username
// money, message
// (đã có người nợ trong danh sách)
router.post("/create2", async function (req, res) {
  const { user_id } = req.tokenPayload;

  // tìm tài khoản người nợ
  const accountNum = await ListDebt.findOne({
    debtor_username: req.body.debtor_username,
  });
  if (!accountNum) {
    return res
      .status(400)
      .send({
        status: "NO_ACCOUNT",
        message: "Không tồn tại người nợ có số tài khoản gửi đi",
      });
  } else {
    const _creditor = Account.findOne({ user_id: user_id });

    const _body = {
      user_id: user_id,
      creditor_account_number: _creditor.account_number, // chủ nợ
      debtor_account_number: accountNum.account_number, // người nợ
      debtor_username: accountNum.debtor_username,
      debtor_fullname: accountNum.debtor_fullname,
      money: req.body.money,
      message: req.body.message,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
      isTrue: 0, // Phải chờ xác nhận bên kia. 1: đúng (có nợ thật), 0: sai (ví dụ : gửi nhắc nợ nhầm người chẳng hạn)
      isActive: 1,
    };

    ListDebt.create(_body, async (err, result) => {
      if (err) {
        return res.status(500).send({ status: "ERROR", message: err });
      } else {
        return res.status(201).send({
          status: "OK",
          message: "Đã gửi nhắc nợ",
          debt_id: result.debt_id,
        });
      }
    });
  }
});

// Xem danh sách nợ do bản thân tạo ra
router.get("/view1", async function (req, res) {
  const { user_id } = req.tokenPayload;

  const list = await ListDebt.find({ user_id: user_id, isActive: 1 });
  // const account = await Account.findOne({user_id: user_id});
  // const list = await ListDebt.find({creditor_account_number : account.account_number});

  return res.status(200).send(list);
});

//  Danh sách nợ do người khác gửi
router.get("/view2", async function (req, res) {
  const { user_id } = req.tokenPayload;
  const account = await Account.findOne({ user_id: user_id });

  const list = await ListDebt.find({
    debtor_account_number: account.account_number,
    isActive: 1,
  });

  return res.status(200).send(list);
});

// Danh sách nợ chưa thanh toán
// router.get('/view2', async function(req, res){
//   const { user_id } = req.tokenPayload;
//   const account = await Account.findOne({user_id: user_id});

//   const list = await ListDebt.find({debtor_account_number : account.account_number, isActive : 1});

//   return res.status(200).send(list);
// })

// Hủy nhắc nợ (do người khác gửi)
// Các nguyên nhân : đã trả xong, chưa muốn trả, không hề nợ (bên kia gửi nhầm),...
// body gửi lên :
// body gửi lên gồm có notify_message
router.post("/delete1/:debt_id", async function (req, res) {
   //const { user_id } = req.tokenPayload;
  
   try{
    const ret = await ListDebt.findOneAndUpdate(
      {
        debt_id: req.params.debt_id,
      },
      {
        isActive: 0,
      }
    );
     
    //const _ret = await ListDebt.findOne({debt_id : req.params.debt_id});
    
      //const _accountSecond = await Account.findOne({account_number: ret.creditor_account_number});

      // const _userSecond = await User.findOne({user_id: ret.user_id});
      // const emailSecond = _userSecond.email;


      //const fullnameSecond = _userSecond.fullname;
      //const fullname = ret.debtor_fullname;
       
      // Gửi = giao diện client màn hình notify
        const _body1 = {
          sender_account_number: ret.debtor_account_number, 
          sender_fullname : ret.debtor_fullname,
          receiver_account_number: ret.creditor_account_number,
          receiver_fullname: ret.creditor_fullname,
          message: req.body.notify_message,    // Nội dung cần chuyển, Ví dụ: "tui ko có nợ ông"
          notify_type : "0",
          created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString(),
          is_view : "0"  // chưa xem thông báo
      } 
      let newNoti = Notify2( _body1);
      const ret1 = await newNoti.save();

      return res.status(200).send({
        status: "OK",
        message: "Đã xóa",
        notify2_id : ret1.notify2_id
    });

    }catch(err){
      return res.status(500).send({
                status: "ERROR",
                message: "Không thể xóa"
            });
    }
      // Gửi = email
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
      //   subject: "[Hủy nhắc nợ]",
      //   text: "Tin nhắn từ ngân hàng Go ",
      //   html: `<div>
      //                   Xin chào ${ret.creditor_fullname},
      //                   <br><br>
      //                   Vừa có một yêu cầu hủy nhắc nợ từ ${ret.debtor_fullname} với nội dung là :<br>
      //                   ${req.body.notify_message}
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
      //         status: "OK",
      //         message: "Đã xóa"
      //     });
      //   }
      // });
       
       
    

  
});

// Hủy nhắc nợ (do bản thân tạo)
// Các nguyên nhân : đã trả xong, chưa muốn trả, không hề nợ (bên kia gửi nhầm),...
// body gửi lên :
// body gửi lên gồm notify_message
router.post("/delete2/:debt_id", async function (req, res) {
 
    try{
      const ret = await ListDebt.findOneAndUpdate(
        {
          debt_id: req.params.debt_id,
        },
        {
          isActive: 0,
        }
      );
          
          // Gửi bằng giao diện client màn hình notify 
          const _body1 = {
            sender_account_number: ret.creditor_account_number,  
            sender_fullname : ret.creditor_fullname, 
            receiver_account_number: ret.debtor_account_number,
            receiver_fullname: ret.debtor_fullname,
            message: req.body.notify_message,    // Nội dung cần chuyển, Ví dụ: "tui gửi nhầm"
            notify_type : "0",
            created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString(),
            is_view : "0"  // chưa xem thông báo
        } 
        let newNoti = Notify2( _body1);
        const ret1 = await newNoti.save();

        return res.status(200).send({
          status: "OK",
          message: "Đã xóa",
          notify2_id : ret1.notify2_id
      });

    }catch{err}{
        return res.status(500).send({
          status: "ERROR",
          message: "Không thể xóa"
      });     
    }

    
      // const _accountSecond = await Account.findOne({account_number: ret.debtor_account_number});
      // const _userSecond = await User.findOne({user_id: _accountSecond.user_id});
      // const emailSecond = _userSecond.email;
      // //const fullnameSecond = _userSecond.fullname;
      // //const fullname = ret.debtor_fullname;

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
      //   subject: "[Hủy nhắc nợ]",
      //   text: "Tin nhắn từ ngân hàng Go ",
      //   html: `<div>
      //                   Xin chào ${_userSecond.fullname},
      //                   <br><br>
      //                   Vừa có một yêu cầu hủy nhắc nợ từ ${ret.creditor_fullname} với nội dung là :<br>
      //                   ${req.body.notify_message}
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
      //         status: "OK",
      //         message: "Đã xóa"
      //     });
      //   }
      // });
       
       
    }

 );

module.exports = router;
