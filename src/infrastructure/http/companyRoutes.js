const express = require('express');
const { authMiddleware } = require('./authMiddleware');

function createCompanyRoutes(companyService) {
    
    const router = express.Router();
    router.use(authMiddleware);

    router.post('/companies', async (req, res) => {
        try {
            const result = await companyService.addCompany(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    router.get('/companies/recents', async (req, res) => {
        const result = await companyService.empresasAdheridasUltimoMes();
        res.json(result);
    });


    return router;
}

module.exports = { createCompanyRoutes };
