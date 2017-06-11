var orm = require('../orm');

// Related Models

var Treatment = orm.bookshelf.Model.extend({
  tableName: 'Treatment',
  idAttribute: 'TreatmentIdPrimary'
});

module.exports = Treatment;