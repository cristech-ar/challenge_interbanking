const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    CUIT: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    accession_date: { type: Date, default: Date.now }
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
