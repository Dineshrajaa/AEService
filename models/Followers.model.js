var orm = require('../orm');

// Related Models

var Followers = orm.bookshelf.Model.extend({
  tableName: 'Favourite',
  idAttribute: 'FavouriteId'
});
module.exports = Followers;