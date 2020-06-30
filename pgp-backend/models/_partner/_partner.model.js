const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PartnerSchema = new Schema(
  {
    partner_code: {type: String, required: true},
    partner_name: {type: String, required: true},
    created_at: String,
    updated_at: String
  }
);

//Export model
module.exports = mongoose.model('Partner', PartnerSchema);