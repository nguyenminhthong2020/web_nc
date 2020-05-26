//Snipping tool
const express = require("express")
const cors = require('cors');
const moment = require("moment");
const md5 = require('md5');
const NodeRSA = require('node-rsa');
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

// cách chưng minh   (test API thứ hai)
//  const ctime = moment().valueOf() + 600000;
//  const str = md5("Infymt");
//  const privatekey = "-----BEGIN RSA PRIVATE KEY-----MIICXwIBAAKBgQCyceITLtFoy4KzMgmr6NEnvk1VBH7pRuyyg7IkXc3kBspKs9CIErm2eJtEtduIPQK+3AgiQW+fjL1dDMQr7ENZiGzWhEPoSbU348mjg1fxFDztFB4QiqAd7UUvj1kK2/UT+D0C6Sgc0O69C9lRGahPSAX+7ZArGIodtfuOKPenEwIDAQABAoGBAKU98CvzXte8HPvziiE3Jve2scXYs+0xUF6+tWgXtWFDKHCksqZPMMpYRPALt48hcDltZ9rQ3ZzRp0lTWRWTY4kmnjUm1W4E7uFmJJc7KySZJH9XNbvlOceVIKPIWjZvvQ93wov03G2ajdv/NC2BT57xQ+YTaMe3GQkJGTX7V/KBAkEA8TQmBdaExOBF7mrGKMrrrvYnErtZWN4dLdPK+ipfmeSM/oD25/UHfPHbh8tkHbt9vfz4PF/3NdAWcZiMNzAKPwJBAL1kLC/SM9NFfxCLfQrmP1qTASWs4IVsxeYU4+dUVcUwL0g4WlUgCjrVCFYomWen1wCbqCvlGpON9H7CLR7fpi0CQQDI3cXAXNoqXh6+orqtI/fLt3/okI6ifC5OiK7jUEBXF0b3dwynNJ3sxjksyAty2z2m5zEOjlh/vu/B3+j82IvfAkEAqlR2PQgCnicpkPqymePb5JzDclvZjYX3Medl1L4PaYndbElqTJbFPIYtujdHSGc1wZE8nUWuMjiARKRkKhkgfQJBAIqWxELwATG3541h/7MKI2tnTC0F3g7nTLJWtgIiqYfyw/jFdsVGWZUlJriyS6LxYh+0zMdRtdscw4iWEPJ2vM4=-----END RSA PRIVATE KEY-----";
//  const testbody = {
//     "account_number" : 230500001,
//     "money" : 1000000,
//     "currentTime" : ctime
//   }
//  const sig = md5(ctime + testbody + str);
//  const privatePublic1 = new NodeRSA(privatekey);
// const keysigned1 = privatePublic1.sign(testbody, 'base64', 'base64');
// console.log(ctime+"\n");
// console.log(sig+"\n\n");
// console.log(keysigned1);


//apply to all requests
app.use(limiter);

app.get('/', (req, res) => {              
    res.json('Welcome to TTS Banking RSA!\n #Update to Tuesday, 26/05/2020');
});

// Routes 
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/accounts', require('./routes/account.route'));
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

const mystr =
`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTJstKm8Uzb5fsi2dneTG4fPsR
WTxX4fsL7sHq9w0SilwSSS7AM4TZrK0/HhwzuXGotVPwxln9JRflZHnx8tzt1zwE
prBAuXaTnZwD15JHrF17jS2C0mze2j9olErB7oJa+OJ6hRYIB/kB4NaOTcl1f9n1
C0yM2o2SIGlTWWRd5QIDAQAB
-----END PUBLIC KEY-----`;

const PORT = process.env.PORT ||3000;
app.listen(PORT,()=>{
    console.log(`API is running at http://localhost:${PORT}`)
})