var config         = require('../config'),
	Item = require('../models/Item.model'),
	ItemServices = require('../services/item.service'),
	Promise        = require("bluebird");

//get all items list
exports.GetAllItems = function(req, res){
	console.log("GetAllItems");
	ItemServices.GetAllItems().then(function(result){
		 if(result.length){
        return Promise.map(result.models, function (appo) {
	          return  {
			      		"SubCategory": {
							        "Categories": {
									          "CatId": appo.get('CatId'),
									          "CatName": appo.get('CatName'),
									          "CatImage":config.image_url+appo.get('CatImage'),
									          "OrgId":appo.get('OrgId')
					        				},
							        "SubcatId": appo.get('SubcatId'),
							        "SbCatName": appo.get('SbCatName'),
							        "CatId": appo.get('CatId')
			      					},
					     "ItemID": appo.get('itemId'),
					     "ItemName": appo.get('ItemName'),
					     "ItemDiscp": appo.get('ItemDiscp'),
					     "ItemImage": config.image_url+appo.get('ItemImage'),
					     "ItemPrice": appo.get('ItemPrice'),
					     "EstDelivery":appo.get('EstDelivery'),
					     "Returns": appo.get('Returns'),
					     "ItemCurrency": appo.get('ItemCurrency'),
					     "ItemQuantity": appo.get('ItemQuantity'),
					     "CatId": appo.get('CatId'),
					     "CatName": appo.get('CatName'),
					     "SbCatName": appo.get('SbCatName'),
					     "Status": appo.get('Status'),
					     "OrgImage": config.image_url+appo.get('OrgImage'),
					     "OrgName": appo.get('OrgName'),
					     "OrgId": appo.get('OrgId'),
					     "SubcatId": appo.get('SubcatId'),
					     "Status":null
		    		}
	  				
        });
      }else{
        return [];
      }
	}).then(function(finalResult){
				res.json(finalResult);
	}).catch(function(err){
		res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
	});
};

//get items using subcategory id
exports.GetItemBySubcategoryId = function(req, res){
	console.log("GetItemBySubcategoryId");
	var subcatId = (req.query.id)?req.query.id:false;
	if(subcatId){
		ItemServices.GetAllItems(subcatId,"subcatId").then(function(result){
	 	  if(result.length){
	        return Promise.map(result.models, function (appo) {
		          return  {
				      		"SubCategory": {
								        "Categories": {
										          "CatId": appo.get('CatId'),
										          "CatName": appo.get('CatName'),
										          "CatImage":config.image_url+appo.get('CatImage'),
										          "OrgId":appo.get('OrgId')
						        				},
								        "SubcatId": appo.get('SubcatId'),
								        "SbCatName": appo.get('SbCatName'),
								        "CatId": appo.get('CatId')
				      					},
						     "ItemID": appo.get('itemId'),
						     "Status":null,
						     "ItemName": appo.get('ItemName'),
						     "ItemDiscp": appo.get('ItemDiscp'),
						     "ItemImage": config.image_url+appo.get('ItemImage'),
						     "ItemPrice": appo.get('ItemPrice'),
						     "EstDelivery":appo.get('EstDelivery'),
						     "Returns": appo.get('Returns'),
						     "ItemCurrency": appo.get('ItemCurrency'),
						     "ItemQuantity": appo.get('ItemQuantity'),
						     "CatId": appo.get('CatId'),
						     "CatName": appo.get('CatName'),
						     "SbCatName": appo.get('SbCatName'),
						     "Status": appo.get('Status'),
						     "OrgImage": config.image_url+appo.get('OrgImage'),
						     "OrgName": appo.get('OrgName'),
						     "OrgId": appo.get('OrgId'),
						     "SubcatId": appo.get('SubcatId')
			    		}
		  				
	        });
      }else{
        return [];
      }
	}).then(function(finalResult){
		if(finalResult.length)
			res.json({"StatusCode": 200,"lstItem":finalResult,"ResponseMessage": "Wow!! you are so passionate about your ItemRepository"});
		else  
			res.json({"StatusCode": 404,"lstItem":finalResult,"ResponseMessage": "Sorry! No GetItemRepository data found!!!"});
	}).catch(function(err){
		res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
	});
	}else{
		res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Item/GetItemBySubcategoryId'."});
	
	}
}

//get item by id 
exports.GetById = function(req, res){
	console.log("GetById");
	var ItemID = (req.query.Id)?req.query.Id:false;
	if(!ItemID)
	ItemID = (req.query.id)?req.query.id:false;
	if(ItemID){
		ItemServices.GetAllItems(ItemID,"ItemID").then(function(result){
	 	  if(result.length){
	        return Promise.map(result.models, function (appo) {
		          return  {
				      		"SubCategory": {
								        "Categories": {
										          "CatId": appo.get('CatId'),
										          "CatName": appo.get('CatName'),
										          "CatImage":config.image_url+appo.get('CatImage'),
										          "OrgId":appo.get('OrgId')
						        				},
								        "SubcatId": appo.get('SubcatId'),
								        "SbCatName": appo.get('SbCatName'),
								        "CatId": appo.get('CatId')
				      					},
						     "ItemID": appo.get('itemId'),
						     "Status":null,
						     "ItemName": appo.get('ItemName'),
						     "ItemDiscp": appo.get('ItemDiscp'),
						     "ItemImage": config.image_url+appo.get('ItemImage'),
						     "ItemPrice": appo.get('ItemPrice'),
						     "EstDelivery":appo.get('EstDelivery'),
						     "Returns": appo.get('Returns'),
						     "ItemCurrency": appo.get('ItemCurrency'),
						     "ItemQuantity": appo.get('ItemQuantity'),
						     "CatId": appo.get('CatId'),
						     "CatName": appo.get('CatName'),
						     "SbCatName": appo.get('SbCatName'),
						     "Status": appo.get('Status'),
						     "OrgImage": config.image_url+appo.get('OrgImage'),
						     "OrgName": appo.get('OrgName'),
						     "OrgId": appo.get('OrgId'),
						     "SubcatId": appo.get('SubcatId')
			    		}
		  				
	        });
      }else{
        return null;
      }
	}).then(function(finalResult){
		if(finalResult)
			res.json({"StatusCode": 200,"lstItem":finalResult,"ResponseMessage": "Wow!! you are so passionate about your ItemRepository"});
		else  
			res.json({"StatusCode": 200,"lstItem":finalResult,"ResponseMessage": "Sorry! No GetItemRepository data found!!!"});
	}).catch(function(err){
		res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
	});
	}else{
		res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Item/GetById'."});
	
	}
}