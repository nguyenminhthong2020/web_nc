const express = require("express");
//const moment = require("moment");
const User = require("../models/user.model");
const Account = require("../models/account.model");
const ListReceiver = require('../models/listReceiver.model');

const router = express.Router();

// Body gửi lên gồm có receiver_account_number và remind_name (remind_name có thể rỗng)
router.post("/", async function(req, res){

    const {user_id} = req.tokenPayload;

    try {
        const _account = await Account.findOne({account_number: req.body.receiver_account_number});
        if(_account){
           if(req.body.remind_name == ""){
               const _user = await User.findOne({user_id: _account.user_id});
               const newReceiver = {
                 user_id : user_id,
                 receiver_account_number : req.body.receiver_account_number,
                 remind_name: _user.username
               }

               let newList = ListReceiver(newReceiver);
               const ret = await newList.save();

               return res.status(201).send({message : "thêm thành công"});

           }else{
             const newReceiver1 = {
                user_id: user_id,
                receiver_account_number : req.body.receiver_account_number,
                remind_name: req.body.remind_name
              }

              let newList1 = ListReceiver(newReceiver1);
              const ret1 = await newList1.save();

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
     const list = await ListReceiver.find({user_id: user_id});
     return res.status(200).send(list);
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
    await ListReceiver.findOneAndUpdate({
        user_id: user_id,
        receiver_account_number: req.body.receiver_account_number
    },
    {
        remind_name: req.body.remind_name
    });

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
    await ListReceiver.findOneAndDelete({
      user_id: user_id,
      receiver_account_number: req.body.receiver_account_number
   });
      return res.status(200).send({message:"đã xóa"});
   }catch(err){
      return res.status(500).send(err.message);
   }
})

module.exports = router;
