const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

// Đây chỉ là transaction cho thanh toán & chuyển khoản
// không có giao dịch hay gì liên quan đến nợ nần
const notify2Schema = new Schema(
	{
        notify2_id: Number,
        sender_account_number: String,
        sender_fullname : String,
        receiver_account_number: String,
        receiver_fullname: String,
        message: String,    // Nội dung cần chuyển, Ví dụ: "gửi trả nợ cho ông A"
        notify_type: String, //"0": gửi nn, "1": hủy nhắc nợ ngườikhac,"2" : hủy nn bảnthân, "3" : thanh toán nn
        created_at: String,
        is_view : String     //"0" : chưa xem, "1"  đã xem
    }
);

notify2Schema.plugin(AutoIncrement, { inc_field: 'notify2_id' });

module.exports = mongoose.model("Notify2", notify2Schema);