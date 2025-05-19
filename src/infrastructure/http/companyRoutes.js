const express = require('express');
const { authMiddleware } = require('./authMiddleware');

function createCompanyRoutes(companyService) {

    const router = express.Router();
    router.use(authMiddleware);

    router.post('/new', async (req, res) => {
        try {
            const result = await companyService.addCompany(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ "Error": 'Internal Server Error' });
        }
    });

    router.get('/recents', async (req, res) => {
        const result = await companyService.companiesAddedLastMonth();
        if (result.length === 0) {
            return res.status(200).json(
                {
                    data: result,
                    message: 'No companies found added in the last month'
                });
        }
        res.status(200).json(result);
    });


    return router;
}

module.exports = { createCompanyRoutes };
