const express = require("express");
const moment = require("moment");
const md5 = require("md5");
const NodeRSA = require("node-rsa");
const openpgp = require('openpgp');
const config = require("../config/default.json");
const process = require("../config/process.config");
const accountModel = require("../models/account.model");

const router = express.Router();

const confirm = (req) => {
  const ts = +req.get("ts"); // const ts = +req.headers['ts'];
  const partnerCode = req.get("partnerCode");
  const sig = req.get("sign");

  const comparingSign = md5(ts + req.body + config.auth.secretPartner);

  const currentTime = moment().valueOf();
  if (currentTime - ts > config.auth.expireTime) {
    return 1;
  }

  if (partnerCode != "...") {  //điền Code của bank - partner
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
router.post("/recharge", async function (req, res) {
  const signature = req.get("signature"); // sig hay sign ?
  const keyPublic = new NodeRSA(process.partner.RSA_PUBLICKEY);
  const data = req.body.account_num + ', ' + req.body.money + ', ' + req.body.currentTime;
  var veri = keyPublic.verify(data, signature, "base64", "base64");
  // (xem lai source encoding: (base64/utf8))
  // source encoding cua ham veri() phu thuoc vao ham sign()
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
    const accBal = await accountModel.singleById(account[0].user_id); //lay so du tai khoan
    const newMoney = +accBal[0].balance + (+req.body.money); //cong voi tien can nap vo

    const entity = {
      balance: newMoney
    }
    const ret = await accountModel.updateMoney(account[0].user_id, entity); //update lai so du tai khoan
    
     // response về cho ngân hàng B :
     
    //  const currentTime = moment().valueOf();
    //         const data = req.body.account_num + ', ' + req.body.money + ', ' + req.body.currentTime;
    //         console.log(data);
    //         const mySig = await signData(data);
    //         res.status(203).json({
    //             status: "success",
    //             responseSignature: mySig
    //         });




  }catch (err) {
    console.log("error: ", err.message);
    return res.status(500).send({ message: "Error." });
  }

});

// async function signData(data){
//   const privateKeyArmored =  config.privatePGPArmored; // encrypted private key
//   const passphrase = config.passpharse; // what the private key is encrypted with

//   const { keys: [privateKey] } =  await openpgp.key.readArmored(privateKeyArmored);
//   await privateKey.decrypt(passphrase);

//   const {data: text} = await openpgp.sign({
//       message: openpgp.cleartext.fromText(data), // CleartextMessage or Message object
//       privateKeys: [privateKey]                             // for signing
//   });
//   return text;
// };

// async function verifyData(publicKeyArmored, sig){
//   const realSignature = sig.split("\\n").join("\n");
//   const realPubKeyArmored = publicKeyArmored.split("\\n").join("\n");
//   try {
//       const verified = await openpgp.verify({
//           message: await openpgp.cleartext.readArmored(realSignature),  // CleartextMessage or Message object
//           publicKeys: (await openpgp.key.readArmored(realPubKeyArmored)).keys // for verification
//       });
//       const { valid } = verified.signatures[0];
      
//       if (valid) {
//           console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
//           return true;
//       } else {
//           return false;
//       }
//   } catch (error) {
//       console.log(error);
//       return false;
//   }
// }