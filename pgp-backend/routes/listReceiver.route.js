const express = require("express");
const moment = require("moment");
const User = require("../models/user.model");
const Account = require("../models/account.model");
const { catch } = require("../utils/db");

const router = express.Router();

// Body gửi lên gồm có account_number, receiver_account_number và remind_name (remind_name có thể rỗng)
router.post("/", async function(req, res){
    // var objFriends = { fname:"fname",lname:"lname",surname:"surname" };
    //     Friend.findOneAndUpdate(
    //     { _id: req.body.id }, 
    //     { $push: { friends: objFriends  } },
    //     function (error, success) {
    //             if (error) {
    //                 console.log(error);
    //             } else {
    //                 console.log(success);
    //             }
    //         });
    //  )
    try {
        const _account = await Account.findOne({account_number: req.body.receiver_account_number});
        if(_account){
           if(req.body.remind_name == ""){
               const _user = await User.findOneAndUpdate({user_id: _account.user_id});
               const newReceiver = {
                 receiver_account_number : req.body.receiver_account_number,
                 remind_name: _user.username
               }

               const ret = await Account.findOneAndUpdate({
                   account_number: req.body.account_number
                 }, {
                  $push: {list: newReceiver}
                });

                res.status(201).send({"message" : "thêm thành công"});

           }else{
             const newReceiver1 = {
                receiver_account_number : req.body.receiver_account_number,
                remind_name: req.body.remind_name
              }

              const ret1 = await Account.findOneAndUpdate({
                 account_number: req.body.account_number
               }, {
                 $push: {list: newReceiver1}
              });

              res.status(201).send({"message" : "thêm thành công"});

           }

        }else{
           req.status(500).send("Không tồn tại account để thêm vào list");
        }

    }catch(err){
        res.status(500).send(err.message);
    }
})

router.get("/", async function(req, res){
   try{
     const _account = await Account.findOne({account_number: req.body.account_number});
     const ret = _account.list;
     res.status(200).send(ret);
   }catch(err){
    res.status(500).send(err.message);
   }
})

/* chưa xong*/
router.post("/edit", async function(req, res){
  try{
    const _account = await Account.findOne({account_number: req.body.account_number});
    const ret = _account.list;
    res.status(200).send(ret);
  }catch(err){
   res.status(500).send(err.message);
  }
})

router.post("/delete", async function(req, res){
   
})

module.exports = router;
