const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PartnerViewLogSchema = new Schema(
  {
    partner_code: {type: String, required: true},
    account_number: String,
    created_at: String
  }
);

//Export model
module.exports = mongoose.model('PartnerViewLog', PartnerViewLogSchema);