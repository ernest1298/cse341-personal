// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Task Manager API',
    description: 'API for managing tasks'
  },
  host: 'localhost:3000', // Change this to your Render URL when deploying
  schemes: ['http'],
  paths: {
    '/tasks': {
      get: {
        summary: 'Get all tasks',
        description: 'Retrieve a list of all tasks',
        responses: {
          200: {
            description: 'A list of tasks'
          }
        }
      },
      post: {
        summary: 'Create a new task',
        description: 'Add a new task to the database',
        parameters: [
          { name: 'title', in: 'body', required: true, type: 'string' },
          { name: 'description', in: 'body', required: true, type: 'string' },
          { name: 'completed', in: 'body', type: 'boolean' }
        ],
        responses: {
          201: {
            description: 'Task created successfully'
          },
          400: {
            description: 'Validation error'
          }
        }
      }
    },
    '/tasks/{id}': {
      get: {
        summary: 'Get task by ID',
        description: 'Retrieve a specific task by its ID',
        parameters: [
          { name: 'id', in: 'path', required: true, type: 'string' }
        ],
        responses: {
          200: {
            description: 'Task data'
          },
          404: {
            description: 'Task not found'
          }
        }
      },
      put: {
        summary: 'Update a task',
        description: 'Update an existing task by ID',
        parameters: [
          { name: 'id', in: 'path', required: true, type: 'string' },
          { name: 'title', in: 'body', type: 'string' },
          { name: 'description', in: 'body', type: 'string' },
          { name: 'completed', in: 'body', type: 'boolean' }
        ],
        responses: {
          200: {
            description: 'Task updated successfully'
          },
          404: {
            description: 'Task not found'
          },
          400: {
            description: 'Validation error'
          }
        }
      },
      delete: {
        summary: 'Delete a task',
        description: 'Delete a task by its ID',
        parameters: [
          { name: 'id', in: 'path', required: true, type: 'string' }
        ],
        responses: {
          200: {
            description: 'Task deleted successfully'
          },
          404: {
            description: 'Task not found'
          }
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/tasks.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
