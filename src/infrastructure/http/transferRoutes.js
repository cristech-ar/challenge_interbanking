const express = require('express');
const { authMiddleware } = require('./authMiddleware');

function createTransferRoutes(transferService) {
    
    const router = express.Router();
    router.use(authMiddleware);
    
    router.get('/recents/companies', async (req, res) => {
        

        try {
            const result = await transferService.companiesByTransfersLastMonth();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to obtain the companies with recent transfers' });

        }


    });

    router.post('/', async (req, res) => {
        try {
            const { amount, companyId, debitAccount, creditAccount} = req.body;
            const transfer = await transferService.createTransfer({ amount, companyId, debitAccount, creditAccount });
            res.status(201).json(transfer);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create transfer' });
        }
    });

    return router;
}

module.exports = { createTransferRoutes };
