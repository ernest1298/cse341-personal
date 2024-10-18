// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Task Manager API',
    description: 'API for managing tasks'
  },
  host: 'localhost:3000',  // Will be changed once deployed on Render
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/tasks.js'];

swaggerAutogen(outputFile, endpointsFiles);
