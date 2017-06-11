var orm = require('../orm');

// Related Models

var Review = orm.bookshelf.Model.extend({
  tableName: 'Review',
  idAttribute: 'ReviewId',
  UserAccount:function(){
  	return this.belongsTo(UserAccount, 'UserId'); 
  },
  ReviewComment:function(){
  	return this.hasMany(ReviewComment, 'ReviewId');
  }
});
ReviewComment = require('./ReviewComment.model');
UserAccount = require('./UserAccount.model');
module.exports = Review;