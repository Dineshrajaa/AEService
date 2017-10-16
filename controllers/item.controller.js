var config = require('../config'),
	Item = require('../models/Item.model'),
	ItemServices = require('../services/item.service'),
	Promise = require("bluebird"),
	helperServices = require('../services/helper.service');

//get all items list
exports.GetAllItems = function (req, res) {
	console.log("GetAllItems");
	ItemServices.GetAllItems().then(function (result) {
		if (result.length) {
			return Promise.map(result.models, function (appo) {
				return {
					"SubCategory": {
						"Categories": {
							"CatId": appo.get('CatId'),
							"CatName": appo.get('CatName'),
							"CatImage": config.image_url + appo.get('CatImage'),
							"OrgId": appo.get('OrgId')
						},
						"SubcatId": appo.get('SubcatId'),
						"SbCatName": appo.get('SbCatName'),
						"CatId": appo.get('CatId')
					},
					"ItemID": appo.get('itemId'),
					"ItemName": appo.get('ItemName'),
					"ItemDiscp": appo.get('ItemDiscp'),
					"ItemImage": appo.get('ItemImage'),
					"ItemPrice": appo.get('ItemPrice'),
					"EstDelivery": appo.get('EstDelivery'),
					"Returns": appo.get('Returns'),
					"ItemCurrency": appo.get('ItemCurrency'),
					"ItemQuantity": appo.get('ItemQuantity'),
					"CatId": appo.get('CatId'),
					"CatName": appo.get('CatName'),
					"SbCatName": appo.get('SbCatName'),
					"Status": appo.get('Status'),
					"OrgImage": appo.get('OrgImage'),
					"OrgName": appo.get('OrgName'),
					"OrgId": appo.get('OrgId'),
					"SubcatId": appo.get('SubcatId'),
					"Status": null
				}

			});
		} else {
			return [];
		}
	}).then(function (finalResult) {
		res.json(finalResult);
	}).catch(function (err) {
		res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
	});
};

//get items using subcategory id
exports.GetItemBySubcategoryId = function (req, res) {
	console.log("GetItemBySubcategoryId");
	var subcatId = (req.query.id) ? req.query.id : false;
	var OrgId=(req.query.OrgId) ? req.query.OrgId : false;
	if (subcatId) {
		ItemServices.GetAllItems(subcatId, "subcatId",OrgId).then(function (result) {
			if (result.length) {
				return Promise.map(result.models, function (appo) {
					return {
						"SubCategory": {
							"Categories": {
								"CatId": appo.get('CatId'),
								"CatName": appo.get('CatName'),
								"CatImage": appo.get('CatImage'),
								"OrgId": appo.get('OrgId')
							},
							"SubcatId": appo.get('SubcatId'),
							"SbCatName": appo.get('SbCatName'),
							"CatId": appo.get('CatId')
						},
						"ItemID": appo.get('itemId'),
						"Status": null,
						"ItemName": appo.get('ItemName'),
						"ItemDiscp": appo.get('ItemDiscp'),
						"ItemImage": appo.get('ItemImage'),
						"ItemPrice": appo.get('ItemPrice'),
						"ItemOfferPrice": appo.get('ItemOfferPrice'),
						"OfferValidTill": appo.get('OfferValidTill'),
						"EstDelivery": appo.get('EstDelivery'),
						"Returns": appo.get('Returns'),
						"ItemCurrency": appo.get('ItemCurrency'),
						"ItemQuantity": appo.get('ItemQuantity'),
						"CatId": appo.get('CatId'),
						"CatName": appo.get('CatName'),
						"SbCatName": appo.get('SbCatName'),
						"Status": appo.get('Status'),
						"OrgImage": appo.get('OrgImage'),
						"OrgName": appo.get('OrgName'),
						"OrgId": appo.get('OrgId'),
						"SubcatId": appo.get('SubcatId')
					}

				});
			} else {
				return [];
			}
		}).then(function (finalResult) {
			if (finalResult.length)
				res.json({ "StatusCode": 200, "lstItem": finalResult, "ResponseMessage": "Wow!! you are so passionate about your ItemRepository" });
			else
				res.json({ "StatusCode": 404, "lstItem": finalResult, "ResponseMessage": "Sorry! No GetItemRepository data found!!!" });
		}).catch(function (err) {
			res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
		});
	} else {
		res.json({ "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Item/GetItemBySubcategoryId'." });

	}
}

