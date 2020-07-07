const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

// Đây chỉ là transaction cho thanh toán & chuyển khoản
// không có giao dịch hay gì liên quan đến nợ nần
const otpSchema = new Schema(
	{
        otp_id: Number,
        user_id: Number,
		email: { type: String },
		code: { type: Number },
        time: Number,

        sender_account_number: String,
        receiver_account_number: String,
        sender_bank_code: String,
        receive_bank_code: String,     
        money: Number,
        transaction_fee: Number, 
        type_fee: String,    //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. Thực ra phí là 0
        message: String     // Nội dung cần chuyển, Ví dụ: "gửi trả nợ cho ông A"

    }
);

otpSchema.plugin(AutoIncrement, { inc_field: 'otp_id' });

module.exports = mongoose.model("Otp", otpSchema);


