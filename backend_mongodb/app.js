
/*
   a) Danh sách người dùng:

   1 admin là admin với pass là 123
   2 employee là employee1, employee2 với pass là 123
   8 user là : (pass là 123)
      newios12
      s.pdboyth16
      anhhuy742020
      huyenbabe2012
      phantuan060598
      webnc2020

      songoku.minhthong
      juernevte
   
   b) Quy ước: mỗi account_number có dạng 12020 + user_id

   c) Quy ước: mỗi saving_account_number có dạng 

*/

const express = require("express")
const cors = require('cors');
// const moment = require("moment");
// const md5 = require('md5');
// const NodeRSA = require('node-rsa');
const rateLimit = require("express-rate-limit"); 
const morgan = require('morgan');
require('express-async-errors');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./utils/db');

const port = process.env.PORT || 5000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 100 // limit each IP to 100 requests per windowMs
  });

const verify = require('./middlewares/auth.mdw');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter);

//console.log("\nThis is URI: \n"+process.env.MONGODB_URI+"\n");

(async () => {
  try {
    const dbInfo = await db.connectDB(process.env.MONGODB_URI);
    if (dbInfo) {
      console.log(`\nConnected to MongoDB successfully ${dbInfo.connection.host}`)
    }
  } catch (error) {
    console.log(`\nConnected to DB failed ${error}`)
  }
})();

// Index - Home
app.get('/', (req, res) => {              
    res.json('Welcome to our Internet Banking.');
});

 /*  Routes */
  app.use('/auth', require('./routes/auth.route'));
// // // Dành cho Admin hoặc Employee
app.use('/account',  verify, require('./routes/account.route'));
app.use('/account-saving', verify, require('./routes/accountSaving.route')); // tài khoản tiết kiệm
app.use('/user', verify, require('./routes/user.route'));  
app.use('/notify', verify, require('./routes/notify.route')); 
app.use('/notify2', verify, require('./routes/notify.route')); 

app.use('/list-receiver', verify, require('./routes/listReceiver.route'));
app.use('/list-receiver1', verify, require('./routes/listReceiver1.route'));

 app.use('/transfer-debt', verify, require('./routes/transactionDebt.route'));

  app.use('/transfer', verify, require('./routes/transactionTransfer.route'));
 app.use('/transaction', verify, require('./routes/viewTransaction.route'));
  app.use('/debt', verify, require('./routes/debt.route'));

// // // APIs cho Partners
app.use('/partner', require('./routes/partner.route'));



app.use((req, res, next) => {              // default route
    res.status(404).send('ROUTE NOT FOUND');
  })
  
app.use(function (err, req, res, next) {        // default error-handler
    if (typeof err.status === 'undefined' || err.status === 500) {
        console.error(err.stack);
        res.status(500).send('View error log on console.');
      } else {
        res.status(err.status).send(err);
      }
})

app.listen(port,()=>{
    console.log(`API is running at http://localhost:${port}`)
})





