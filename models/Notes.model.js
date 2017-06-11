var orm = require('../orm');

// Related Models

var Notes = orm.bookshelf.Model.extend({
  tableName: 'Notes',
  idAttribute: 'NoteId',
  Client : function(){ 
  	return this.belongsTo(Clients, 'ClientId'); 
  }
});
module.exports = Notes;