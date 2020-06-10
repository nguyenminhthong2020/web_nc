

/*
   Đã tạo ra sẵn 3 username(admin) là thong, sy, tuan trong CSDL.
   password đều là 123

   MONGODB_URL=mongodb+srv://secondwebnc2020:infymt6620@cluster0-me6ey.gcp.mongodb.net/internet_banking?retryWrites=true&w=majority

*/


const express = require("express")
const cors = require('cors');
const moment = require("moment");
const md5 = require('md5');
const NodeRSA = require('node-rsa');
const rateLimit = require("express-rate-limit"); 
const morgan = require('morgan');
require('express-async-errors');
const dotenv = require('dotenv');
dotenv.config();
require('./utils/db');

const PORT = process.env.PORT || 5000;
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

// Index - Home
app.get('/', (req, res) => {              
    res.json('Welcome to our Internet Banking.');
});

 /*  Routes */
 app.use('/auth', require('./routes/auth.route'));
// Dành cho Admin hoặc Employee
app.use('/account',  verify, require('./routes/account.route'));
app.use('/user', require('./routes/user.route'));
// Dành cho Customer ??? (chưa biết à nha)
app.use('/customer', verify, require('./routes/userCustomer.route'));
// APIs cho Partners
app.use('/partner', require('./routes/_partner/partner.route'));


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

app.listen(PORT,()=>{
    console.log(`API is running at http://localhost:${PORT}`)
})





