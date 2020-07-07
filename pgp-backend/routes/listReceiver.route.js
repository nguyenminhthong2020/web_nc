const express = require("express");
// const moment = require("moment");
const User = require("../models/user.model");
const Account = require("../models/account.model");
// const { catch } = require("../utils/db");

const router = express.Router();

// Body gửi lên gồm có receiver_account_number và remind_name (remind_name có thể rỗng)
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
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const {user_id} = req.tokenPayload;

    try {
        const _account = await Account.findOne({account_number: req.body.receiver_account_number});
        if(_account){
           if(req.body.remind_name == ""){
               const _user = await User.findOne({user_id: _account.user_id});
               const newReceiver = {
                 receiver_account_number : req.body.receiver_account_number,
                 remind_name: _user.username
               }

               const ret = await Account.findOneAndUpdate({
                   user_id: user_id
                 }, {
                  $push: {list: newReceiver}
                });

                return res.status(201).send({message : "thêm thành công"});

           }else{
             const newReceiver1 = {
                receiver_account_number : req.body.receiver_account_number,
                remind_name: req.body.remind_name
              }

              const ret1 = await Account.findOneAndUpdate({
                 user_id: user_id
               }, {
                 $push: {list: newReceiver1}
              });

              return res.status(201).send({message : "thêm thành công"});

           }

        }else{
           req.status(500).send("Không tồn tại account để thêm vào list");
        }

    }catch(err){
      return res.status(500).send(err.message);
    }
})

router.get("/", async function(req, res){
  const {user_id} = req.tokenPayload;

   try{
     const _account = await Account.findOne({user_id: user_id});
     const ret = _account.list;
     return res.status(200).send(ret);
   }catch(err){
    return res.status(500).send(err.message);
   }
})

/* trong body gửi lên có  receiver_account_number và remind_name
   chỉ edit được trường remind_name 
*/
router.post("/edit", async function(req, res){
  const {user_id} = req.tokenPayload;
  try{
    const _account = await Account.findOne({user_id: user_id});
    //const index = _account.list.findIndex(item => item.receiver_account_number == req.body.receiver_account_number);
    
    for (var i in _account.list) {
      if (_account.list[i].receiver_account_number == req.body.receiver_account_number) {
        _account.list[i].remind_name = req.body.remind_name;
         break; 
      }
    }

    await Account.findOneAndUpdate(
        {user_id: user_id}, 
        {
          list: _account.list
        });
    
      // await Account.updateOne(
      //   {
      //      account_number: req.body.account_number,
      //      list: { $elemMatch: { receiver_account_number: req.body.receiver_account_number} }
      //   },
      //   {
      //     $set: {remind_name : req.body.remind_name}
      //   }
      // );

      return res.status(200).send({message: "ok"});

  }catch(err){
    return res.status(500).send(err.message);
  }
})

/* 
   trong body gửi lên có receiver_account_number và remind_name
*/
router.post("/delete", async function(req, res){
  const {user_id} = req.tokenPayload;

   try{

    //  const ret = await Account.findOneAndDelete({
    //   account_number: req.body.account_number,
    //   list: { $elemMatch: { receiver_account_number: req.body.receiver_account_number}} 
    // });

      const _account = await Account.findOne({user_id: user_id});
      const index = _account.list.findIndex(item => item.receiver_account_number == req.body.receiver_account_number);
      
      delete _account.list[index];

      const ret = await Account.findOneAndUpdate({
         user_id: user_id
      }, {
        list : _account.list
     });

     return res.status(200).send("Xóa thành công");
   }catch(err){
    return res.status(500).send(err.message);
   }
})

module.exports = router;
