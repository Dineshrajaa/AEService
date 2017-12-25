/**
 * Module dependencies
 */
var controller = require('../controllers/Review.controller'),
    middleware = require('../middlewares/AuthUser.middleware');
/**
* the new Router exposed in express 4
* the indexRouter handles all requests to the `/` path
*/
module.exports = function (router) {
    /**
     * this accepts all request methods to the `/` path
     */
    router.route('/Aesthetic/api/ReviewComment/GetReviewCommentById')
        .get(controller.GetReviewCommentById)
    router.route('/Aesthetic/api/ReviewComment')
        .get(controller.ReviewComment)
        .post(controller.CreateReviewComment)
    router.route('/Aesthetic/api/Review/GetReviewByOrgId')
        .get(controller.GetReviewByOrgId)
    router.route('/Aesthetic/api/Review/PostReview')
        .post(middleware.authorizseUser, controller.PostReview)
    router.route('/Aesthetic/api/Review/:ReviewId')
        .put(middleware.authorizseUser, controller.UpdateReview)
        .delete(middleware.authorizseUser, controller.DeleteReview)

}