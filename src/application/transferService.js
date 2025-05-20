function createTransferService({ transferRepo, companyService }) {
    return {

        async companiesByTransfersLastMonth() {
            return await transferRepo.findCompaniesByTransfersLastMonth();
        },
        async createTransfer(transferData) {
            const { companyId } = transferData;

            const exists = await companyService.existsById(companyId);
            if (!exists) {
                throw new Error('Invalid companyId: company does not exist');
            }
            const { createTransfer } = require('../domain/transfer');
            const transfer = createTransfer(transferData)
            return await transferRepo.createTransfer(transfer);
        }

    };
}

module.exports = { createTransferService };