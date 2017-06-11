var orm = require('../orm');

// Related Models

var Categories = orm.bookshelf.Model.extend({
  tableName: 'Categories',
  idAttribute: 'CatId',
  Organization : function(){ 
  	return this.belongsTo(Organization, 'OrgId'); 
  }
});
Organization = require('./Organization.model');
module.exports = Categories;