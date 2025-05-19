const Company = require('./models/companyModel');

function createCompanyRepoMongo() {
  return {
    async create(companyData) {
      try {
        const existingCompany = await Company.find({ name: companyData.name });
        if (existingCompany) {
          throw new Error('Company already exists');
        }
        const existingCUIT = await Company.find({ CUIT: companyData.CUIT });
        if (existingCUIT) {
          throw new Error('CUIT already exists');
        }
        const company = new Company(companyData);
        return await company.save();
      }
      catch (error) {
        throw new Error(`Error creating company: ${error.message}`);
      }
    },

    async findByLastMonth() {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return await Company.find({ accession_date: { $gte: oneMonthAgo } });
    },

    async findById(id) {
      return await Company.findById(id);
    },

    async findAll() {
      return await Company.find({});
    }
  };
}

module.exports = { createCompanyRepoMongo };