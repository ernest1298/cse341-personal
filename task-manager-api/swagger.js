// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Task Manager API',
    description: 'API for managing tasks'
  },
  host: 'localhost:3000',  // Use your deployed Render URL when deploying
  schemes: ['http'],        // Update to 'https' when using HTTPS in production
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/tasks.js'];  // Adjust if you have other routes

// Generate the swagger-output.json file
swaggerAutogen(outputFile, endpointsFiles).then(() => {
  console.log('Swagger file generated');
});
