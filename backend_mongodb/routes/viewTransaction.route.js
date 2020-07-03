const express = require("express");
const moment = require("moment");
const axios = require("axios");
const md5 = require("md5");
const NodeRSA = require("node-rsa");
const User = require("../models/user.model");
const Account = require("../models/account.model");
const ListDebt = require('../models/_debt/listDebt.model');
const Otp = require("../models/otp.model");
const Transaction = require('../models/TransactionHistory.model');
const TransactionDebt = require("../models/_debt/transactionDebtHistory.model");
var nodemailer = require("nodemailer");
const config = require("../config/default.json");
const process1 = require("../config/process.config");

const router = express.Router();

/* Phân hệ Customer */
//Xem lịch sử Giao dịch nhận tiền
router.get('/receive', async function(req, res){
    const { user_id } = req.tokenPayload;
    
    try{
        const _account = await Account.findOne({user_id: user_id});
        const list = await Transaction.find({receiver_account_number: _account.account_number})
                                      .sort({transaction_id: 1});

        res.status(200).send(list);
    }catch(err){
        res.status(500).send(err.message);
    }
});

//Xem lịch sử Giao dịch chuyển khoản
router.get('/send', async function(req, res){
    const { user_id } = req.tokenPayload;
    
    try{
        const _account = await Account.findOne({user_id: user_id});
        const list = await Transaction.find({sender_account_number: _account.account_number})
                                      .sort({transaction_id: 1});
                                      
        res.status(200).send(list);
    }catch(err){
        res.status(500).send(err.message);
    }
});

//Xem lịch sử Giao dịch thanh toán nhắc nợ
router.get('/debt', async function(req, res){
    const { user_id } = req.tokenPayload;
    const checkUser = await User.findOne({ user_id: user_id });
    if (checkUser.role == 0) {
      res.status(400).send("Bạn không đủ thẩm quyền.");
    }

    try{
        const _account = await Account.findOne({user_id: user_id});
        const list = await TransactionDebt.find({debtor_account_number: _account.account_number})
                                       .sort({transaction_debt_id: 1});

        res.status(200).send(list);
    }catch(err){
        res.status(500).send(err.message);
    }
   
});


/* Phân hệ Employee */
//Xem lịch sử Giao dịch nhận tiền
// body gửi lên có account_number (của khách)
router.get('/receive', async function(req, res){
    const { user_id } = req.tokenPayload;
    const checkUser = await User.findOne({ user_id: user_id });
    if (checkUser.role == 0) {
      res.status(400).send("Bạn không đủ thẩm quyền.");
    }
    
    try{
        //const _account = await Account.findOne({account_number: req.body.account_number});
        const list = await Transaction.find({receiver_account_number: req.body.account_number})
                                      .sort({transaction_id: 1});

        res.status(200).send(list);
    }catch(err){
        res.status(500).send(err.message);
    }
});

//Xem lịch sử Giao dịch chuyển khoản
// body gửi lên có account_number (của khách)
router.get('/send', async function(req, res){
    const { user_id } = req.tokenPayload;
    const checkUser = await User.findOne({ user_id: user_id });
    if (checkUser.role == 0) {
      res.status(400).send("Bạn không đủ thẩm quyền.");
    }
    
    try{
        //const _account = await Account.findOne({user_id: user_id});
        const list = await Transaction.find({sender_account_number: req.body.account_number})
                                      .sort({transaction_id: 1});
                                      
        res.status(200).send(list);
    }catch(err){
        res.status(500).send(err.message);
    }
});

//Xem lịch sử Giao dịch thanh toán nhắc nợ
// body gửi lên có account_number (của khách)
router.get('/debt', async function(req, res){
    const { user_id } = req.tokenPayload;
    const checkUser = await User.findOne({ user_id: user_id });
    if (checkUser.role == 0) {
      res.status(400).send("Bạn không đủ thẩm quyền.");
    }
    
    try{
        //const _account = await Account.findOne({user_id: user_id});
        const list = await TransactionDebt.find({debtor_account_number: req.body.account_number})
                                       .sort({transaction_debt_id: 1});

        res.status(200).send(list);
    }catch(err){
        res.status(500).send(err.message);
    }
   
});

module.exports = router;