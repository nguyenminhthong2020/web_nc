const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require("jsonwebtoken");
const express = require("express");
const Account = require("../models/account.model");


const router = express.Router();

/* Tạo 3 admin đầu */
router.post("/create", async function (req, res) {
    try{
        const passHash = await bcrypt.hash(req.body.password, 8);
        const _body = {
            username: req.body.username,
            password : passHash,
            fullname : req.body.fullname,
            birthday: req.body.birthday,
            phone: req.body.phone,
            email: req.body.email,
            role : 2,
            created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
        } 
        let newUser = User( _body);
        const ret = await newUser.save();

        // Tự động phát sinh 1 account 
        const _body1 = {
            account_number: 12020 + ret.user_id,
            user_id: ret.user_id,
            balance: 0,
            status: 1,
            created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
        } 
        let newAccount = Account( _body1);
        const ret1 = await newAccount.save();

        res.status(201).send({
            message: "Tạo thành công",
            username: ret.username,
            account_number: ret1.account_number
        });         

     }catch(err){
        res.status(500).send(err.message);
     }
});

/*  Admin tạo mới 1 employee  */
router.post("/admin/create-employee", async function (req, res) {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const {user_id} = req.tokenPayload;
    const checkUser = await User.findOne({user_id: user_id});
    if(checkUser.role < 2){
        res.status(400).send("Bạn không đủ thẩm quyền.");
    }
    
    try{
        const passHash = await bcrypt.hash(req.body.password, 8);
        const _body = {
            username: req.body.username,
            password : passHash,
            fullname : req.body.fullname,
            birthday: req.body.birthday,
            phone: req.body.phone,
            email: req.body.email,
            role : 1,
            created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
        } 
        let newUser = User( _body);
        const ret = await newUser.save();
        
        // Tự động phát sinh 1 account 
        const _body1 = {
            account_number: 12020 + ret.user_id,
            user_id: ret.user_id,
            balance: 0,
            status: 1,
            created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
        } 
        let newAccount = Account( _body1);
        const ret1 = await newAccount.save();

        res.status(201).send({
            message: "Tạo thành công",
            username: ret.username,
            account_number: ret1.account_number
        }); 

     }catch(err){
        res.status(500).send(err.message);
     }
});

/* Admin xem danh sách employee  */
router.get("/admin/list-employee", async function (req, res) {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const {user_id} = req.tokenPayload;
    const checkUser = await User.findOne({user_id: user_id});
    if(checkUser.role < 2){
        res.status(400).send("Bạn không đủ thẩm quyền.");
    }
    
    try{
        const list = await User.find({role : 1});
        res.status(200).send(list);
     }catch(err){
        res.status(500).send(err.message);
     }
});

/* Admin sửa một employee */
router.post("/admin/edit-employee", async function (req, res) {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const {user_id} = req.tokenPayload;
    const checkUser = await User.findOne({user_id: user_id});
    if(checkUser.role < 2){
        res.status(400).send("Bạn không đủ thẩm quyền.");
    }
    
    try{
        const _employee = await User.findOneAndUpdate(
            {user_id : req.body.user_id, role: 1}, 
            {phone: req.body.phone, email: req.body.email});

        res.status(200).send({message: "update thành công", _employee});    

     }catch(err){
        res.status(500).send(err.message);
     }
});

/* Admin xóa một employee */
router.post("/admin/edit-employee", async function (req, res) {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const {user_id} = req.tokenPayload;
    const checkUser = await User.findOne({user_id: user_id});
    if(checkUser.role < 2){
        res.status(400).send("Bạn không đủ thẩm quyền.");
    }
    
    try{
        await User.findOneAndDelete({user_id : req.body.user_id, role: 1});
        res.status(200).send({message: "xóa thành công"});    

     }catch(err){
        res.status(500).send(err.message);
     }
});

/* Employee tạo mới một customer */
router.post("/employee/create-customer", async function (req, res) {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const {user_id} = req.tokenPayload;
    const checkUser = await User.findOne({user_id: user_id});
    if(checkUser.role == 0){
        res.status(400).send("Bạn không đủ thẩm quyền.");
    }
    
    try{
        const passHash = await bcrypt.hash(req.body.password, 8);
        const _body = {
            username: req.body.username,
            password : passHash,
            fullname : req.body.fullname,
            birthday: req.body.birthday,
            phone: req.body.phone,
            email: req.body.email,
            role : 0,
            created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
        } 
        let newUser = User( _body);
        const ret = await newUser.save();
        
        // Tự động phát sinh 1 account 
        const _body1 = {
            account_number: 12020 + ret.user_id,
            user_id: ret.user_id,
            balance: 0,
            status: 1,
            created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
        } 
        let newAccount = Account( _body1);
        const ret1 = await newAccount.save();

        res.status(201).send({
            message: "Tạo thành công",
            username: ret.username,
            account_number: ret1.account_number
        }); 
     }catch(err){
        res.status(500).send(err.message);
     }
});

module.exports = router;