const express = require("express");
// const moment = require("moment");
const User = require("../models/user.model");
const Account = require("../models/account.model");

const router = express.Router();


router.get("/", async function (req, res) {
  const { user_id } = req.tokenPayload;
  //const checkUser = await User.findOne({user_id: user_id});

  // if(checkUser.role == 0){
  //     res.status(400).send("Bạn không đủ thẩm quyền.");
  // }
  try {
    const rows = await Account.findOne({ user_id: user_id });
    return res.status(200).send({
        rows
      });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

/*Thêm mới 1 account - từ một user_id bên User
+ Cái này chỉ dành cho trong nội bộ
+ Chỉ có nhân viên ngân hàng (admin, employee) mới có thể thêm mới 1 account
+ Trong request.body gửi lên là user_id và balance và id của employee / admin thực hiện việc này
+ Muốn add account phải khai báo id employee/admin thực hiện.*/

// router.post("/", async function (req, res) {
//   // user_id phía trên này là lấy ra từ Payload qua middleware Verify
//   const { user_id } = req.tokenPayload;
//   const checkUser = await User.findOne({ user_id: user_id });
//   if (checkUser.role == 0) {
//     res.status(400).send("Bạn không đủ thẩm quyền.");
//   }

//   const rows = await User.findOne({ user_id: req.body.user_id });
//   console.log(rows);
//   if (!rows) {
//     return res
//       .status(403)
//       .send({ message: `Không tìm ra user có id ${req.body.user_id}` });
//   }

//   // Quy ước: mỗi account_number có dạng 12020 + user_id
//   var _balance = +req.body.balance || 0;
//   let newAccount = await Account.create({
//     account_number: "12020" + req.body.user_id,
//     user_id: req.body.user_id,
//     balance: _balance,
//     status: 1,
//     employee_id: req.body.employee_id,
//     created_at: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
//   });

//   if (newAccount) {
//     return res.status(201).send({
//       message: "Thành công.",
//       newAccount,
//     });
//   } else {
//     return res.status(400).json({
//       message: "Tạo tài khoản thất bại.",
//     });
//   }
// });

// Chỉ edit được số tiền trong tài khoản (nạp thêm)
// Employee thực hiện chức năng này. Admin cũng thực hiện được.
// Gửi lên body : account_number, money, username, type  // 1 : cung cấp account_number, 2 : cung cấp username
// type kiểu chuỗi
router.post("/edit", async function (req, res) {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const { user_id } = req.tokenPayload;
    const checkUser = await User.findOne({ user_id: user_id });
    if (checkUser.role == 0) {
      return res.status(400).send({message:"Bạn không đủ thẩm quyền."});
    }
    
    if(req.body.type == "1"){
        const rows = await Account.findOne({
          account_number: req.body.account_number,
        });
      
        if (!rows) {
          return res
            .status(403)
            .send({ message: `Không tìm ra account ${req.body.account_number}` });
        }
      
        let _balance = +req.body.money || 0;
        _balance = _balance + rows.balance;
        const ret = await Account.findOneAndUpdate(
          { account_number: req.body.account_number },
          { balance: _balance}
        );
      
        if (ret) {
          return res.status(500).send({ message: `Thành công.` });
        } else {
          return res.status(500).send({ message: `Thất bại.` });
        }
    }

    if(req.body.type == "2"){
      const _user = await User.findOne({username: req.body.username});

      if (!_user) {
        return res
          .status(403)
          .send({ message: `Không tìm ra tài khoản có username ${req.body.username}` });
      }
      
      const rows = await Account.findOne({
        user_id: _user.user_id
      });
    
      let _balance = +req.body.money || 0;
      _balance = _balance + rows.balance;
      const ret = await Account.findOneAndUpdate(
        { user_id: _user.user_id },
        { balance: _balance}
      );
    
      if (ret) {
        return res.status(500).send({ message: `Thành công.` });
      } else {
        return res.status(500).send({ message: `Thất bại.` });
      }

    }
  
});

router.post("/delete", async function (req, res) {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const { user_id } = req.tokenPayload;
    const checkUser = await User.findOne({ user_id: user_id });
    if (checkUser.role == 0) {
      return res.status(400).send({message:"Bạn không đủ thẩm quyền."});
    }
    
    try{
    const ret = Account.findOneAndDelete({user_id: user_id});
    return res.status(200).send("Xóa thành công");
    }catch(err){
        return res.status(500).send({
            message: " Xóa thất bại",
            err
        })
    }
  });

module.exports = router;
