/**
 * Module dependencies
 */
var controller = require('../controllers/Basket.controller'),
    middleware = require('../middlewares/AuthUser.middleware');
/**
* the new Router exposed in express 4
* the indexRouter handles all requests to the `/` path
*/
module.exports = function (router) {
    /**
     * this accepts all request methods to the `/` path
     */

    router.route('/Aesthetic/api/Basket')
        .post(controller.AddToBasket);
    router.route('/Aesthetic/api/Basket/:UserId')
        .get(controller.GetItemsFromMyBasket)
    router.route('/Aesthetic/api/Basket/:BasketId')
        .delete(controller.RemoveFromMyBasket)
}