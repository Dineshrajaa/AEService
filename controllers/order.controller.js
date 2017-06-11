var config         = require('../config'),
	Order = require('../models/Order.model'),
	orderServices = require('../services/order.service'),
	Promise        = require("bluebird");

exports.getAllOrders = function(req, res){
	orderServices.getAllOrders().then(function(result){
		res.json(result);
	}).catch(function(){
		res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
	});
}

