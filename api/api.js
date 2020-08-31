/**
 * libraries
 */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const AuthUser = require('../api/services/JwtAuth');

/**
 * use .env for production
 */
require('dotenv').config()

/**
 * server config
 */
const config = require('../config/');
const dbService = require('./services/db.service');

/**
 * Middleware
 */
const validatePolicy= require('./middleware/validation/validatePolicy');


// environment: development, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const server = http.Server(app);

/**
 * https://www.npmjs.com/package/express-routes-mapper + middleware example
 */
// const mappedUserRoutes = mapRoutes(config.userRoutes, 'api/controllers/', validatePolicy().requiredHeaders);
const mappedUserRoutes = mapRoutes(config.userRoutes, 'api/controllers/');
const mappedUserRs = mapRoutes(config.usersRs, 'api/controllers/');


/**
 * Database migration
 */
const DB = dbService(environment, config.migrate).start();

// allow cors
app.use(cors());

// protect express 
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing body request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// auth
app.all('/api/service/*', (req, res, next) => AuthUser(req, res, next));
// url path for each routes
app.use('/api', mappedUserRoutes);
app.use('/api/service', mappedUserRs);


server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' 
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});
