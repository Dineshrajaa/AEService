var orm = require('../orm');

// Related Models

var Chat = orm.bookshelf.Model.extend({
  tableName: 'Chat',
  idAttribute: 'Id'
});
module.exports = Chat;