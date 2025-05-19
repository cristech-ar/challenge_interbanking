function createCompanyService({ companyRepo, transferRepo }) {
    return {
        async addCompany(data) {
            const { createCompany } = require('../domain/company');
            const company = createCompany(data);
            return await companyRepo.create(company);
        },

        async empresasAdheridasUltimoMes() {
            return await companyRepo.findByLastMonth();
        },

        async empresasConTransferenciasUltimoMes() {
            return await transferRepo.findCompanyByTransfersLastMonth();
        }
    };
}

module.exports = { createCompanyService };
