var orm = require('../orm');

// Related Models

var ClientTreatments = orm.bookshelf.Model.extend({
    tableName: 'ClientTreatments',
    idAttribute: 'PictureId'
});
module.exports = ClientTreatments;