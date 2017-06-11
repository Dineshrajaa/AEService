var orm = require('../orm');

// Related Models

var Item = orm.bookshelf.Model.extend({
  tableName: 'Item',
  idAttribute: 'ItemID'
});

module.exports = Item;