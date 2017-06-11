var orm = require('../orm');

// Related Models

var OrderDetail = orm.bookshelf.Model.extend({
  tableName: 'OrderDetail',
  idAttribute: 'OrdDEtaild'
});

module.exports = OrderDetail;