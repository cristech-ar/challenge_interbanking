function createCompanyService({ companyRepo }) {
    return {
        async addCompany(data) {
            const { createCompany } = require('../domain/company');
            const company = createCompany(data);
            return await companyRepo.create(company);
        },

        async companiesAddedLastMonth() {
            return await companyRepo.findByLastMonth();
        }
    };
}

module.exports = { createCompanyService };
