var orm = require('../orm');

// Related Models

var UserAccount = orm.bookshelf.Model.extend({
  tableName: 'UserAccount',
  idAttribute: 'UserId'
});

module.exports = UserAccount;