const development = {
  database: 'db_piknik_unicorn',
  username: 'root',
  password: 'Ramujibril*9',
  host: 'localhost',
  dialect: 'mysql' ,
};


const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect:  'mysql' ,
};

module.exports = {
  development,
  production,
};
