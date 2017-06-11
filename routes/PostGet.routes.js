/**
 * Module dependencies
 */
 var controller = require('../controllers/PostGet.controller'),
	 middleware = require('../middlewares/AuthUser.middleware');
 /**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
module.exports = function(router) {
  /**
   * this accepts all request methods to the `/` path
   */
	  router.route('/Aesthetic/api/PostGet')
      .get(middleware.authorizseUser,controller.getAllPost);
      router.route('/Aesthetic/api/PostGet/SearchRecord')
      .get(controller.SearchRecord);
      router.route('/Aesthetic/api/PostGet/SearchRecordWithCountry')
      .get(controller.SearchRecordWithCountry);
      router.route('/Aesthetic/api/PostGet/GetByOrgId')
      .get(controller.GetByOrgId)
}