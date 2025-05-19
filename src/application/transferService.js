function createTransferService({ transferRepo }) {
    return {

        async companiesByTransfersLastMonth() {
            return await transferRepo.findCompaniesByTransfersLastMonth();
        }
    };
}

module.exports = { createTransferService };