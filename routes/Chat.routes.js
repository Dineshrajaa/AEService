/**
 * Module dependencies
 */
var controller = require('../controllers/Chat.controller'),
    middleware = require('../middlewares/AuthUser.middleware');
/**
* the new Router exposed in express 4
* the indexRouter handles all requests to the `/` path
*/
module.exports = function (router) {
    /**
     * this accepts all request methods to the `/` path
     */
    /* router.route('/Aesthetic/api/Chat/:UserId/:MyUserId')
        .get(controller.GetConversation) */
    /* router.route('/Aesthetic/api/Chat/')
        .post(controller.sendMessage);
    router.route('/Aesthetic/api/Chat/:From/:To')
        .get(controller.getConversation) */

    router.route('/Aesthetic/api/Chat/')
        .post(controller.sendMessage);
    router.route('/Aesthetic/api/Chat/:From/:To')
        .get(controller.getConversationNew)
    router.route('/Aesthetic/api/Chat/:UserId')
        .get(controller.getMyRecentConversation)
}