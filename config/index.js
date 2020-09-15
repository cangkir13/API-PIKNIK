const userRoutes = require('./routes/userRoutes');
const usersRs = require('./routes/usersRs');
const ProductRoute = require('./routes/ProductRoute')

const config = {
  migrate: true,
  userRoutes,
  usersRs,
  ProductRoute,
  port: process.env.PORT || '8011',
};

module.exports = config;
