const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

// Đây chỉ là transaction cho thanh toán & chuyển khoản
// không có giao dịch hay gì liên quan đến nợ nần
// Đối với giao dịch nội bộ thì phí là 3000, giao dịch vs đối tác thì phí là 0
const TransactionSchema = new Schema(
  {
    transaction_id: Number,
    sender_account_number: String,
    receiver_account_number: String,
    sender_bank_code: String,
    receive_bank_code: String,     
    money: Number,
    transaction_fee: Number, 
    type_fee: String,    //*Chú ý là String. 1: người gửi trả, 0: người nhận trả. 
    message: String,     // Nội dung cần chuyển, Ví dụ: "gửi trả nợ cho ông A"
    created_at: String
  }
);

TransactionSchema.plugin(AutoIncrement, { inc_field: 'transaction_id' });
//Export model
module.exports = mongoose.model('Transaction', TransactionSchema);
