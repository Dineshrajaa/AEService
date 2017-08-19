var orm = require('../orm');

// Related Models

var Conversation = orm.bookshelf.Model.extend({
  tableName: 'Conversation',
  idAttribute: 'ConversationId'
});
module.exports = Conversation;