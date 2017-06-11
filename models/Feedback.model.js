var orm = require('../orm');

// Related Models

var Feedback = orm.bookshelf.Model.extend({
  tableName: 'Feedback',
  idAttribute: 'FeedbackId'
});

module.exports = Feedback;

