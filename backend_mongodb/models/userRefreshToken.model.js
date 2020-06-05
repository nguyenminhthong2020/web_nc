const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserFreshTokenSchema = new Schema(
  {
    user_id: Number,
    refresh_token: String,
    rdt: { type: Date, default: Date.now},
  }
);

//Export model
module.exports = mongoose.model('UserFreshToken', UserFreshTokenSchema);