const express = require("express");
const moment = require("moment");
const md5 = require("md5");
const NodeRSA = require("node-rsa");
const config = require("../config/default.json");
const process = require("../config/process.config");
const accountModel = require("../models/account.model");

const router = express.Router();

const confirm = (req) => {
  const ts = req.get("ts"); // const ts = req.headers['ts'];
  const partnerCode = req.get("partnerCode");
  const sig = req.get("sign");

  const comparingSign = md5(ts + req.body + config.auth.secretPartner);

  if (ts <= moment().unix() - 150) {
    return 1;
  }

  if (partnerCode != "...") {
    //điền Code của bank - partner
    return 2;
  }

  if (sig != comparingSign) {
    return 3;
  }

  if (!req.body.account_num) {
    return 4;
  } else {
    return 0;
  }
};


// nộp tiền vào tài khoản
router.post("/add-money", async function (req, res) {
  const sign = req.get("sign"); // sig hay sign ?
  const keyPublic = new NodeRSA(process.partner.RSA_PUBLICKEY);
  var veri = keyPublic.verify(req, sign, "base64", "base64");

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
      message: "Missing user account number.",
    });
  }

  if (veri != true) {
    return res.status(400).send({
      message: "Wrong sign.",
    });
  }

  try{
    const account = await accountModel.singleByNumber(req.body.account_num);
    if (account.length <= 0) {
        res.send("Number not found");
        throw createError(401, "Number not found");
      }
    const newMoney = +account[0].balance + +req.body.money; //cong voi tien can nap vo

    
  }catch (err) {
    console.log("error: ", err.message);
    return res.status(500).send({ message: "Error." });
  }

  

  

  

  
});
