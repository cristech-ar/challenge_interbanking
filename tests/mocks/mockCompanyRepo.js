const fakeDB = [];

module.exports = {
    async create(company) {
        fakeDB.push(company);
        return company;
    },

    async findByLastMonth() {

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        return fakeDB.filter(c => new Date(c.accession_date) >= oneMonthAgo);
    },

    __clear() {
        fakeDB.length = 0;
    }
};
