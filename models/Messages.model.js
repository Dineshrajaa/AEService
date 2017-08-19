var orm = require('../orm');

// Related Models

var Messages = orm.bookshelf.Model.extend({
    tableName: 'Messages',
    idAttribute: 'MessageId'
});
module.exports = Messages;