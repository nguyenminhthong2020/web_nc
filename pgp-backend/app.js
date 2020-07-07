
/*
   a) Danh sách người dùng:

   3 admin là thong, sy, tuan với pass là 123
   3 employee là nhanvien1, nhanvien2, nhanvien3
   8 user là user1, user2,...user8
   
   b) Quy ước: mỗi account_number có dạng 12020 + user_id

   c) Quy ước: mỗi saving_account_number có dạng 

   MONGODB_URL=mongodb+srv://secondwebnc2020:infymt6620@cluster0-me6ey.gcp.mongodb.net/internet_banking?retryWrites=true&w=majority

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
app.use('/user', verify, require('./routes/user.route'));  

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





