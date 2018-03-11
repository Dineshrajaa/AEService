
/**
 * Module dependencies
 */
var controller = require('../controllers/Posts.controller'),
    middleware = require('../middlewares/AuthUser.middleware');
/**
* the new Router exposed in express 4
* the indexRouter handles all requests to the `/` path
*/
module.exports = function (router) {
    /**
     * this accepts all request methods to the `/` path
     */
    router.route('/Aesthetic/api/Posts')
        //   .get(middleware.authorizseUser,controller.getAllPost);
        .post(middleware.authorizseUser, controller.AddPost)
    router.route('/Aesthetic/api/Posts/:OrgId/:input/:country/:pagenumber/:limit/:zone/:subzone')
        .get(middleware.authorizseUser, controller.GetAllPosts)
    router.route('/Aesthetic/api/Posts/:PostId')
        .put(middleware.authorizseUser, controller.updatePost)
        .delete(middleware.authorizseUser, controller.deletePost)
}