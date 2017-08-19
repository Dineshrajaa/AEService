var orm = require('../orm');

// Related Models

var Participants = orm.bookshelf.Model.extend({
    tableName: 'Participants',
    idAttribute: 'ParticipantId'
});
module.exports = Participants;