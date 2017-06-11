var orm = require('../orm');

// Related Models

var Seller = orm.bookshelf.Model.extend({
  tableName: 'Seller',
  idAttribute: 'SellerID'
});

module.exports = Seller;