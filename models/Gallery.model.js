var orm = require('../orm');

// Related Models

var Gallery = orm.bookshelf.Model.extend({
  tableName: 'Gallery',
  idAttribute: 'GalleryId'
});

module.exports = Gallery;