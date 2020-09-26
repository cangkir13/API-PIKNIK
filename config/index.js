const userRoutes = require('./routes/userRoutes');
const usersRs = require('./routes/usersRs');
const ProductRoute = require('./routes/ProductRoute');
const imgRoute = require('./routes/ImgRoute');
const Content = require('./routes/contentRoute');

const config = {
  migrate: true,
  userRoutes,
  usersRs,
  ProductRoute,
  imgRoute,
  Content,
  port: process.env.PORT || '8011',
};

module.exports = config;
