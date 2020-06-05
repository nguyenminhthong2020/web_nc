const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require("jsonwebtoken");
const express = require("express");


const router = express.Router();

//API create user use bank
//Có thể bằng hàm register cho user không ?
//Mà thôi, khi user đăng ký thì họ phải tới chỗ ngân hàng cho nhân viên tạo tài khoản
router.post("/", async function (req, res) {
    try{
        const x = +req.body.role || 0;
        const passHash = await bcrypt.hash(req.body.password, 8);
        const _body = {
            username: req.body.username,
            password : passHash,
            fullname : req.body.fullname,
            birthday: req.body.birthday,
            phone: req.body.phone,
            email: req.body.email,
            role : x,
            created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
        } 
        let newUser = User( _body);
        const ret = await newUser.save();
        res.status(201).send(ret);         
     }catch(err){
        res.status(500).send(err.message);
     }
});

module.exports = router;
