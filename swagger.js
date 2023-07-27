const swaggerJsdoc = require('swagger-jsdoc');

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update with your server's URL
      },
    ],
  },
  apis: ['./index.js', './routes/*.js'], // Path to the file containing your API routes (replace with your file name)
};

module.exports = swaggerJsdoc(swaggerOptions);
