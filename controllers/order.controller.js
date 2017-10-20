var config = require('../config'),
	Order = require('../models/Order.model'),
	orderServices = require('../services/order.service'),
	Promise = require("bluebird");

exports.getAllOrders = function (req, res) {
	var OrgId = (req.params.OrgId) ? req.params.OrgId : false;
	orderServices.getAllOrders(OrgId).then(function (result) {
		res.json(result);
	}).catch(function () {
		res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
	});
}

exports.getOrdersPlacedbyUser = function (req, res) {
	/**
	 * Method to get the list of orders placed by User
	 */
	var UserId = (req.params.UserId) ? req.params.UserId : false;
	orderServices.getAllOrdersofUser(UserId).then(function (result) {
		console.log(result);
		
		res.json({ "StatusCode": 200, "data": result, "ResponseMessage": 'Listed your Orders' });
	}).catch(function (err) {
		console.log('err in :',err)
		res.json({ "StatusCode": 200, "data": [], "ResponseMessage": "Unable to fetch" });
	});
}

exports.getOrdersReceviedbyUser = function (req, res) {
	/**
	 * Method to get the list of orders placed by User
	 */
	var OrgId = (req.params.OrgId) ? req.params.OrgId : false;
	orderServices.getAllOrdersReceived(OrgId).then(function (result) {
		console.log(result.models);
		res.json({ "StatusCode": 200, "data": result, "ResponseMessage": 'Listed your Orders' });
	}).catch(function (err) {
		res.json({ "StatusCode": 200, "data": [], "ResponseMessage": "Unable to fetch" });
	});
}

exports.getOrderDetail = function (req, res) {
	/**
	 * Method to get the order detail
	 */
	var OrderId = (req.params.OrderId) ? req.params.OrderId : false;
	orderServices.getOrderDetail(OrderId).then(function (result) {
		console.log(result.models);
		res.json({ "StatusCode": 200, "data": result, "ResponseMessage": 'Listed your Order details' });
	}).catch(function () {
		res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
	});
}

exports.placeOrder = function (req, res) {
	/* Method to place orders */
	orderServices.createOrder(req.body).then(function (result) {
		console.log('result:', result);
		req.body.OrderId = result;
		saveOrderDetails(req, res);
	}).catch(function (err) {
		res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
	});
}

saveOrderDetails = function (req, res) {
	/**
	 * Method to save order details with orderID
	 */
	var items = req.body.items;
	orderServices.saveItems(req.body).then(function (result) {
		console.log('result2:', result);
		if (result) {
			clearBasket(req, res);
		}
		// res.json({ "StatusCode": 200, "data": result, "ResponseMessage": "Created Order Successfully" });
	}).catch(function (err) {
		res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
	});
}

clearBasket = function (req, res) {
	console.log('req.body:', req.body);
	orderServices.removeItemsFromBasket(req.body).then(function (result) {
		console.log('result3:', result);
		if (result)
			res.json({ "StatusCode": 200, "data": result, "ResponseMessage": "Created Order Successfully" });
	}).catch(function (err) {
		res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
	});
}

