/**
 * Module dependencies
 */
 var controller = require('../controllers/Comment.controller'),
	 middleware = require('../middlewares/AuthUser.middleware');
 /**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
module.exports = function(router) {
  /**
   * this accepts all request methods to the `/` path
   */
	router.route('/Aesthetic/api/Comment/GetById')
      .get(controller.commentGetById);
  	router.route('/Aesthetic/api/Comment')
  		.post(middleware.authorizseUser,controller.CreateComment)
  	router.route('/Aesthetic/api/Comment/Update')
  		.post(middleware.authorizseUser,controller.updateComment)
	router.route('/Aesthetic/api/Comment/Delete')
		.get(middleware.authorizseUser,controller.DeleteComment)
}