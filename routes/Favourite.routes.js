/**
 * Module dependencies
 */
 var controller = require('../controllers/Favourite.controller'),
	 middleware = require('../middlewares/AuthUser.middleware');
 /**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
module.exports = function(router) {
  /**
   * this accepts all request methods to the `/` path
   */
	router.route('/Aesthetic/api/Favourite')
      .get(controller.GetAllFavourites)
      .post(controller.addFavourite);
  	router.route('/Aesthetic/api/Favourite/SearchRecord')
  		.get(controller.SearchRecord)
	router.route('/Aesthetic/api/Favourite/SearchRecordWithCountry')
		.get(controller.SearchRecordWithCountry)
	router.route('/Aesthetic/api/Favourite/GetFavouriteById')
		.get(controller.GetFavouriteById)
	router.route('/Aesthetic/api/Favourite/OrgDuplicate')
		.get(controller.OrgDuplicate);
	router.route('/Aesthetic/api/Favourite/DeleteFavouriteByUser')
		.post(controller.DeleteFavouriteByUser);
}