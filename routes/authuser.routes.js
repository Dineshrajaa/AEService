/**
 * Module dependencies
 */
 var controller = require('../controllers/authuser.controller');
 /**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
module.exports = function(router) {
  /**
   * this accepts all request methods to the `/` path
   */
  router.route('/Aesthetic/api/Users/Login')
      .post(controller.login);
/*
  router.route('/logout')
      .post(controller.logout);

  router.route('/authorize/me')
      .get(controller.authorizseUser,controller.userdetail);*/
}