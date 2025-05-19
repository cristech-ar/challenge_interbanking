const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Companies and Transfers API',
            version: '1.0.0',
            description: 'API for managing companies and transfers.',
            contact: {
                name: 'Cristian Ríos',
                email: 'contact@crisdev.tech',
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            }
        },
        servers: [
            {
                url: 'https://challenge-sooft.crisdev.tech',
                description: 'Production server',
            },
            {
                url: 'http://localhost:8080',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                company: {
                    type: 'object',
                    properties: {
                        CUIT: {
                            type: 'string',
                            example: '20-12345678-9'
                        },
                        companyName: {
                            type: 'string',
                            example: 'Testing Company LLC',
                        },
                        accession_date: {
                            type: 'date',
                            example: '2023-10-01',
                        },
                    },
                    required: ['CUIT', 'companyName', 'accession_date'],
                },
                transfer: {
                    type: 'object',
                    properties: {
                        amount: {
                            type: 'number',
                            example: 1000.50
                        },
                        companyId: {
                            type: 'string',
                            example: '64f8b8f7e4b0d1a2b3c4d5e6'
                        },
                        debitAccount: {
                            type: 'string',
                            example: '64f8b8f7e4b0d1a2b3c4d5e7'
                        },
                        creditAccount: {
                            type: 'string',
                            example: '6434b8f7e4b0d1a2b3c4d5e8'
                        }
                    },
                    required: ['amount', 'companyId', 'debitAccount', 'creditAccount']
                },
                user: {
                    type: 'object',
                    properties: {
                        passwordHash: {
                            type: 'string',
                            example: '$2b$10$EIX5Q1Z5Y5Z5Y5Z5Y5Z5Z.0'
                        },
                        refreshToken: {
                            type: 'string',
                            example: '$2b$10$EIX5Q1Z5Y5Z5Y5Z5Y5Z5Z.0'
                        },
                        userName: {
                            type: 'string',
                            example: 'testUser'
                        }
                    },
                    required: ['userName', 'passwordHash']
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['../src/infrastructure/http/*.js'],
};


const swaggerSpec = swaggerJsDoc(swaggerOptions);


const setupSwagger = (app) => {
    app.use('/explorer', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;