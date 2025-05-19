const express = require('express');
const { authMiddleware } = require('./authMiddleware');

function createTransferRoutes(transferService) {
    
    const router = express.Router();
    router.use(authMiddleware);

    router.get('/transfers/recents', async (req, res) => {

        try {
            const result = await transferService.companiesByRecentsTransfer();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to obtain the companies with recent transfers' });

        }


    });

    return router;
}

module.exports = { createTransferRoutes };
