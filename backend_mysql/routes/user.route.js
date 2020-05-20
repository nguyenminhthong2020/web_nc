const express = require('express');
const moment = require('moment');
const md5 = require('md5');
const NodeRSA = require('node-rsa');
const config = require('../config/default.json');
const userModel = require('../models/user.model');

const router = express.Router();

router.post('/', async (req, res) => {
  const result = await userModel.add(req.body);
  const ret = {
    id: result.insertId,
    ...req.body
  }

  delete ret.password_hash;
  res.status(201).json(ret);
})


const confirm = (req) =>{
  const ts = req.get('ts');
  const partnerCode = req.get('partnerCode');
  const sig = req.get('sig');

  const comparingSign = md5(ts + req.body + config.auth.secretPartner);
  
  if (ts <= moment().unix() - 150) {
    return 1;
  }


  if (partnerCode != "...") {     //điền Code của bank - partner
    return 2;
  }

  if(sig != comparingSign){
    return 3;
  }

  if (!req.body.id) {
    return 4;
  }
  else
  {
    return 0;
  }

}

router.get('/customer/', async (req, res) => {

  var con = confirm(req);

  if (con == 1) {
    return res.status(400).send({
      message: 'The request was out of date.' // quá hạn
    });
  }

  if (con == 2) {
    return res.status(400).send({
      message: 'You are not our partner.'
    });
  }

  if(con == 3){
    return res.status(400).send({
      message: 'The file was changed by strangers.'
    });
  }

  if (con == 4) {
    return res.status(400).send({
      message: 'No ID user.'
    });
  }

  try {
    const rows = await userModel.singleById(id);
    if (rows.length == 0) {
      return res.status(403).send({ message: `No user has id ${id}` });
    } else {
      const ret = {
        username : rows[0].username, 
        fullname : rows[0].fullname, 
        cmnd : rows[0].cmnd, 
        birthday : rows[0].birthday, 
        phone : rows[0].phone, 
        address : rows[0].address, 
        email : rows[0].email
      }

      return res.status(200).send(ret);
    }
  } catch (e) {
    return res.status(500).send({ message: 'Error.' });
  }

})

module.exports = router;