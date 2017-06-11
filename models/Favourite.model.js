var orm = require('../orm');

// Related Models

var Favourite = orm.bookshelf.Model.extend({
  tableName: 'Favourite',
  idAttribute: 'FavouriteId',
  UserAccount : function(){ 
  	return this.belongsTo(UserAccount, 'UserId'); 
  },
  Organization: function(){
  	return this.belongsTo(Organization, 'OrgId'); 
  }
});
UserAccount = require('./UserAccount.model');
Organization = require('./Organization.model');
module.exports = Favourite;


