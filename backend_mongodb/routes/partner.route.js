const express = require("express");
const moment = require("moment");
const md5 = require("md5");
const NodeRSA = require("node-rsa");
const openpgp = require("openpgp");
//const fs = require("fs").promises;  
const config = require('../config/default.json');
const process = require("../config/process.config");
const Account = require("../models/account.model");
const User = require("../models/user.model");
const PartnerViewLog = require('../models/_partnerViewLog.model');
const Transaction = require('../models/TransactionHistory.model');
const router = express.Router();

const confirm = (req, type) => {
    const ts = +req.get("ts"); // const ts = +req.headers['ts'];
    const partnerCode = req.get("partnerCode");
    const sig = req.get("sig");
    let hashSecretKey; // = md5(config.auth.secretPartner);
    const currentTime = moment().valueOf();

    if (currentTime - ts > config.auth.expireTime) {
      return 1;
    }

    if (
      partnerCode != config.auth.partnerRSA &&
      partnerCode != config.auth.partnerPGP &&
      partnerCode != config.auth.partnerForTestRSA
    ) {
      //điền Code của bank - partner
      return 2;
    }

    if (partnerCode == config.auth.partnerRSA) {
      hashSecretKey = md5(config.auth.secretPartnerRSA);
    }
    if (partnerCode == config.auth.partnerPGP) {
      hashSecretKey = md5(config.auth.secretPartnerPGP);
    }
    if (partnerCode == config.auth.partnerForTestRSA) {
      hashSecretKey = md5(config.auth.secretPartnerForTestRSA);
    }
    const comparingSign = md5(ts + JSON.stringify(req.body) + hashSecretKey);
    console.log("\n" + ts + "\n" + partnerCode + "\n" + sig + "\n" + comparingSign);
    if (sig != comparingSign) {
      return 3;
    }
    
    if(type === 1)
    {
          if (!req.body.account_number) {
              return 4;
          }else{
            return 0;
          }
    }else{
          let check = (!req.body.sender_account_number) || (!req.body.receiver_account_number) || (!req.body.type_fee);
          if (check) {
              return 4;
          }else{
              return 0;
          }
    }
};

// Partner truy vấn thông tin tài khoản
router.post("/check", async (req, res) => {
   const partnerCode1 = req.get("partnerCode");
    var con = confirm(req, 1);
    if (con == 1) {
      return res.status(400).send({
        message: "Request quá hạn.", // quá hạn
      });
    }

    if (con == 2) {
      return res.status(400).send({
        message: "Bạn không phải đối tác của chúng tôi.",
      });
    }

    if (con == 3) {
      return res.status(400).send({
        message: "Request này đã bị chỉnh sửa.",
      });
    }

    if (con == 4) {
      return res.status(400).send({
        message: "Thiếu account_number.",
      });
    }
    
    try {
      const userAccount = await Account.findOne({account_number: req.body.account_number});
    
      if (!userAccount) {
        return res.status(404).send({
            message: `Không tìm thấy user có account number ${req.body.account_number}`,
          });
      }
      
      const userInformation = await User.findOne({user_id: userAccount.user_id});
    
        //add PartnerViewLog
      var entityUpdateLog1 = {
          partner_code: partnerCode1,
          account_number: req.body.account_number,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
        };
    
      let newU = PartnerViewLog( entityUpdateLog1);
        const ret = await newU.save();

      return res.status(200).send({fullname: userInformation.fullname});

    } catch (err) {
      console.log("error: ", err.message);
      return res.status(500).send({ message: "Error." });
    }
});


