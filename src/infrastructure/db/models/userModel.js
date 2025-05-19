const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    refreshToken: { type: String }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
