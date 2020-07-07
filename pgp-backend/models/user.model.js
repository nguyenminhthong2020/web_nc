const bcrypt = require('bcryptjs');
const config = require('../config/default.json');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    user_id: Number,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullname: {type: String, required: true},
    birthday: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: Number, required: true},  // 0: customer, 1: employee, 2: admin
    created_at: String
  }
);

UserSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

// // Encrypt password using bcrypt
// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     this.password = await bcrypt.hash(this.password, 8);
// });

// Sign JWT and return
// UserSchema.methods.getSignedJwtToken = function () {
//     return jwt.sign({
//         id: this.user_id,
//         username: this.username,
//         email: this.email
//     }, process.env.JWT_SECRET, {
//         expiresIn: config.auth.expiresIn
//     });
// };

// UserSchema.methods.getRefreshToken = function () {
//     return jwt.sign({
//         id: this.user_id,
//         username: this.username,
//         email: this.email
//     }, process.env.JWT_SECRET, {
//         expiresIn: '2592000'
//     });
// };

// UserSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

//Export model
module.exports = mongoose.model('User', UserSchema);