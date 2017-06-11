var orm = require('../orm');

// Related Models

var ReviewComment = orm.bookshelf.Model.extend({
  tableName: 'ReviewComment',
  idAttribute: 'ReviewCommentId',
  UserAccount:function(){
  	return this.belongsTo(UserAccount, 'UserId'); 
  }
});
UserAccount = require('./UserAccount.model');
module.exports = ReviewComment;