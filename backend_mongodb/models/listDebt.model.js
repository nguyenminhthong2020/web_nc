const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

// Đây chỉ là ListDebt cho thanh toán & chuyển khoản
// không có giao dịch hay gì liên quan đến nợ nần
const ListDebtSchema = new Schema(
  {
    debt_id: Number,
    user_id: Number,                   // id của chủ nợ
    creditor_account_number: String,   // chủ nợ
    debtor_account_number: String,     // người nợ  
    debtor_username: String,     // username người nợ
    debtor_fullname : String,       // tên người nợ  
    money: Number,
    message: String,     // Nội dung cần chuyển, Ví dụ: "Trả tôi 50000 đi ông ơi, tôi đang cần."
    created_at: String,
    isTrue : Number,       // 1: đúng (có nợ thật), 0: sai (ví dụ : gửi nhắc nợ nhầm người chẳng hạn)
    isActive: Number      // 1: nhắc nợ này còn hiệu lực, 0 : nhắc nợ này hết hiệu lực
  }
);

ListDebtSchema.plugin(AutoIncrement, { inc_field: 'debt_id' });
//Export model
module.exports = mongoose.model('ListDebt', ListDebtSchema);