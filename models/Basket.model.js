var orm = require('../orm');

// Related Models

var Basket = orm.bookshelf.Model.extend({
  tableName: 'Basket',
  idAttribute: 'BasketId'
});
module.exports = Basket;