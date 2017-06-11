var orm = require('../orm');

// Related Models

var Comment = orm.bookshelf.Model.extend({
  tableName: 'Comment',
  idAttribute: 'CommentId',
  UserAccount : function(){ 
  	return this.belongsTo(UserAccount, 'UserId'); 
  },
  PostDetail : function(){
  	return this.belongsTo(PostGet, 'PostId'); 
  }
});
UserAccount = require('./UserAccount.model');
PostGet = require('./PostGet.model');
module.exports = Comment;

