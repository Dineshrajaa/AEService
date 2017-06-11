var config         = require('../config'),
	Categories = require('../models/Categories.model'),
	Organization = require('../models/Organization.model'),
	CategoriesServices = require('../services/Categories.service'),
	Promise        = require("bluebird");
/*Get all categories*/
exports.GetAllCategories = function(req, res){
		console.log("GetAllCategories");
		var  OrgId = (req.query.id)?req.query.id:false;
  		if((OrgId!=undefined && req.query.input!=undefined) || OrgId==0){
  			var  OrgName = (req.query.input)?req.query.input:false;
  			if(!OrgName)
  			req.query.input = false; 
			CategoriesServices.GetAllCategories(req.query).then(function(result){
			if(result){
				return Promise.map(result.models,function(cats){
						cats.set("CatImage",config.image_url+cats.get('CatImage'));
						return cats;
				});
				
			}else{
				return [];
			}
			}).then(function(result){
				if(result.length)
				res.json({"StatusCode":200,"lstCategories":result,"ResponseMessage":"Wow!! you are so passionate about your Categories Repository"});
				else
				res.json({"StatusCode":404,"lstCategories":result,"ResponseMessage":"Sorry no category found."});
			}).catch(function(err){
				res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
			});
  		}else{
  			res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/GetAllCategories'."});
  		}
}
//get category by category id
exports.CategoriesGetById = function(req, res){
	console.log("CategoriesGetById");
	var CatId = (req.query.id)?req.query.id:false;
	if(!CatId)
	var CatId = (req.query.Id)?req.query.Id:false;	
	if(CatId){
			CategoriesServices.GetAllCategoryById(CatId).then(function(result){
				if(result)
				res.json({"StatusCode":200,"lstCategories":result,"ResponseMessage":"Wow!! you are so passionate about your CategoriesRepository"});
				else
				res.json({"StatusCode":"404","lstCategories":result,"ResponseMessage":"Sorry! No CategoriesRepository data found!!!"});	
			}).catch(function(err){
				res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
			});
	}else{
  			res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Categories/GetById'."});
	}
};

//add new category
exports.AddCategory = function(req,res){
	console.log("AddCategory");
	CategoriesServices.AddCategory(req.body).then(function(result){
		if(result)
		res.json({"StatusCode":200,"categories_":result,"ResponseMessage":"Categories insert successfully!"});
		else
		res.json({"StatusCode":404,"categories_":result,"ResponseMessage":"error"});	
	}).catch(function(err){
		res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
	});
}

//get category using orgig 
exports.GetCategoriesOrgId = function(req,res){
	console.log("GetCategoriesOrgId");
		var  OrgId = (req.query.id)?req.query.id:false;
  		if(OrgId){
			CategoriesServices.GetAllCategories(req.query).then(function(result){
			if(result){
				return Promise.map(result.models,function(cats){
						return cats.relations.Categories;
				});
			}else{
				return false;
			}


			}).then(function(result){
				if(result)
					res.json({"StatusCode":200,"lstCategories":result[0],"ResponseMessage":"Wow!! you are so passionate about your Categories Repository"});
				else
					res.json({"StatusCode":404,"lstCategories":null,"ResponseMessage":"No category available"});
					
			}).catch(function(err){
				res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
			});
  		}else{
  			res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Categories/GetCategoriesOrgId'."});
  		}
};

