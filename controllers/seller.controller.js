var config = require('../config'),
	Seller = require('../models/Seller.model'),
	SellerServices = require('../services/seller.service'),
	Promise = require("bluebird");
/*Get all categories*/
exports.GetAllSeller = function (req, res) {
	SellerServices.GetAllSeller(false).then(function (result) {
		if (result.length) {
			return Promise.map(result.models, function (appo) {
				return {
					"Item": {
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
						"ItemID": appo.get('ItemID'),
						"ItemName": appo.get('ItemName'),
						"ItemDiscp": appo.get('ItemDiscp'),
						"ItemImage": appo.get('ItemImage'),
						"ItemPrice": appo.get('ItemPrice'),
						"EstDelivery": appo.get('EstDelivery'),
						"Returns": appo.get('Returns'),
						"ItemCurrency": appo.get('ItemCurrency'),
						"subcatId": appo.get('subcatId'),
						"ItemQuantity": appo.get('ItemQuantity'),
						"CatId": appo.get('CatId'),
						"CatName": appo.get('CatName'),
						"SbCatName": appo.get('SbCatName'),
						"Status": appo.get('Status'),
						"OrgImage": appo.get('OrgImage'),
						"OrgName": appo.get('OrgName'),
						"OrgId": appo.get('OrgId'),
						"SubcatId": appo.get('SubcatId')
					},
					"SellerID": appo.get('SellerID'),
					"Name": appo.get('Name'),
					"ItemID": appo.get('ItemID'),
					"Status": appo.get('Status')
				}
			});
		} else {
			return [];
		}

	}).then(function (finalResult) {
		res.json(finalResult);
	}).catch(function (err) {
		console.log(err);
	});
}

//
exports.GetSellerByItemId = function (req, res) {
	var ItemID = (req.query.Itemid) ? req.query.Itemid : false;
	if (ItemID) {
		SellerServices.GetAllSeller(ItemID).then(function (result) {
			if (result.length) {
				return Promise.map(result.models, function (appo) {
					return {
						"Item": {
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
							"ItemID": appo.get('ItemID'),
							"ItemName": appo.get('ItemName'),
							"ItemDiscp": appo.get('ItemDiscp'),
							"ItemImage": appo.get('ItemImage'),
							"ItemPrice": appo.get('ItemPrice'),
							"EstDelivery": appo.get('EstDelivery'),
							"Returns": appo.get('Returns'),
							"ItemCurrency": appo.get('ItemCurrency'),
							"subcatId": appo.get('subcatId'),
							"ItemQuantity": appo.get('ItemQuantity'),
							"CatId": appo.get('CatId'),
							"CatName": appo.get('CatName'),
							"SbCatName": appo.get('SbCatName'),
							"Status": appo.get('Status'),
							"OrgImage": appo.get('OrgImage'),
							"OrgName": appo.get('OrgName'),
							"OrgId": appo.get('OrgId'),
							"SubcatId": appo.get('SubcatId')
						},
						"SellerID": appo.get('SellerID'),
						"Name": appo.get('Name'),
						"ItemID": appo.get('ItemID'),
						"Status": appo.get('Status')
					}
				});
			} else {
				return [];
			}

		}).then(function (finalResult) {
			res.json(finalResult);
		}).catch(function (err) {
			console.log(err);
		});
	} else {
		res.json({ "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Seller/GetSellerByItemId'." });
	}

}