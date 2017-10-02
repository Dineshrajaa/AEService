/**
 * Module dependencies
 */
var controller = require('../controllers/order.controller'),
  middleware = require('../middlewares/AuthUser.middleware');
/**
* the new Router exposed in express 4
* the indexRouter handles all requests to the `/` path
*/
module.exports = function (router) {
  /**
   * this accepts all request methods to the `/` path
   */
  router.route('/Aesthetic/api/Order/:OrgId')
    .get(middleware.authorizseUser, controller.getAllOrders)
  router.route('/Aesthetic/api/Order')
    .post(middleware.authorizseUser, controller.placeOrder)
  router.route('/Aesthetic/api/OrderPlaced/:UserId')
    .get(middleware.authorizseUser, controller.getOrdersPlacedbyUser)
  router.route('/Aesthetic/api/OrderRecevied/:OrgId')
    .get(middleware.authorizseUser, controller.getOrdersReceviedbyUser)
  router.route('/Aesthetic/api/OrderDetail/:OrderId')
    .get(middleware.authorizseUser, controller.getOrderDetail)
}