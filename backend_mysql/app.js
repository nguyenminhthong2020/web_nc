//Snipping tool
const express = require("express")
const cors = require('cors');
const moment = require("moment");
const md5 = require('md5');
const rateLimit = require("express-rate-limit"); 
const morgan = require('morgan');
require('express-async-errors');

const verify = require('./middlewares/auth.mdw');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes 
  max: 100 // limit each IP to 100 requests per windowMs
});

// cách chưng minh
// const ctime = moment().valueOf() + 600000;
// const str = "Infymt";
// const testbody = {
//   "id" : 1
// }
// const sig = md5(ctime + testbody + str);
// console.log(ctime);
// console.log(sig);


//apply to all requests
app.use(limiter);


app.get('/', (req, res) => {              
    res.json('Welcome to Nodemon 123.');
});

// Routes 
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/users', require('./routes/user.route'));


app.use((req, res, next) => {              // default route
    res.status(404).send('NOT FOUND');
  })
  
app.use(function (err, req, res, next) {        // default error-handler
    if (typeof err.status === 'undefined' || err.status === 500) {
        console.error(err.stack);
        res.status(500).send('View error log on console.');
      } else {
        res.status(err.status).send(err);
      }
})

const PORT = process.env.PORT ||3000;
app.listen(PORT,()=>{
    console.log(`API is running at http://localhost:${PORT}`)
})