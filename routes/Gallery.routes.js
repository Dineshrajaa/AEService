/**
 * Module dependencies
 */
var controller = require('../controllers/Gallery.controller'),
      middleware = require('../middlewares/AuthUser.middleware');
/**
* the new Router exposed in express 4
* the indexRouter handles all requests to the `/` path
*/
module.exports = function (router) {
      /**
       * this accepts all request methods to the `/` path
       */
      router.route('/Aesthetic/api/Gallery/GetGalleryById')
            .get(controller.GetGalleryById);
      router.route('/Aesthetic/api/Gallery')
            .post(controller.addPhotoToGallery);
      router.route('/Aesthetic/api/Gallery/:GalleryId')
            .delete(controller.deletePhotoFromGallery);
}