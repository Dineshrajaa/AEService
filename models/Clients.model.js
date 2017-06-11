var orm = require('../orm');

// Related Models

var Clients = orm.bookshelf.Model.extend({
  tableName: 'Clients',
  idAttribute: 'ClientId'
});
module.exports = Clients;