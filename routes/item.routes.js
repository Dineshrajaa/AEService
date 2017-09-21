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
	router.route('/Aesthetic/api/Item/GetByItemId')
		.get(controller.GetById);
	router.route('/Aesthetic/api/Item')
		.get(controller.GetAllItems)
		.post(controller.AddItem)
		.put(controller.UpdateItem)
	router.route('/Aesthetic/api/Item/:ItemID')
		.delete(controller.DeleteItem)
	router.route('/Aesthetic/api/Item/GetItemBySubcategoryId')
		.get(controller.GetItemBySubcategoryId);
	router.route('/Aesthetic/api/Item/:OrgId')
		.get(controller.GetItemsOfOrganization)


}