const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

var options = swaggerJsDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'UWB Elearn App API documentation',
      description:
        'Node TypeScript Express server for UWB Elearn app. API Endpoints are located at host/api/version/{endpoint}. \
                    Localhost example: http://localhost:8080/api/v1/auth/login.',
      version: '1.0.0',
      license: {
        name: 'MIT',
        url: 'https://github.com/xmlynek/Elearn-web-app-REFACTORED/blob/master/LICENSE.txt',
      },
      contact: {
        name: 'Filip Mlýnek',
        email: 'mlynekff@gmail.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api/v1`,
      },
    ],
  },
  apis: ['src/routes/v1/*.ts', 'src/docs/*.yml'],
});

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(options, {
    explorer: true,
  })
);

module.exports = router;
export {};
