var orm = require('../orm');

// Related Models

var PostGet = orm.bookshelf.Model.extend({
  tableName: 'PostImage',
  idAttribute: 'PostImageId'
  /*Categories : function(){ 
  	return this.hasMany(Categories, 'OrgId'); 
  }*/
});
// Load child models after exports, so that can create 2-way relations
//Categories = require('./Categories.model');
module.exports = PostGet;
