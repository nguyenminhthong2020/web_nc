const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const moment = require('moment');
//const jwt = require("jsonwebtoken");
const express = require("express");
const Account = require("../models/account.model");


const router = express.Router();

/* Tạo 3 admin đầu */
// router.post("/create", async function (req, res) {
//     // const ret = await User.findOne({user_id: 1});
//     // return res.status(200).send(ret);
// //     const passHash = await bcrypt.hashSync(req.body.password, 8);
    
// //     const newUser = new User({
// //             username: req.body.username,
// //             password : passHash,
// //             fullname : req.body.fullname,
// //             birthday: req.body.birthday,
// //             phone: req.body.phone,
// //             email: req.body.email,
// //             role : 2,
// //             created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
// //     });
// //     console.log("1");
// //     newUser.save(function (err, _user) {
// //         // if (err) {return res.status(500).send(err.message);}
// //         if(err){console.log("2")};
// //         console.log("3");
// //         // return res.status(201).send(_user);
// //    });
// //    console.log("4");
    
//     // newUser.save((err, ret) => {
//     //     if (err) {
//     //         return res.status(500).send(err.message);
//     //     }
//     //     else {
//     //         // const newAccount = new Account({
//     //         //     account_number: 12020 + ret.user_id,
//     //         //     user_id: ret.user_id,
//     //         //     balance: 0,
//     //         //     status: 1,
//     //         //     created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
//     //         // });
            
//     //         // newAccount.save((err, ret1) => {
//     //         //     if(err){
//     //         //         return res.status(500).send(err.message);
//     //         //     }else{
//     //         //         return res.status(201).send({
//     //         //                     message: "Tạo thành công",
//     //         //                     username: ret.username,
//     //         //                     account_number: ret1.account_number
//     //         //                 }); 
//     //         //     }
//     //         // })
//     //          return response.status(200).json({ message: 'Thêm nhiệm vụ mới thành công' });
//     //     }
//     // });

//     try{
//         const passHash = await bcrypt.hashSync(req.body.password, 8);
//         const _body = {
//             username: req.body.username,
//             password : passHash,
//             fullname : req.body.fullname,
//             birthday: req.body.birthday,
//             phone: req.body.phone,
//             email: req.body.email,
//             role : 2,
//             created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
//         } 
//         let newUser = User( _body);
//         const ret = await newUser.save();

//         // Tự động phát sinh 1 account 
//         const _body1 = {
//             account_number: "12020" + ret.user_id,
//             user_id: ret.user_id,
//             balance: 0,
//             status: 1,
//             created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
//         } 
//         let newAccount = Account( _body1);
//         const ret1 = await newAccount.save();

//         return res.status(201).send({
//             message: "Tạo thành công",
//             username: ret.username,
//             account_number: ret1.account_number
//         });         

//      }catch(err){
//         return res.status(500).send(err.message);
//      }
// });

/*  Admin tạo mới 1 employee  */
router.post("/admin/create-employee", async function (req, res) {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const {user_id} = req.tokenPayload;
    const checkUser = await User.findOne({user_id: user_id});
    if(checkUser.role < 2){
        return res.status(400).send({message:"Bạn không đủ thẩm quyền."});
    }
    
    try{
        const passHash = await bcrypt.hashSync(req.body.password, 8);
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
            account_number: "12020" + ret.user_id,
            user_id: ret.user_id,
            balance: 0,
            status: 1,
            created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
        } 
        let newAccount = Account( _body1);
        const ret1 = await newAccount.save();

        return res.status(201).send({
            message: "Tạo thành công",
            username: ret.username,
            account_number: ret1.account_number
        }); 

     }catch(err){
        return res.status(500).send(err.message);
     }
});

