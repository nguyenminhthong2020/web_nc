var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "secondwebnc2020@gmail.com",
      pass: "infymt6620",
    },
});



function generatePIN() {
  return Math.floor(1000 + Math.random() * 9000);
}

function generateOTP() {
  var current = new Date();
  var s = current.getSeconds();
  //ms 2 số
  var n = current.getMilliseconds() % 100;
  return parseInt(s + n);
}

function sendOTPMail(email, fullname, otpCode) {
  var mailOptions = {
    from: "secondwebnc2020@gmail.com",
    to: email,
    subject: "Verify OTP email",
    text: "Xin chào" + fullname 
       +"\n\nBạn vừa có một yêu cầu từ ngân hàng GO của chúng tôi. Đây là mã code xác nhận có thời hạn là 10 phút:\n" + otpCode.toString() 
       + "\nNếu bạn không phải là người gửi yêu cầu, hãy bỏ qua email này."
       +"\n\nTrân trọng",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return {status: "ERROR", message: "Không thể gửi message. " + error}
    } else {
      return {status: "OK", message: "Đã gửi đến email."}
    }
  });
}


module.exports = {
    generatePIN,
    generateOTP,
    sendOTPMail
};