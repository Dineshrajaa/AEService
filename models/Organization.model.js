var orm = require('../orm');

// Related Models

var Organization = orm.bookshelf.Model.extend({
  tableName: 'Organization',
  idAttribute: 'OrgId',
  Categories : function(){ 
  	return this.hasMany(Categories, 'OrgId'); 
  },
  Gallery: function(){
  	return this.hasMany(Gallery, 'OrgId'); 
  }
});
// Load child models after exports, so that can create 2-way relations
Gallery = require('./Gallery.model');
Categories = require('./Categories.model');
module.exports = Organization;
