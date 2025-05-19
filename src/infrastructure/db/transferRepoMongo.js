const Transfer = require('./models/transferModel');

function createTransferRepoMongo() {
  return {
    async create(transfereData) {
      const transferencia = new Transfer(transfereData);
      return await transferencia.save();
    },

    async findCompaniesByTransfersLastMonth() {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      return Transfer.aggregate([
        {
          $match: { date: { $gte: oneMonthAgo } }
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

    async findByCompanyId(companyId) {
      return await Transfer.find({ companyId });
    }
  };
}

module.exports = { createTransferRepoMongo };