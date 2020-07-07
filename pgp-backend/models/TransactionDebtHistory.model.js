const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

// Đây chỉ là TransactionDebt cho thanh toán & chuyển khoản
// không có giao dịch hay gì liên quan đến nợ nần
const TransactionDebtSchema = new Schema(
  {
    transaction_debt_id: Number,
    creditor_account_number: String,   // chủ nợ
    debtor_account_number: String,     // người nợ
    money: Number,
    transaction_debt_fee: Number, 
    created_at: String
  }
);

TransactionDebtSchema.plugin(AutoIncrement, { inc_field: 'transaction_debt_id' });
//Export model
module.exports = mongoose.model('TransactionDebt', TransactionDebtSchema);