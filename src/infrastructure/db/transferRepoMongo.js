const Transfer = require('./models/transferModel');
const { Types } = require('mongoose');

function createTransferRepoMongo() {
  return {
    async create(transfereData) {
      const transfer = new Transfer(transfereData);
      return await transfer.save();
    },

    async findCompaniesByTransfersLastMonth() {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      return Transfer.aggregate([
        {
          $match: { date: { $gte: startOfMonth } }
        },
        {
          $addFields: {
            companyId: { $toObjectId: "$companyId" }
          }
        },
        {
          $group: {
            _id: "$companyId",
            transferCount: { $sum: 1 },
            firstTransfer: { $first: "$$ROOT" }
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "_id",
            foreignField: "_id",
            as: "companyData"
          }
        },
        {
          $unwind: "$companyData"
        },
        {
          $project: {
            _id: "$companyData._id",
            CUIT: "$companyData.CUIT",
            name: "$companyData.name",
            transferCount: 1
          }
        }
      ]);
    },

    async createTransfer({ amount, companyId, debitAccount, creditAccount }) {

      // Validate the input data
      if (!amount || !companyId || !debitAccount || !creditAccount) {
        throw new Error('All fields are required');
      }
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Amount must be a positive number');
      }
      if (typeof companyId !== 'string' || companyId.trim() === '') {
        throw new Error('Company ID must be a non-empty string');
      }
      if (typeof debitAccount !== 'string' || debitAccount.trim() === '') {
        throw new Error('Debit account must be a non-empty string');
      }
      if (typeof creditAccount !== 'string' || creditAccount.trim() === '') {
        throw new Error('Credit account must be a non-empty string');
      }
      // Check if the company exists

      const transfer = new Transfer({
        amount,
        companyId,
        debitAccount,
        creditAccount
      });

      return await transfer.save();
    },


  };
}

module.exports = { createTransferRepoMongo };