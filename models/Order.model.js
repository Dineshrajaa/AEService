var orm = require('../orm');

// Related Models

var Order = orm.bookshelf.Model.extend({
  tableName: 'Order',
  idAttribute: 'OrderId',
  UserAccount : function(){ return this.belongsTo(UserAccount, 'UserId').query(function(qo){
			qo.select('*');
		}); 
	},
});
UserAccount = require('./UserAccount.model');
module.exports = Order;