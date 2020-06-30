const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Quy ước: mỗi account_number có dạng 12020 + user_id
// Mỗi account_number đều có một list các receiver_account_number (danh sách người nhận)
// mỗi receiver_account_number đều có số tài khoản và tên gợi nhớ
const AccountSchema = new Schema(
  {
    account_number: String,
    user_id: Number,
    balance: Number,
    list: [{receiver_account_number: String, remind_name: String}],
    status: Number,       // 1: đang hoạt động, 0 : bị chặn hoặc hủy
    created_at: String,
    updated_at: String
  }
);

//Export model
module.exports = mongoose.model('Account', AccountSchema);