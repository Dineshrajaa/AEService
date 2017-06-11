var config         = require('../config'),
	Categories = require('../models/Categories.model'),
	SubCategory = require('../models/SubCategory.model'),
	SubCategoryServices = require('../services/SubCategory.service'),
	CategoriesServices = require('../services/Categories.service'),
	Promise        = require("bluebird");

//get all subcategory by category id
exports.GetSubCategoryByCategoryId = function(req, res){
	console.log("GetSubCategoryByCategoryId");
	var CatId = (req.query.id)?req.query.id:false;
	if(CatId){
			return SubCategoryServices.GetSubCategoryByCategoryId(CatId).then(function(result){
				if(result.length){
					return Promise.map(result.models,function(scat){
						return {
							"SubcatId":scat.get("SubcatId"),
    						"SbCatName":scat.get("SbCatName"),
    						"CatId":scat.get("CatId"),
    						"CatName":scat.relations.Category.get('CatName'),
    						"Categories":null
						}
					});
				}else{
					return [];
				}
			}).then(function(fresult){

				if(fresult.length)
					res.json({"StatusCode":200,"lstSubCat":fresult,"ResponseMessage":"Wow!! you are so passionate about your Sub category Repository"});
				else
					res.json({"StatusCode":404,"lstSubCat":fresult,"ResponseMessage":"Sorry! No Sub category data found!!!"});

			}).catch(function(err){
					res.json({"StatusCode":err.status,"lstSubCat":[],"ResponseMessage":err.messages});
			});	
	}else{
  			res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/SubCategory/GetSubCategoryByCategoryId'."});
	}
}
