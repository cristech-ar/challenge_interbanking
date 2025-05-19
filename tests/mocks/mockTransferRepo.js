let mockTransfers = [];

module.exports = {
  async findCompaniesByTransfersLastMonth() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);


    const companies = {};

    mockTransfers
      .filter(t => new Date(t.date) >= oneMonthAgo)
      .forEach(t => {
        const key = t.companyId._id.toString();
        if (!companies[key]) {
          companies[key] = {
            _id: t.companyId._id,
            CUIT: t.companyId.CUIT,
            name: t.companyId.name,
            transferCount: 0
          };
        }
        companies[key].transferCount++;
      });

    return Object.values(companies);
  },

  async __addTransfer(transfer) {
    mockTransfers.push(transfer);
  },

  __clear() {
    mockTransfers = [];
  }
};
