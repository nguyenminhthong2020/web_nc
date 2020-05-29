const express = require("express");
const moment = require("moment");
const md5 = require("md5");
const NodeRSA = require("node-rsa");
const openpgp = require("openpgp");
const fs = require("fs").promises;
const config = require("../config/default.json");
const process = require("../config/process.config");
const accountModel = require("../models/account.model");
const userModel = require("../models/user.model");
const recPartnerLog = require('../models/rec_partner_log.model');
const partnerCallLog = require('../models/partner_call_log.model');
const transactionModel = require("../models/transaction.model");
const router = express.Router();
const partnerPublicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTJstKm8Uzb5fsi2dneTG4fPsR
WTxX4fsL7sHq9w0SilwSSS7AM4TZrK0/HhwzuXGotVPwxln9JRflZHnx8tzt1zwE
prBAuXaTnZwD15JHrF17jS2C0mze2j9olErB7oJa+OJ6hRYIB/kB4NaOTcl1f9n1
C0yM2o2SIGlTWWRd5QIDAQAB
-----END PUBLIC KEY-----`;

const myPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQC9qm1koCe/O52tzs7/NfYLsScw/YuU254M9SYxu7mR5zBxNsxj
YoGBpGtNQdn3qBaPyiBiczLPOYU8BS2R10FDzZp2KRXOzY7vuhKZXl4WBcc94LOO
yN+nYevI03JBjHOPV0qlSIsS2nDbhfmT58/bF8920IYJI5/Vxi6+KXAsGwIDAQAB
AoGAZFd16HaSkKmJkhqHiJ2TvjvK8DAzWF2YEGLiAg2+72HQTxUerLXArkW+PvFH
z64twYS9/VfU2a0kv8w9f5rR+5PlcuqNYCPzn/JUUAQrMvcFVrYaXtv8FfLWpyFe
Tncgopv5WyTy7isMyomFkBg7TMHjdyhw84h9IkSMCc3TbQECQQDhJ76/NYhJT7GJ
n6nDGh+ZpevHoAkQsBoTpqulvjnFGmovz/mhBHNxZtfoDEWd18clNKBWtuYDiNEg
w1qDqw4ZAkEA16YOIAoEO5DYjHH5OyNsL/ATKlDqj3ddO4LxhvlCVXjaC4LE8qyj
rZhTjFLzGr+wvAZGQyuqyyU7r1r7Bk6qUwJBAIqXAF6KAP2/RDTGRqSFK/ZTnzId
W/cdrq9x5C39TWn5vGr5xVpLdxPSjguTojZqX3aTUi6OHj8GtFNKbCin3eECQDma
b7d7NXo7zLxnTW3QnnuHo3bwOlesSMk2xxGIz4FJUOU2Pymbl/Us9VRMbAe/IJR5
EJesuGifP3wtz1P1+2UCQCca7q32yp272Hl3FoZ/SYyYGVu97FAeSbwhrnPPJG87
70X2jyKNMEZYbjIsrulyv57DOS0lt8qLqdy62FtaMuE=
-----END RSA PRIVATE KEY-----`;

const confirm = (req) => {
  const ts = +req.get("ts"); // const ts = +req.headers['ts'];
  const partnerCode = req.get("partnerCode");
  const sig = req.get("sig");
  const hashSecretKey = md5(config.auth.secretPartner);
  const comparingSign = md5(ts + JSON.stringify(req.body) + hashSecretKey);

  const currentTime = moment().valueOf();
  if (currentTime - ts > config.auth.expireTime) {
    return 1;
  }

  if (partnerCode != "25Bank" && partnerCode != "GO") {
    //điền Code của bank - partner
    return 2;
  }

  if (sig != comparingSign) {
    return 3;
  }

  if (!req.body.account_number) {
    return 4;
  } else {
    return 0;
  }
};

//Thêm mới 1 account - từ một user_id bên bảng users
// Cái này chỉ dành cho trong nội bộ
// Chỉ có nhân viên ngân hàng mới có thể thêm mới 1 account
// Trong request.body gửi lên là user_id và balance
router.post("/add", async function (req, res) {
  try {
    const rows = await userModel.singleById(req.body.user_id);

    if (rows.length == 0) {
      return res
        .status(403)
        .send({ message: `No user has id ${req.body.user_id}` });
    } else {
      const newAccount = {
        account_number: "23050000" + req.body.user_id,
        user_id: req.body.user_id,
        balance: req.body.balance,
        status: 1,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
      };

      try {
        const ret = await accountModel.add(newAccount);
        return res.status(200).send(ret);
      } catch (err) {
        console.log("error: ", err.message);
        return res.status(500).send({ message: "Error." });
      }
    }
  } catch (err) {
    console.log("error: ", err.message);
    return res.status(500).send({ message: "Error." });
  }
});

