function createCompanyService({ companyRepo }) {
    return {
        async addCompany(data) {
            const { createCompany } = require('../domain/company');
            const company = createCompany(data);
            return await companyRepo.create(company);
        },

        async companiesAddedLastMonth() {
            return await companyRepo.findByLastMonth();
        },

        async existsById(id) {
            const company = await companyRepo.findById(id);
            return !!company;
        }


    };
}

module.exports = { createCompanyService };
