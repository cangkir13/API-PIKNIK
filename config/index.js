const userRoutes = require('./routes/userRoutes');
const usersRs = require('./routes/usersRs');

const config = {
  migrate: true,
  userRoutes,
  usersRs,
  port: process.env.PORT || '8011',
};

module.exports = config;