// truy vấn thông tin tài khoản
router.get("/partner", async (req, res) => {
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
      message: "Missing account_number.",
    });
  }
  
  try {
    const rows_id = await accountModel.singleByNumber(req.body.account_number);
    const idFind = rows_id[0].user_id;
    const rows = await userModel.singleById(idFind);
    // console.log("12345");
    if (rows.length == 0) {
      return res.status(403).send({ message: `No user has account number ${req.body.account_number}` });
    } else {
      const ret = {
        fullname: rows[0].fullname
      };
      //update partner_call_log
        const entityUpdateLog1 = {
          bank_code: req.get("partnerCode"),
          account_number : req.body.account_number,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
    
        const updatePartnerLog1 = await partnerCallLog.add(entityUpdateLog1);

      return res.status(200).send(ret);
    }
  } catch (err) {
    console.log("error: ", err.message);
    return res.status(500).send({ message: "Error." });
  }
});

// nộp tiền vào tài khoản
router.post("/partner/recharge", async function (req, res) {
  const signature = req.get("signature"); // sig hay sign ?
  const keyPublic = new NodeRSA(partnerPublicKey);
  
  // const data = req.body.account_num + ', ' + req.body.money + ', ' + req.body.currentTime;
  var veri = keyPublic.verify(req.body, signature, "base64", "base64");
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

  try {
    const account = await accountModel.singleByNumber(req.body.account_number);
    if (account.length <= 0) {
      res.send("Number not found");
      throw createError(401, "Number not found");
    }

    const moneySend = +req.body.money || 0;
    // const accBal = await accountModel.singleById(account[0].user_id); //lay so du tai khoan
    const newMoney = +account[0].balance + moneySend; //cong voi tien can nap vo

    const entity = {
      balance: newMoney,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    const ret = await accountModel.updateMoney(account[0].user_id, entity); //update lai so du tai khoan
    
    
    // response về cho ngân hàng B :
    const responseForClient = {
      account_number: req.body.account_number,
      newMoney: newMoney,
      currentTime: moment().valueOf(),
    };
    const pCode = req.get("partnerCode");
    if (pCode == "25Bank") { // partCode của nhóm rsa
        const keyPrivate = new NodeRSA(myPrivateKey);
        const keysigned = keyPrivate.sign(responseForClient, "base64", "base64");

        res.status(203).json({
          status: "success",
          responseSignature: keysigned,
        });
    }else{  //partCode của nhóm GPG

        const mySig = await signPGP(responseForClient);
        res.status(203).json({
          status: "success",
          responseSignature: mySig,
        });
    }

     //update Recharge_Partner_Code
    const entityUpdateLog = {
      bank_code: req.get("partnerCode"),
      receive_account_number : req.body.account_number,
      money : moneySend,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    
    const updatePartnerLog = await recPartnerLog.add(entityUpdateLog);
    

    // const currentTime = moment().valueOf();
    // const data = req.body.account_num + ", " + req.body.money + ", " + req.body.currentTime;
    // // console.log(data);
    // const mySig = await signData(data);
    // res.status(203).json({
    //   status: "success",
    //   responseSignature: mySig,
    // });
  } catch (err) {
    console.log("error: ", err.message);
    return res.status(500).send({ message: "Error." });
  }
});

async function signPGP(data) {
  //const privateKeyArmored =  config.privatePGPArmored; // encrypted private key
    const privateKeyArmored = await fs.readFile("../config/0x09153698-sec.asc");
    const passphrase = config.passphrase; // what the private key is encrypted with

    const {
      keys: [privateKey],
    } = await openpgp.key.readArmored(privateKeyArmored);
    await privateKey.decrypt(passphrase);

    const { data: text } = await openpgp.sign({
      message: openpgp.cleartext.fromText(data), // CleartextMessage or Message object
      privateKeys: [privateKey], // for signing
    });
    return text;
}

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

module.exports = router;