//get item by id 
exports.GetById = function (req, res) {
	console.log("GetById");
	var ItemID = (req.query.Id) ? req.query.Id : false;
	if (!ItemID)
		ItemID = (req.query.id) ? req.query.id : false;
	if (ItemID) {
		ItemServices.GetAllItems(ItemID, "ItemID").then(function (result) {
			if (result.length) {
				return Promise.map(result.models, function (appo) {
					// console.warn('result.models:',result.models);
					return {
						"SubCategory": {
							"Categories": {
								"CatId": appo.get('CatId'),
								"CatName": appo.get('CatName'),
								"CatImage": appo.get('CatImage'),
								"OrgId": appo.get('ItemOrgId')
							},
							"SubcatId": appo.get('SubcatId'),
							"SbCatName": appo.get('SbCatName'),
							"CatId": appo.get('CatId')
						},
						"ItemID": appo.get('itemId'),
						"Status": null,
						"ItemName": appo.get('ItemName'),
						"ItemDiscp": appo.get('ItemDiscp'),
						"ItemOfferPrice": appo.get('ItemOfferPrice'),
						"ItemImage": appo.get('ItemImage'),
						"ItemPrice": appo.get('ItemPrice'),
						"EstDelivery": appo.get('EstDelivery'),
						"Returns": appo.get('Returns'),
						"ItemCurrency": appo.get('ItemCurrency'),
						"ItemQuantity": appo.get('ItemQuantity'),
						"CatId": appo.get('CatId'),
						"CatName": appo.get('CatName'),
						"SbCatName": appo.get('SbCatName'),
						"Status": appo.get('Status'),
						"OrgImage": appo.get('OrgImage'),
						"OrgName": appo.get('OrgName'),
						"OrgId": appo.get('ItemOrgId'),
						"SubcatId": appo.get('SubcatId')
					}

				});
			} else {
				return null;
			}
		}).then(function (finalResult) {
			if (finalResult)
				res.json({ "StatusCode": 200, "lstItem": finalResult, "ResponseMessage": "Wow!! you are so passionate about your ItemRepository" });
			else
				res.json({ "StatusCode": 200, "lstItem": finalResult, "ResponseMessage": "Sorry! No GetItemRepository data found!!!" });
		}).catch(function (err) {
			res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
		});
	} else {
		res.json({ "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Item/GetById'." });

	}
}

exports.AddItem = function (req, res) {
	/* Method to Add a Product */
	var section = "item";
	var image = (req.body.ItemImage) ? req.body.ItemImage : false;
	ItemServices.AddItem(req.body).then(function (itemSuccess) {
		console.log('itemSuccess:', itemSuccess);
		if (itemSuccess.get("ItemID") !== null) {
			if (image) {
				helperServices.base64toimage(image, itemSuccess.get("ItemID"), section);
			}
			res.json({
				"StatusCode": 200,
				"data": itemSuccess,
				"ResponseMessage": "Added Item successfully!"
			});
		} else {
			res.json({ "StatusCode": 404, "Message": "An error has occurred." });
		}
	}).catch(function (err) {
		res.json({
			"StatusCode": err.status,
			"data": [],
			"ResponseMessage": err.messages
		});
	});

}

exports.UpdateItem = function (req, res) {
	/* Method to Add a Product */
	var section = "item";
	var image = (req.body.ItemImage) ? req.body.ItemImage : false;
	ItemServices.UpdateItem(req.body).then(function (itemSuccess) {
		console.log('itemSuccess:', itemSuccess);
		if (itemSuccess.get("ItemID") !== null) {
			if (image) {
				helperServices.base64toimage(image, itemSuccess.get("ItemID"), section);
			}
			res.json({
				"StatusCode": 200,
				"data": itemSuccess,
				"ResponseMessage": "Updated Item successfully!"
			});
		} else {
			res.json({ "StatusCode": 404, "Message": "An error has occurred." });
		}
	}).catch(function (err) {
		res.json({
			"StatusCode": err.status,
			"data": [],
			"ResponseMessage": err.messages
		});
	});

}

exports.DeleteItem = function (req, res) {
	console.log("DeleteItem");
	console.log("req.params.ItemID:", req.params.ItemID);
	var ItemID = (req.params.ItemID) ? req.params.ItemID : false;
	if (ItemID) {
		ItemServices.DeleteItem(ItemID).then(function (result) {
			if (result)
				res.json({
					"StatusCode": 200,
					"ResponseMessage": "Deleted Item Successfully"
				});
			else
				res.json({
					"Message": "An error has occurred."
				});
		}).catch(function (err) {
			res.json({
				"StatusCode": err.status,
				"deleteclients": [],
				"ResponseMessage": err.messages
			});
		});

	} else {
		res.json({
			"Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Categories/Delete'."
		});
	}
};

exports.GetItemsOfOrganization = function (req, res) {
	/* Method to Get the Items/Products  */
	console.log('GetItemsOfOrganization');
	ItemServices.getMyItems(req.params.OrgId).then(function (Items) {
		if (Items.length) {

			res.json({ "StatusCode": 200, "data": Items, "Message": "Fetched Posts." });
		} else {
			res.json({ "StatusCode": 200, "data": [], "Message": "No Post Found." });
		}
	}).catch(function (err) {
		console.warn('err:', err);
		res.json({
			"StatusCode": err.status,
			"data": [],
			"ResponseMessage": err.messages
		});
	});
}