const express = require("express");
const moment = require("moment");
const User = require("../models/user.model");
const Account = require("../models/account.model");
const SavingsAccount = require('../models/savingsAccount.model');

const router = express.Router();

// id trong param là user_id của customer muốn tạo, ko phải user_id lấy ra từ req.tokenPayload
router.post("/create/:id", async function (req, res) {
    const { user_id } = req.tokenPayload;
    //const checkUser = await User.findOne({user_id: user_id});
  
    // if(checkUser.role == 0){
    //     res.status(400).send("Bạn không đủ thẩm quyền.");
    // }
    try {
        const _body1 = {
            saving_account_number: "22020" + req.params.id,
            user_id: req.params.id,
            balance: 0,
            status: 1,
            created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
        } 
        let newSaAccount = SavingsAccount( _body1);
        const ret1 = await newSaAccount.save();

        return res.status(201).send({
            message: "Tạo thành công",
            ret1
            // username: ret.username,
            // account_number: ret1.account_number
        }); 
    } catch (err) {
      return res.status(500).send(err.message);
    }
});

router.get("/", async function (req, res) {
  const { user_id } = req.tokenPayload;
  //const checkUser = await User.findOne({user_id: user_id});

  // if(checkUser.role == 0){
  //     res.status(400).send("Bạn không đủ thẩm quyền.");
  // }
  try {
    const rows = await SavingsAccount.findOne({ user_id: user_id });
    return res.status(200).send({
        rows
      });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});


// Tìm fullname từ account_number (trong nội bộ)
// router.get("/:account_number", async function (req, res) {
//   const { user_id } = req.tokenPayload;
//   //const checkUser = await User.findOne({user_id: user_id});

//   // if(checkUser.role == 0){
//   //     res.status(400).send("Bạn không đủ thẩm quyền.");
//   // }
//   try {
//     const _account = await Account.findOne({ account_number: req.params.account_number });
//     if(_account){
//       const _user = await User.findOne({user_id: _account.user_id});
//       return res.status(200).send({
//          "status": "OK",
//          "fullname": _user.fullname
//       });
//     }else{
//       return res.status(200).send({
//         "status": "NO_ACCOUNT",
//         "fullname": ""
//      });
//     }
      
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });


module.exports = router;