//get item list of a category
exports.ItemSearchRecord = function(req, res){
	var  CatId = (req.query.Id)?req.query.Id:false;
  		if(CatId && req.query.input!=undefined){
  			var  CatName = (req.query.input)?req.query.input:false;
  			if(!CatName)
  			req.query.input = false; 
			CategoriesServices.ItemSearchRecord(req.query).then(function(result){
				if(result.length){
					return Promise.map(result.models,function(Items){
							return  {
								      "ItemID": Items.get("itemId"),
								      "ItemName": Items.get("ItemName"),
								      "ItemDiscp": Items.get("ItemDiscp"),
								      "ItemImage": config.image_url+Items.get("ItemImage"),
								      "ItemPrice": Items.get("ItemPrice"),
								      "EstDelivery": Items.get("EstDelivery"),
								      "Returns": Items.get("Returns"),
								      "ItemCurrency": Items.get("ItemCurrency"),
								      "subcatId": Items.get("subcatId"),
								      "ItemQuantity": Items.get("ItemQuantity"),
								      "CatId": Items.get("catId"),
								      "CatName": Items.get("CatName"),
								      "SbCatName": Items.get("SbCatName"),
								      "Status": null,
								      "OrgImage": config.image_url+Items.get("OrgImage"),
								      "OrgName": Items.get("OrgName"),
								      "OrgId": Items.get("OrgId"),
								      "SubcatId": Items.get("subcatId"),
								      "SubCategory": Items.get("SbCatName")
    								}
					});
				}else{
					return false;
				}
			}).then(function(result){
				if(result)
				res.json({"StatusCode":200,"lstCategories":result,"ResponseMessage":"Wow!! you are so passionate about your Categories Repository"});
				else
				res.json({"StatusCode":404,"lstCategories":null,"ResponseMessage":"No such Item available"});
					
			}).catch(function(err){
				res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
			});
  		}else{
  			res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Categories/ItemSearchRecord'."});
  		}
}

//delete category
exports.DeleteCategory = function(req, res){
	console.log("DeleteCategory");
	var CatId = (req.query.id)?req.query.id:false;
  		if(CatId){
  			CategoriesServices.DeleteCategory(CatId).then(function(result){
  				if(result)
  				res.json({"StatusCode": 200,"ResponseMessage": "Deleted Successfully"});
  				else
  				res.json({"Message": "An error has occurred."});	
  			}).catch(function(err){
  				res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
  			});
			
  		}else{
  			res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Categories/Delete'."});
  		}
}

//get category by category id

exports.GetCategoryById = function(req, res){
console.log("GetCategoryById");


console.log(req.query);
	var  CatId = (req.query.id)?req.query.id:false;
  		if(CatId){
  			var  CatName = (req.query.input)?req.query.input:false;
  			if(!CatName)
  			req.query.input = false; 
			CategoriesServices.ItemSearchRecord(req.query).then(function(result){
				if(result.length){
					return Promise.map(result.models,function(Items){
							return  {
								      "ItemID": Items.get("itemId"),
								      "ItemName": Items.get("ItemName"),
								      "ItemDiscp": Items.get("ItemDiscp"),
								      "ItemImage": config.image_url+Items.get("ItemImage"),
								      "ItemPrice": Items.get("ItemPrice"),
								      "EstDelivery": Items.get("EstDelivery"),
								      "Returns": Items.get("Returns"),
								      "ItemCurrency": Items.get("ItemCurrency"),
								      "subcatId": Items.get("subcatId"),
								      "ItemQuantity": Items.get("ItemQuantity"),
								      "CatId": Items.get("catId"),
								      "CatName": Items.get("CatName"),
								      "SbCatName": Items.get("SbCatName"),
								      "Status": null,
								      "OrgImage": config.image_url+Items.get("OrgImage"),
								      "OrgName": Items.get("OrgName"),
								      "OrgId": Items.get("OrgId"),
								      "SubcatId": Items.get("subcatId"),
								      "SubCategory": Items.get("SbCatName")
    								}
					});
				}else{
					return false;
				}
			}).then(function(result){
				if(result)
				res.json({"StatusCode":200,"lstCat":result,"ResponseMessage": "Wow!! you are so passionate about your CategoryRepository"});
				else
				res.json({"StatusCode":404,"lstCat":null,"ResponseMessage": "No such category available"});
					
			}).catch(function(err){
				console.log("innnn catch")
				res.json({"StatusCode":err.status,"lstCat":[],"ResponseMessage":err.messages});
			});
  		}else{
  			res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Categories/GetCategoryById'."});
  		}

};
