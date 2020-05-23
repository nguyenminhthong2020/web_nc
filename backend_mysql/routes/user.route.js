const express = require("express");
const moment = require("moment");
const md5 = require("md5");
const NodeRSA = require("node-rsa");
const config = require("../config/default.json");
const process = require("../config/process.config");
const userModel = require("../models/user.model");

const router = express.Router();

router.post("/", async (req, res) => {
  // const v = new Validator(req.body, {
  //   email: "required|email",
  //   password: "required",
  // });

  // v.check().then((matched) => {
  //   if (!matched) {
  //     res.status(400).send(v.errors);
  //   }
  // });

  // let isValidEmail = validator.validate(req.body.email);
  // if (!isValidEmail) res.status(400).send("Invalid Email.");

  try {
    const result = await userModel.add(req.body);
    const ret = {
      id: result.insertId,
      ...req.body,
    };

    delete ret.password_hash;
    res.status(201).json(ret);
  } catch (err) {
    console.log("error: ", err.message);
    return res.status(500).send({ message: "Error." });
  }
});

const confirm = (req) => {
  const ts = +req.get("ts"); // const ts = +req.headers['ts'];
  const partnerCode = req.get("partnerCode");
  const sig = req.get("sign");
  const hashSecretKey = md5(config.auth.secretPartner);
  const comparingSign = md5(ts + req.body + hashSecretKey);
  const currentTime = moment().valueOf();

  if (currentTime - ts > config.auth.expireTime) {
    return 1;
  }

  if ((partnerCode != "TEST") && (partnerCode != "GO")) {
    //điền Code của bank - partner
    return 2;
  }

  if (sig != comparingSign) {
    return 3;
  }

  if (!req.body.id) {
    return 4;
  } else {
    return 0;
  }
};

router.get("/", (req, res) => {
    next();  // chưa có
});

router.get("/customer/", async (req, res) => {
  var con = confirm(req);
  if (con == 1) {
    return res.status(400).send({
      message: "The request was out of date.", // quá hạn
    });
  }

  if (con == 2) {
    return res.status(400).send({
      message: "You are not one of our partners.",
    });
  }

  if (con == 3) {
    return res.status(400).send({
      message: "The file was changed by strangers.",
    });
  }

  if (con == 4) {
    return res.status(400).send({
      message: "Missing user ID.",
    });
  }
  
  try {
    console.log("req body", req.body.id);
    const rows = await userModel.singleById(req.body.id);
    console.log("12345");
    if (rows.length == 0) {
      return res.status(403).send({ message: `No user has id ${req.body.id}` });
    } else {
      const ret = {
        username: rows[0].username,
        fullname: rows[0].fullname,
        cmnd: rows[0].cmnd,
        birthday: rows[0].birthday,
        phone: rows[0].phone,
        address: rows[0].address,
        email: rows[0].email,
      };

      return res.status(200).send(ret);
    }
  } catch (err) {
    console.log("error: ", err.message);
    return res.status(500).send({ message: "Error." });
  }
});


router.get("/transaction/", async (req, res) => {
  const signature = req.get("signature"); // sig hay sign ?
  const keyPublic = new NodeRSA(process.partner.RSA_PUBLICKEY);
  var veri = keyPublic.verify(req, signature, "base64", "base64");

  var con = confirm(req);

  if (con == 1) {
    return res.status(400).send({
      message: "The request was out of date.",
    });
  }

  if (con == 2) {
    return res.status(400).send({
      message: "You are not our partner.",
    });
  }

  if (con == 3) {
    return res.status(400).send({
      message: "The file was changed by strangers.",
    });
  }

  if (con == 4) {
    return res.status(400).send({
      message: "Missing user ID.",
    });
  }

  if (veri != true) {
    return res.status(400).send({
      message: "Wrong sign.",
    });
  }

  try {
    const rows = await userModel.singleById(id);
    if (rows.length == 0) {
      return res.status(403).send({ message: `No user has id ${id}` });
    } else {
      const ret = {
        username: rows[0].username,
        fullname: rows[0].fullname,
        cmnd: rows[0].cmnd,
        birthday: rows[0].birthday,
        phone: rows[0].phone,
        address: rows[0].address,
        email: rows[0].email,
      };

      return res.status(200).send(ret);
    }
  } catch (err) {
    console.log("error: ", err.message);
    return res.status(500).send({ message: "Error." });
  }
});

module.exports = router;
