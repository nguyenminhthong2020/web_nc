const express = require("express");
const moment = require("moment");
const axios = require("axios");
// const md5 = require("md5");
const Notify = require('../models/notify.model');
// const crypto = require('crypto');
// const openpgp = require('openpgp');
// const NodeRSA = require("node-rsa");
// const User = require("../models/user.model");
 const Account = require("../models/account.model");
// const Otp = require("../models/otp.model");
// const Transaction = require("../models/TransactionHistory.model");
// const ListReceiver = require('../models/listReceiver.model');

// var nodemailer = require("nodemailer");
// const config = require("../config/default.json");
// const process1 = require("../config/process.config");

const router = express.Router();

router.get("/:id", async function (req, res) {
    const { user_id } = req.tokenPayload;
    //const checkUser = await User.findOne({user_id: user_id});
  
    // if(checkUser.role == 0){
    //     res.status(400).send("Bạn không đủ thẩm quyền.");
    // }
    try {
      const rows = await Notify.findOne({ notify_id : req.params.id });
      return res.status(200).send({
          rows
        });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

  router.post("/all/", async function (req, res) {
    const { user_id } = req.tokenPayload;
    const _account  = await Account.findOne({user_id: user_id});
    //const checkUser = await User.findOne({user_id: user_id});
    console.log("\n1");
    // if(checkUser.role == 0){
    //     res.status(400).send("Bạn không đủ thẩm quyền.");
    // }
    try {
      console.log("\n2");
      const rows = await Notify.find({ receiver_account_number : _account.account_number })
                               .sort({notify_id: -1});
      console.log("\n3");
      return res.status(200).send({
          rows
        });
    } catch (err) {
      console.log("\n4");
      return res.status(500).send(err.message);
    }
  });

module.exports = router;
