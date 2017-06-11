/**
 * Module dependencies
 */
 var controller = require('../controllers/UserAccount.controller');
 var middleware = require('../middlewares/AuthUser.middleware');

 /**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
module.exports = function(router) {
  /**
   * this accepts all request methods to the `/` path
   */
	router.route('/Aesthetic/api/Users/')
      	.post(middleware.authorizseUser,controller.registerUser)
      	.get(middleware.authorizseUser,controller.getAllUsers);
    router.route('/Aesthetic/api/Users/GetUserAccount/')
    	.get(middleware.authorizseUser,controller.GetUserAccount);
	//router.route('/Aesthetic/api/Users/Update')
    	//.post(middleware.authorizseUser,controller.updateUserProfile);
	router.route('/Aesthetic/api/Users/GetById')
		.get(middleware.authorizseUser,controller.GetUserAccountById);
	router.route('/Aesthetic/api/Users/GetUsersImageById')
		.get(middleware.authorizseUser,controller.GetUsersImageById);
	router.route('/Aesthetic/api/Users/PutUserImage')
		.post(middleware.authorizseUser,controller.updateUserProfile);
	router.route('/Aesthetic/api/Users/ChangePassword')
		.post(middleware.authorizseUser,controller.ChangePassword);
	/*router.route('/Aesthetic/api/Account/ResetPassword')
		.get()*/
}