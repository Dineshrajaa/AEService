/**
 * Module dependencies
 */
var controller = require('../controllers/Organization.controller'),
    middleware = require('../middlewares/AuthUser.middleware');
/**
* the new Router exposed in express 4
* the indexRouter handles all requests to the `/` path
*/
module.exports = function (router) {
    /**
     * this accepts all request methods to the `/` path
     */
    router.route('/Aesthetic/api/Organization/GetById')
        .get(middleware.authorizseUser, controller.GetOrganizationById);
    router.route('/Aesthetic/api/Organization')
        .get(middleware.authorizseUser, controller.GetAllOrganization);
    router.route('/Aesthetic/api/FindNearByOrganization')
        .get(controller.FindNearByOrganization);
    router.route('/Aesthetic/api/Organization/:OrgId')
        .put(middleware.authorizseUser, controller.UpdateOrganizationCover);
    router.route('/Aesthetic/api/Organization/terms/:OrgId')
        .put(middleware.authorizseUser, controller.UpdateOrganizationTerms);

}