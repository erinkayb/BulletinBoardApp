const environment = process.env.NODE_ENV || 'development' || 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletin';
const config = require('../knexfile')[environment];
module.exports = require('knex')(config);
