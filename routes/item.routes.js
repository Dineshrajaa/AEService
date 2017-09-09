/**
 * Module dependencies
 */
var controller = require('../controllers/item.controller'),
	middleware = require('../middlewares/AuthUser.middleware');
/**
* the new Router exposed in express 4
* the indexRouter handles all requests to the `/` path
*/
module.exports = function (router) {
	/**
	 * this accepts all request methods to the `/` path
	 */
	router.route('/Aesthetic/api/Item')
		.get(controller.GetAllItems)
		.post(controller.AddItem)
	router.route('/Aesthetic/api/Item/:OrgId')
		.get(controller.GetItemsOfOrganization)
	router.route('/Aesthetic/api/Item/GetItemBySubcategoryId')
		.get(controller.GetItemBySubcategoryId);
	router.route('/Aesthetic/api/Item/GetByItemId')
		.get(controller.GetById);
}