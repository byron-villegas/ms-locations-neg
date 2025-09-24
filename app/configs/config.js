const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, '../docs/swagger.yml'), 'utf8'));

const config = {
  server: {
    context: '/ms-locations-neg',
    port: process.env.PORT || 3000,
    requestTimeout: 10 * 1000 // 10 seconds
  },
  swagger: {
    title: 'MS Locations Neg',
    description: 'Microservicio para registrar y consultar localizaciones',
    version: '1.0.0',
    endpoint: '/api-docs',
    document: swaggerDocument
  },
  cors: {
    origin: process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },
  routes: {
    locations: '/locations'
  },
  cache: {
    time: 5 * 60 * 1000 // 5 minutes
  },
  mongodb: {
    host: process.env.MONGO_HOST,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    db: process.env.MONGO_DB
  }
};

module.exports = config;