// Partner nộp tiền vào tài khoản
// body gửi qua gồm có :
// sender_account_number, receiver_account_number, money, type_fee, message 
router.post("/recharge", async function (req, res) {
    const partnerCode = req.get("partnerCode");
    const signature = req.get("signature"); 
    const paCode = req.get("partnerCode");

    // Kiểm tra ngân hàng liên kết là RSA/ PGP hay ForTest để lấy keyPulic
    let partner;
    if (partnerCode == config.auth.partnerRSA) {
      partner = process.partnerRSA;
    }
    if (partnerCode == config.auth.partnerPGP) {
      partner = process.partnerPGP;
    }
    if (partnerCode == config.auth.partnerForTestRSA) {
      partner = process.partnerForTestRSA;
    }
    const keyPublic = new NodeRSA(partner.RSA_PUBLICKEY);
    const veri = keyPublic.verify(
      JSON.stringify(req.body),
      signature,
      "base64",
      "base64"
    );
    
    var con = confirm(req, 2);

    if (con == 1) {
      return res.status(400).send({
        message: "Request quá hạn.",
      });
    }

    if (con == 2) {
      return res.status(400).send({
        message: "Bạn không phải đối tác của chúng tôi.",
      });
    }

    if (con == 3) {
      return res.status(400).send({
        message: "Request này đã bị chỉnh sửa.",
      });
    }

    if (con == 4) {
      return res.status(400).send({
        message: "Thiếu sender_account_number hoặc receiver_account_number hoặc type_fee",
      });
    }

    if (veri != true) {
      return res.status(400).send({
        message: "Sai chữ ký.",
      });
    }

    try {
      const userAccount = await Account.findOne({account_number: req.body.receive_account_number});

      if (!userAccount) {
        return res.status(404).send({
            message: `Không tìm thấy user có account number ${req.body.receive_account_number}`,
          });
      }

      if (userAccount.status === 0) {
        return res.status(404).send({
            message: `Tài khoản này hiện không thể nhận tiền.`,
          });
      }

      let money = +req.body.money || 0;
      let newMoney = userAccount.balance + money;
      await Account.findOneAndUpdate(
          {
              account_number: req.body.receive_account_number
          },
          {
              balance: newMoney
          }
      )
      
      //add transactionHistory

      let money1 = +req.body.money || 0;
      
      const entityUpdateLog = {
          sender_account_number: req.body.sender_account_number,
          receiver_account_number: req.body.receive_account_number,
          sender_bank_code: paCode,
          receive_bank_code: config.auth.bankcode,  // "GO"    
          money: money1,
          transaction_fee: 0, 
          type_fee: req.body.type_fee,    // 1: người gửi trả, 0: người nhận trả. Thực ra phí là 0
          message: req.body.message,                // Ví dụ: "gửi trả nợ cho ông A"
          created_at: moment().format("YYYY-MM-DD HH:mm:ss").toString()
      };
      await Transaction.create(entityUpdateLog);

      // response về cho ngân hàng B :
      const responseForClient = {
        receive_account_number: req.body.receive_account_number,
        money: req.body.money,
        currentTime: moment().valueOf(),
      };
      const pCode = req.get("partnerCode");
      if (
        pCode == config.auth.partnerRSA ||
        pCode == config.auth.partnerForTestRSA
      ) {
        // partner RSA
        const keyPrivate = new NodeRSA(process.ourkey.RSA_PRIVATEKEY);
        const keysigned = keyPrivate.sign(responseForClient, "base64", "base64");

        return res.status(203).send({
          status: "RSA success",
          responseSignature: keysigned,
        });
      } else {
        // partner PGP
        const privateKeyArmored = process.ourkey.PGP_PRIVATEKEY;
        const {
          keys: [privateKey],
        } = await openpgp.key.readArmored(privateKeyArmored);
        await privateKey.decrypt(process.ourkey.passpharse);
        // Sign => save into cleartext
        const { data: cleartext } = await openpgp.sign({
          message: openpgp.cleartext.fromText(JSON.stringify(responseForClient)),
          privateKeys: [privateKey],
        });

        return res.status(203).send({
          status: "PGP success",
          responseSignature: cleartext,
        });
      }

    } catch (err) {
      console.log("error: ", err.message);
      return res.status(500).send({ message: "Error." });
    }
});

// async function signPGP(data) {
//   //const privateKeyArmored =  config.privatePGPArmored; // encrypted private key
//   const privateKeyArmored = await fs.readFile("../config/0x09153698-sec.asc");
//   const passphrase = config.passphrase; // what the private key is encrypted with

//   const {
//     keys: [privateKey],
//   } = await openpgp.key.readArmored(privateKeyArmored);
//   await privateKey.decrypt(passphrase);

//   const { data: text } = await openpgp.sign({
//     message: openpgp.cleartext.fromText(data), // CleartextMessage or Message object
//     privateKeys: [privateKey], // for signing
//   });
//   return text;
// }

module.exports = router;
