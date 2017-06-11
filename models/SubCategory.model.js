var orm = require('../orm');

// Related Models

var SubCategory = orm.bookshelf.Model.extend({
  tableName: 'SubCategory',
  idAttribute: 'SubcatId',
  Category : function(){ 
  	return this.belongsTo(Categories, 'CatId'); 
  }
});
Categories = require('./Categories.model');
module.exports = SubCategory;