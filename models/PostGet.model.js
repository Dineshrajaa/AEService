var orm = require('../orm');

// Related Models

var PostGet = orm.bookshelf.Model.extend({
  tableName: 'PostGet',
  idAttribute: 'PostId',
  UserAccount : function(){ 
  	return this.belongsTo(PostImage, 'PostId'); 
  }
  /*Categories : function(){ 
  	return this.hasMany(Categories, 'OrgId'); 
  }*/
});
// Load child models after exports, so that can create 2-way relations
PostImage = require('./PostImage.model');
module.exports = PostGet;
