const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

// Quy ước: mỗi tài khoản có dạng 15620 + saving_id + user_id 
const SavingsAccountSchema = new Schema(
  {
    saving_id: Number,
    saving_account_number: String,   // 15620 + saving_id + user_id
    user_id: Number,
    balance: Number,
    created_at: String,
    updated_at: String
  }
);

SavingsAccountSchema.plugin(AutoIncrement, { inc_field: 'saving_id' });
//Export model
module.exports = mongoose.model('SavingsAccount', SavingsAccountSchema);