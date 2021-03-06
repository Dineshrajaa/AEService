/**
 * Module dependencies
 */
 var controller = require('../controllers/Treatment.controller'),
	 middleware = require('../middlewares/AuthUser.middleware');
 /**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
module.exports = function(router) {
  /**
   * this accepts all request methods to the `/` path
   */
	router.route('/Aesthetic/api/Treatment/GetByOrgId')
      .get(middleware.authorizseUser,controller.treatmentGetByOrgId);
}