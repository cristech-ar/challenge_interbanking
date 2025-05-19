const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    companyId: { type: String, required: true },
    debitAccount: { type: String, required: true },
    creditAccount: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Transfer = mongoose.model('Transfer', transferSchema);
module.exports = Transfer;