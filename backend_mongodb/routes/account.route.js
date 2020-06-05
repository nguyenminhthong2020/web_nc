const express = require('express');
const moment = require('moment');
const User = require('../models/user.model');
const Account = require('../models/account.model');

const router = express.Router();

/*Thêm mới 1 account - từ một user_id bên User
+ Cái này chỉ dành cho trong nội bộ
+ Chỉ có nhân viên ngân hàng (admin, employee) mới có thể thêm mới 1 account
+ Trong request.body gửi lên là user_id và balance và id của employee / admin thực hiện việc này
+ Muốn add account phải khai báo id employee/admin thực hiện.*/

router.post("/", async function (req, res) {
    const rows = await User.findOne({user_id: req.body.user_id});
    console.log(rows);
    if(!rows){
      return res.status(403).send({ message: `Không tìm ra user có id ${req.body.user_id}` });
    };
    
    // Quy ước: mỗi account_number có dạng 5620 + user_id
    // Sở dĩ chọn 5620 vì code này tạo ra từ ngày 5/6/2020 
    var _balance = +req.body.balance || 0;
    let newAccount = await Account.create({
        account_number: "5620" + req.body.user_id,
        user_id: req.body.user_id,
        balance: _balance,
        status: 1,
        employee_id: req.body.employee_id,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss').toString()
    });

    if(newAccount){
          return res.status(201).send({
              "message": "Thành công.",
              newAccount
          });
     }else{
         return res.status(400).json({
         message: "Tạo tài khoản thất bại."
     })
    };

});



// Chỉ edit được số tiền trong tài khoản (nạp thêm)
// Employee thực hiện chức năng này. Admin cũng thực hiện được.
// Gửi lên body : account_number, money,   
router.post("/edit", async function (req, res) {
    const rows = await Account.findOne({account_number: req.body.account_number});

    if(!rows){
      return res.status(403).send({ message: `Không tìm ra account ${req.body.account_number}` });
    };
    
    let _balance = (+req.body.money || 0);
    _balance = _balance + rows.balance;
    const ret = await Account.findOneAndUpdate({user_id: req.body.user_id},{balance: _balance});
    
    if(ret){
        return res.status(500).send({ message: `Thành công.` });
    }else{
        return res.status(500).send({ message: `Thất bại.` });
    }
});

module.exports = router;