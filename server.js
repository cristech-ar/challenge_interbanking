const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose'),
    setupSwagger = require('./src/config/swagger'),
    helmet = require('helmet');


const { createCompanyRoutes } = require('./src/infrastructure/http/companyRoutes');
const { createCompanyService } = require('./src/application/companyService');
const { createTransferRoutes } = require('./src/infrastructure/http/transferRoutes');
const { createTransferService } = require('./src/application/transferService');
const { createCompanyRepoMongo } = require('./src/infrastructure/db/companyRepoMongo');
const { createTransferRepoMongo } = require('./src/infrastructure/db/transferRepoMongo');
const { initDefaultUser } = require('./src/infrastructure/db/initDefaultUser');
const { authRoutes } = require('./src/infrastructure/http/authRoutes');


(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('🟢 Connected to MongoDB with Mongoose');

        await initDefaultUser();

        // Crear repositorios basados en modelos Mongoose
        const companyRepo = createCompanyRepoMongo();         // internamente usa modelos mongoose
        const transferRepo = createTransferRepoMongo();

        // Casos de uso
        const companyService = createCompanyService({ companyRepo });
        const transferService = createTransferService({ transferRepo });

        // Inicializar Express
        const app = express();
        app.use(express.json());

        setupSwagger(app);
        app.use(helmet());
        // Rutas
        app.use('/auth', authRoutes);
        app.use('/v1/companies', createCompanyRoutes(companyService));
        app.use('/v1/transfers', createTransferRoutes(transferService));
        app.get('/', (req, res) => {
            res.redirect(301, '/explorer');
        });

        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('❌ Error starting server:', err);
        process.exit(1);
    }
})();