/* Admin xem danh sách employee  */
router.get("/admin/list-employee", async function (req, res) {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const {user_id} = req.tokenPayload;
    const checkUser = await User.findOne({user_id: user_id});
    if(checkUser.role < 2){
        return res.status(400).send({message:"Bạn không đủ thẩm quyền."});
    }
    
    try{
        const list = await User.find({role : 1});
        return res.status(200).send(list);
     }catch(err){
        return res.status(500).send(err.message);
     }
});

/* Admin sửa một employee */
router.post("/admin/edit-employee", async function (req, res) {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const {user_id} = req.tokenPayload;
    const checkUser = await User.findOne({user_id: user_id});
    if(checkUser.role < 2){
        return res.status(400).send({message:"Bạn không đủ thẩm quyền."});
    }
    
    try{
        const _employee = await User.findOneAndUpdate(
            {user_id : req.body.user_id, role: 1}, 
            {phone: req.body.phone, email: req.body.email});

            return res.status(200).send({message: "update thành công", _employee});    

     }catch(err){
        return res.status(500).send(err.message);
     }
});

/* Admin xóa một employee */
router.post("/admin/delete-employee", async function (req, res) {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const {user_id} = req.tokenPayload;
    const checkUser = await User.findOne({user_id: user_id});
    if(checkUser.role < 2){
        return res.status(400).send({message:"Bạn không đủ thẩm quyền."});
    }
    
    try{
        await User.findOneAndDelete({user_id : req.body.user_id, role: 1});
        return res.status(200).send({message: "xóa thành công"});    

     }catch(err){
        return res.status(500).send(err.message);
     }
});

/* Employee tạo mới một customer */
router.post("/employee/create-customer", async function (req, res) {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify
    const {user_id} = req.tokenPayload;
    const checkUser = await User.findOne({user_id: user_id});
    if(checkUser.role == 0){
        return res.status(400).send({message:"Bạn không đủ thẩm quyền."});
    }
    
    try{
        const passHash = await bcrypt.hashSync(req.body.password, 8);
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
            account_number: "12020" + ret.user_id,
            user_id: ret.user_id,
            balance: 0,
            status: 1,
            created_at : moment().format('YYYY-MM-DD HH:mm:ss').toString()
        } 
        let newAccount = Account( _body1);
        const ret1 = await newAccount.save();

        return res.status(201).send({
            message: "Tạo thành công",
            username: ret.username,
            account_number: ret1.account_number
        }); 
     }catch(err){
        return res.status(500).send(err.message);
     }
});

// Lấy Info - Profile cho user
router.post("/profile", async function(req, res){
    const {user_id} = req.tokenPayload;
    const _user = await User.findOne({user_id: user_id});

    return res.status(200).send(_user);
})

// Đổi mật khẩu 
// Trong body gửi lên có password và newPassword
 // req.body = {
//   "password": "admin",
//   "newPassword": "admin1"
// }
router.post('/change-password', async (req, res) => {
    // user_id phía trên này là lấy ra từ Payload qua middleware Verify

    /*str = user_id + "";
    if(str == "undefined")
    {
        console.log("lỗi rồi");
    }*/
    const {user_id} = req.tokenPayload;
    const str = user_id + "";

    const { password, newPassword } = req.body;

	if (str == "undefined" ) {
        return res.status(400).json({ message: "Không tìm thấy khách hàng này." });
        
	} else {
        
        const _user = await User.findOne({user_id: user_id});
		let isTrueOldPass = await bcrypt.compareSync(password, _user.password);
		if (isTrueOldPass) {
			const newPasswordHash = bcrypt.hashSync(newPassword, 8);
			const result = await User.findOneAndUpdate(
				{ user_id: user_id },
				{
					password : newPasswordHash
				}
			);
			if (result) {
				const data = await User.findOne({
					user_id: user_id
				});
				if (data) {
					return res.status(200).json({ message: "Cập nhật thành công." });
				}
			}
		} else {
			return res.status(400).json({ message: "Password cũ sai" });
		}
    }
    
  })
module.exports = router;
