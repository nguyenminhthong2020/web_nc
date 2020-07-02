const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const ListReceiverSchema = new Schema(
  {
    id: Number,
    user_id: Number,
    receiver_account_number : String,
    remind_name: String
  }
);

UserSchema.plugin(AutoIncrement, { inc_field: 'id' });

//Export model
module.exports = mongoose.model('ListReceiver', UserSchema);