/**
 * Module dependencies
 */
var controller = require('../controllers/Clients.controller'),
	middleware = require('../middlewares/AuthUser.middleware');
/**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
module.exports = function (router) {
	/**
	 * this accepts all request methods to the `/` path
	 */
	/*router.route('/Aesthetic/api/GetAllCategories')
      .get(controller.GetAllCategories);
  	router.route('/Aesthetic/api/Categories/GetById')
  		.get(controller.CategoriesGetById);*/
	router.route('/Aesthetic/api/Clients/:OrgId')
		// .post(controller.AddClient)
		.get(controller.GetAllClients)
	router.route('/Aesthetic/api/Clients')
		.post(controller.AddClient)
	router.route('/Aesthetic/api/Clients/:ClientId')
		.delete(controller.DeleteClient)
	router.route('/Aesthetic/api/Consumers')
		.get(controller.GetAllConsumers)
	/*router.route('/Aesthetic/api/Categories/GetCategoriesOrgId')
		.get(controller.GetCategoriesOrgId);
	router.route('/Aesthetic/api/Categories/GetCategoriesByName')
		.get(controller.GetAllCategories);
	router.route('/Aesthetic/api/Categories/ItemSearchRecord')
		.get(controller.ItemSearchRecord)//bugs
	router.route('/Aesthetic/api/Categories/Delete')
		.get(controller.DeleteCategory)
	router.route('/Aesthetic/api/Categories/GetCategoryById')
		.get(controller.GetCategoryById)*/
}