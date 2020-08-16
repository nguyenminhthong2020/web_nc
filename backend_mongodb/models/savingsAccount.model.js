const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

// Quy ước: mỗi tài khoản có dạng 22020 + saving_id + user_id 
const SavingsAccountSchema = new Schema(
  {
    saving_account_number: String,
    user_id: Number,
    balance: Number,
    list: [{receiver_account_number: String, remind_name: String}],
    status: Number,       // 1: đang hoạt động, 0 : bị chặn hoặc hủy
    created_at: String,
    updated_at: String
  }
);

// SavingsAccountSchema.plugin(AutoIncrement, { inc_field: 'saving_id' });
//Export model
module.exports = mongoose.model('SavingsAccount', SavingsAccountSchema);